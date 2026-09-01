import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Eye, MousePointerClick, UserPlus, BarChart3, AlertCircle } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtDate = (d) => {
  if (!d || d.length !== 8) return d;
  return `${MONTHS[parseInt(d.slice(4, 6), 10) - 1]} ${parseInt(d.slice(6, 8), 10)}`;
};

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-2xl bg-white border border-brand/5 p-5">
      <div className="flex items-center gap-2 text-brand/50">
        <Icon className={`w-4 h-4 ${accent}`} />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 font-display text-3xl text-brand">{value.toLocaleString()}</p>
    </div>
  );
}

export default function Analytics() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [clicks, setClicks] = useState(null);
  const [loadingProps, setLoadingProps] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.functions.invoke('getAnalyticsData', { action: 'properties' });
        setProperties(res.data.properties || []);
        if (res.data.properties?.length) setSelectedProperty(res.data.properties[0].propertyId);
      } catch (e) {
        setError(e.response?.data?.error || e.message || 'Failed to load Google Analytics properties');
      } finally {
        setLoadingProps(false);
      }
    })();
  }, []);

  const fetchReport = useCallback(async () => {
    if (!selectedProperty) return;
    setLoadingReport(true);
    setError('');
    try {
      const [reportRes, clicksRes] = await Promise.all([
        base44.functions.invoke('getAnalyticsData', { action: 'report', propertyId: selectedProperty, days }),
        base44.functions.invoke('getAnalyticsData', { action: 'events', propertyId: selectedProperty, days }),
      ]);
      setData(reportRes.data);
      setClicks(clicksRes.data);
    } catch (e) {
      setError(e.response?.data?.error || e.message || 'Failed to load report');
      setData(null);
      setClicks(null);
    } finally {
      setLoadingReport(false);
    }
  }, [selectedProperty, days]);

  useEffect(() => {
    if (selectedProperty) fetchReport();
  }, [selectedProperty, fetchReport]);

  const chartData = (data?.rows || []).map((r) => ({ ...r, label: fmtDate(r.date) }));
  const avgUsers = data?.rows?.length ? Math.round(data.totals.users / data.rows.length) : 0;

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />
      <div className="pt-24 px-6 md:px-10 max-w-6xl mx-auto pb-20">
        <div className="flex items-center gap-2 text-brand">
          <BarChart3 className="w-6 h-6 text-moss" />
          <h1 className="font-display text-3xl md:text-4xl">Analytics</h1>
        </div>
        <p className="text-brand/55 mt-1">Daily website visitor counts from Google Analytics.</p>

        {/* Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex-1">
            {loadingProps ? (
              <div className="h-11 rounded-xl bg-white/60 animate-pulse" />
            ) : (
              <select
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full rounded-xl bg-white border border-brand/10 text-brand text-sm px-4 py-3 outline-none focus:ring-2 ring-solar"
              >
                {properties.length === 0 && <option value="">No properties found</option>}
                {properties.map((p) => (
                  <option key={p.propertyId} value={p.propertyId}>
                    {p.displayName} ({p.propertyId})
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex gap-2">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  days === d ? 'bg-brand text-card' : 'bg-white text-brand/60 border border-brand/10 hover:text-brand'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-2 rounded-xl bg-destructive/5 border border-destructive/20 p-4 text-sm text-destructive">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loadingReport && !data && (
          <div className="mt-8 flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-brand/15 border-t-brand rounded-full animate-spin" />
          </div>
        )}

        {data && (
          <>
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Total Users" value={data.totals.users} accent="text-moss" />
              <StatCard icon={UserPlus} label="New Users" value={data.totals.newUsers} accent="text-solar" />
              <StatCard icon={MousePointerClick} label="Sessions" value={data.totals.sessions} accent="text-moss" />
              <StatCard icon={Eye} label="Pageviews" value={data.totals.pageviews} accent="text-solar" />
            </div>

            {clicks && (
              <div className="mt-6 rounded-2xl bg-white border border-brand/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg text-brand">FareHarbor Button Clicks</h2>
                  <span className="text-sm text-brand/50">{clicks.total.toLocaleString()} total</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-dune p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand/50">4-Passenger</p>
                    <p className="mt-1 font-display text-2xl text-brand">{(clicks.clicks.find((c) => c.ride_type === '4-passenger')?.clicks || 0).toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl bg-dune p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand/50">6-Passenger</p>
                    <p className="mt-1 font-display text-2xl text-brand">{(clicks.clicks.find((c) => c.ride_type === '6-passenger')?.clicks || 0).toLocaleString()}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-brand/40">Click tracking started today — counts appear as GA4 processes the events (first data may take up to 24 hours).</p>
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-white border border-brand/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg text-brand">Daily Visitors</h2>
                <span className="text-sm text-brand/50">Avg {avgUsers.toLocaleString()}/day</span>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--solar))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--solar))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--brand) / 0.08)" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'hsl(var(--brand) / 0.5)' }} tickLine={false} axisLine={false} minTickGap={24} />
                    <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--brand) / 0.5)' }} tickLine={false} axisLine={false} width={40} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--brand) / 0.1)', fontSize: 13 }}
                      labelStyle={{ color: 'hsl(var(--brand))', fontWeight: 600 }}
                    />
                    <Area type="monotone" dataKey="users" name="Visitors" stroke="hsl(var(--solar))" strokeWidth={2} fill="url(#visitorsGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white border border-brand/5 overflow-hidden">
              <h2 className="font-display text-lg text-brand p-6 pb-3">Daily Breakdown</h2>
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="text-left text-brand/50 text-xs uppercase tracking-wider">
                      <th className="px-6 py-2 font-semibold">Date</th>
                      <th className="px-6 py-2 font-semibold text-right">Users</th>
                      <th className="px-6 py-2 font-semibold text-right">New</th>
                      <th className="px-6 py-2 font-semibold text-right">Sessions</th>
                      <th className="px-6 py-2 font-semibold text-right">Pageviews</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...chartData].reverse().map((r) => (
                      <tr key={r.date} className="border-t border-brand/5 text-brand/80">
                        <td className="px-6 py-2.5">{r.label}</td>
                        <td className="px-6 py-2.5 text-right font-medium">{r.users.toLocaleString()}</td>
                        <td className="px-6 py-2.5 text-right">{r.newUsers.toLocaleString()}</td>
                        <td className="px-6 py-2.5 text-right">{r.sessions.toLocaleString()}</td>
                        <td className="px-6 py-2.5 text-right">{r.pageviews.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}