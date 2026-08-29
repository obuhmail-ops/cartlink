import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, GitCommitVertical } from 'lucide-react';

export default function GithubMonitor() {
  const [repo, setRepo] = useState('');
  const [days, setDays] = useState('30');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = async (e) => {
    e.preventDefault();
    if (!repo.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await base44.functions.invoke('githubCommitActivity', {
        repo: repo.trim(),
        days,
      });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const maxAuthor = data?.authors?.[0]?.count || 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-solar">
            <GitCommitVertical className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Team Progress
            </span>
          </div>
          <h1 className="mt-2 font-display text-3xl md:text-4xl text-brand">
            Repository Commit Frequency
          </h1>
          <p className="mt-2 text-muted-foreground">
            Monitor how often your team is committing to a GitHub repository.
          </p>
        </header>

        <form
          onSubmit={run}
          className="flex flex-col gap-3 sm:flex-row sm:items-end rounded-2xl border border-border bg-card p-5"
        >
          <div className="flex-1">
            <label className="mb-1.5 block text-sm font-medium text-brand">
              Repository (owner/repo)
            </label>
            <Input
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="e.g. facebook/react"
            />
          </div>
          <div className="sm:w-28">
            <label className="mb-1.5 block text-sm font-medium text-brand">
              Days
            </label>
            <Input
              type="number"
              min="1"
              max="90"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading} className="sm:self-end">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Loading
              </>
            ) : (
              'Analyze'
            )}
          </Button>
        </form>

        {error && (
          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {data && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Stat label="Repository" value={data.repo} />
              <Stat label="Total commits" value={data.total} />
              <Stat label="Window" value={`${data.days} days`} />
            </div>

            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-4 font-display text-xl text-brand">
                Commits per day
              </h2>
              {data.series.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No commits in this window.
                </p>
              ) : (
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.series} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        tickFormatter={(d) => d.slice(5)}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: '1px solid hsl(var(--border))',
                          background: 'hsl(var(--card))',
                        }}
                      />
                      <Bar dataKey="commits" fill="hsl(var(--solar))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-4 font-display text-xl text-brand">
                Commits by author
              </h2>
              {data.authors.length === 0 ? (
                <p className="text-sm text-muted-foreground">No authors.</p>
              ) : (
                <ul className="space-y-3">
                  {data.authors.map((a) => (
                    <li key={a.author} className="flex items-center gap-3">
                      <span className="w-40 shrink-0 truncate text-sm font-medium text-brand">
                        {a.author}
                      </span>
                      <div className="flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-3 rounded-full bg-solar"
                          style={{ width: `${maxAuthor ? (a.count / maxAuthor) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-sm tabular-nums text-muted-foreground">
                        {a.count}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 truncate font-display text-lg text-brand">{value}</p>
    </div>
  );
}