import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import Navbar from '@/components/Navbar';
import { Trash2, AlertTriangle, X, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function Settings() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);

  const canDelete = confirmText.trim().toUpperCase() === 'DELETE';

  const handleDelete = async () => {
    if (!canDelete || deleting) return;
    setDeleting(true);
    try {
      const res = await base44.functions.invoke('deleteMyAccount', {});
      if (res?.data?.success) {
        toast({ title: 'Account deleted', description: 'Your account has been permanently removed.' });
        // Sign out cleanly and redirect to login
        await new Promise((r) => setTimeout(r, 600));
        logout(false);
        window.location.href = '/login';
      } else {
        throw new Error(res?.data?.error || 'Deletion failed');
      }
    } catch (e) {
      setDeleting(false);
      setConfirmOpen(false);
      setConfirmText('');
      toast({
        title: 'Could not delete account',
        description: e.message || 'Something went wrong. Please try again or contact support.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />
      <div className="pt-24 px-6 md:px-10 max-w-3xl mx-auto pb-20">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-brand/55 hover:text-brand transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>

        <h1 className="font-display text-3xl md:text-4xl text-brand">Settings</h1>
        <p className="text-brand/55 mt-1">Manage your account preferences.</p>

        {/* Profile */}
        <div className="mt-8 rounded-2xl bg-white border border-brand/5 p-6">
          <div className="flex items-center gap-2 text-brand">
            <ShieldCheck className="w-5 h-5 text-moss" />
            <h2 className="font-display text-lg">Your profile</h2>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-brand/50">Name</dt>
              <dd className="text-brand font-medium">{user?.full_name || '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-brand/50">Email</dt>
              <dd className="text-brand font-medium">{user?.email || '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-brand/50">Role</dt>
              <dd className="text-brand font-medium capitalize">{user?.role || 'user'}</dd>
            </div>
          </dl>
        </div>

        {/* Danger zone */}
        <div className="mt-6 rounded-2xl bg-white border border-destructive/20 p-6">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-display text-lg">Danger zone</h2>
          </div>
          <p className="mt-3 text-sm text-brand/60">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button
            onClick={() => setConfirmOpen(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 text-destructive px-5 py-2.5 text-sm font-semibold hover:bg-destructive/5 transition"
          >
            <Trash2 className="w-4 h-4" /> Delete my account
          </button>
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 bg-brand/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dune rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-display text-lg">Delete account?</h3>
              </div>
              <button
                onClick={() => { setConfirmOpen(false); setConfirmText(''); }}
                disabled={deleting}
                className="text-brand/50 hover:text-brand"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-brand/60">
              This permanently erases your account and signs you out. To confirm, type <span className="font-bold text-destructive">DELETE</span> below.
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              disabled={deleting}
              className="mt-4 w-full rounded-xl bg-white border border-brand/10 text-brand text-sm px-4 py-3 outline-none focus:ring-2 ring-solar"
            />
            <div className="flex gap-3 pt-5">
              <button
                type="button"
                onClick={() => { setConfirmOpen(false); setConfirmText(''); }}
                disabled={deleting}
                className="flex-1 rounded-full border border-brand/15 text-brand py-3 text-sm font-semibold hover:bg-brand/5 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={!canDelete || deleting}
                className="flex-1 rounded-full bg-destructive text-destructive-foreground py-3 text-sm font-semibold hover:brightness-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {deleting ? 'Deleting…' : 'Delete forever'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}