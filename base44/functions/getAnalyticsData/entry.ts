import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const action = body.action || 'report';

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_analytics');

    if (action === 'streams') {
      const propertyId = body.propertyId;
      if (!propertyId) return Response.json({ error: 'propertyId is required' }, { status: 400 });
      const res = await fetch(`https://analyticsadmin.googleapis.com/v1alpha/properties/${propertyId}/dataStreams`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (!res.ok) return Response.json({ error: data.error?.message || 'Failed to list streams' }, { status: res.status });
      const streams = (data.dataStreams || []).map((s) => ({
        name: s.name,
        type: s.type,
        measurementId: s.webStreamData?.measurementId || null,
        streamId: s.webStreamData?.streamId || null,
      }));
      return Response.json({ streams });
    }

    if (action === 'properties') {
      const res = await fetch('https://analyticsadmin.googleapis.com/v1alpha/accountSummaries?pageSize=200', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (!res.ok) return Response.json({ error: data.error?.message || 'Failed to list properties' }, { status: res.status });
      const properties = (data.accountSummaries || []).flatMap((acc) =>
        (acc.propertySummaries || []).map((p) => ({
          propertyId: p.property.replace('properties/', ''),
          displayName: p.displayName,
          account: acc.displayName,
        }))
      );
      return Response.json({ properties });
    }

    if (action === 'events') {
      const propertyId = body.propertyId;
      if (!propertyId) return Response.json({ error: 'propertyId is required' }, { status: 400 });
      const eventName = body.eventName || 'fareharbor_cta_click';
      const days = Math.min(Math.max(parseInt(body.days || '30', 10) || 30, 1), 365);
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - days);
      const fmt = (d) => d.toISOString().slice(0, 10);
      const startDate = body.startDate || fmt(start);
      const endDate = body.endDate || fmt(end);

      const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: 'eventName' }],
          metrics: [{ name: 'eventCount' }],
          dimensionFilter: {
            orGroup: {
              expressions: [
                { filter: { fieldName: 'eventName', stringFilter: { value: 'fareharbor_cta_click_4', matchType: 'EXACT' } } },
                { filter: { fieldName: 'eventName', stringFilter: { value: 'fareharbor_cta_click_6', matchType: 'EXACT' } } },
              ],
            },
          },
          orderBys: [{ dimension: { orderType: 'ALPHANUMERIC', dimensionName: 'eventName' } }],
        }),
      });
      const data = await res.json();
      if (!res.ok) return Response.json({ error: data.error?.message || 'Failed to run events report' }, { status: res.status });
      const clicks = (data.rows || []).map((row) => ({
        ride_type: row.dimensionValues[0].value.endsWith('_6') ? '6-passenger' : '4-passenger',
        clicks: parseInt(row.metricValues[0].value, 10) || 0,
      }));
      const total = clicks.reduce((sum, r) => sum + r.clicks, 0);
      return Response.json({ clicks, total, startDate, endDate });
    }

    // action === 'report'
    const propertyId = body.propertyId;
    if (!propertyId) return Response.json({ error: 'propertyId is required' }, { status: 400 });

    const days = Math.min(Math.max(parseInt(body.days || '30', 10) || 30, 1), 365);
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    const fmt = (d) => d.toISOString().slice(0, 10);
    const startDate = body.startDate || fmt(start);
    const endDate = body.endDate || fmt(end);

    const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'totalUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'newUsers' },
        ],
        orderBys: [{ dimension: { orderType: 'ALPHANUMERIC', dimensionName: 'date' } }],
      }),
    });
    const data = await res.json();
    if (!res.ok) return Response.json({ error: data.error?.message || 'Failed to run report' }, { status: res.status });

    const rows = (data.rows || []).map((row) => ({
      date: row.dimensionValues[0].value,
      users: parseInt(row.metricValues[0].value, 10) || 0,
      sessions: parseInt(row.metricValues[1].value, 10) || 0,
      pageviews: parseInt(row.metricValues[2].value, 10) || 0,
      newUsers: parseInt(row.metricValues[3].value, 10) || 0,
    }));

    const totals = rows.reduce(
      (acc, r) => ({
        users: acc.users + r.users,
        sessions: acc.sessions + r.sessions,
        pageviews: acc.pageviews + r.pageviews,
        newUsers: acc.newUsers + r.newUsers,
      }),
      { users: 0, sessions: 0, pageviews: 0, newUsers: 0 }
    );

    return Response.json({ rows, totals, startDate, endDate, propertyId });
  } catch (error) {
    return Response.json({ error: error.message || 'Analytics request failed' }, { status: 500 });
  }
}