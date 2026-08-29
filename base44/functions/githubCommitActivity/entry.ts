import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const repo = (body.repo || '').trim();
    if (!repo) return Response.json({ error: 'repo is required (owner/repo)' }, { status: 400 });
    const parts = repo.split('/');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      return Response.json({ error: 'repo must be in owner/repo format' }, { status: 400 });
    }
    const [owner, repoName] = parts;
    const days = Math.min(Math.max(parseInt(body.days || '30', 10) || 30, 1), 90);

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('github');
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'paradise-rentals-github-monitor',
    };

    const perPage = 100;
    const maxPages = 10;
    const commits = [];
    for (let page = 1; page <= maxPages; page++) {
      const url = `https://api.github.com/repos/${owner}/${repoName}/commits?since=${encodeURIComponent(since)}&per_page=${perPage}&page=${page}`;
      const res = await fetch(url, { headers });
      if (!res.ok) {
        const errText = await res.text();
        return Response.json(
          { error: `GitHub API error: ${res.status}`, details: errText },
          { status: res.status }
        );
      }
      const batch = await res.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      commits.push(...batch);
      if (batch.length < perPage) break;
    }

    const perDay = {};
    const perAuthor = {};
    for (const c of commits) {
      const date = c.commit.author.date.slice(0, 10);
      perDay[date] = (perDay[date] || 0) + 1;
      const author = c.author ? c.author.login : (c.commit.author ? c.commit.author.name : 'unknown');
      perAuthor[author] = (perAuthor[author] || 0) + 1;
    }

    const series = Object.keys(perDay)
      .sort()
      .map((d) => ({ date: d, commits: perDay[d] }));
    const authors = Object.entries(perAuthor)
      .map(([author, count]) => ({ author, count }))
      .sort((a, b) => b.count - a.count);

    return Response.json({
      repo,
      days,
      total: commits.length,
      series,
      authors,
      windowStart: since,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}