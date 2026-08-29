import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const name = (body.name || '').trim();
    if (!name) return Response.json({ error: 'Repository name is required' }, { status: 400 });
    if (!/^[a-zA-Z0-9._-]+$/.test(name)) {
      return Response.json({ error: 'Invalid repository name' }, { status: 400 });
    }
    const description = (body.description || '').trim();
    const isPrivate = body.private !== false;
    const autoInit = body.autoInit !== false;

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('github');
    const res = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'paradise-rentals-github-monitor',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        private: isPrivate,
        auto_init: autoInit,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      return Response.json(
        { error: `GitHub API error: ${res.status}`, details: errText },
        { status: res.status }
      );
    }
    const repo = await res.json();
    return Response.json({
      name: repo.full_name,
      url: repo.html_url,
      private: repo.private,
      defaultBranch: repo.default_branch,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}