import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wpCarts, wpBookings } from '@/api/wpClient';
import Navbar from '@/components/Navbar';
import { Image } from '@/components/ui/image';
import { Plus, Pencil, Trash2, X, Users } from 'lucide-react';

const EMPTY = {
  name: '', description: '', image_url: '', seats: 4,
  hourly_rate: 18, daily_rate: 89, battery_range: '35 mi',
  top_speed: '19 mph', total_inventory: 3, status: 'available',
};

export default function Admin() {
  const [tab, setTab] = useState('fleet');
  const [carts, setCarts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([
      wpCarts.list(),
      wpBookings.list().catch(() => []),
    ])
      .then(([c, b]) => { setCarts(c); setBookings(b); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const saveCart = async (e) => {
    e.preventDefault();
    const data = {
      ...editing,
      seats: Number(editing.seats),
      hourly_rate: Number(editing.hourly_rate),
      daily_rate: Number(editing.daily_rate),
      total_inventory: Number(editing.total_inventory),
    };
    if (editing.id) {
      await wpCarts.update(editing.id, data);
    } else {
      await wpCarts.create(data);
    }
    setEditing(null);
    load();
  };

  const deleteCart = async (c) => {
    if (!confirm(`Delete ${c.name}? This won't affect existing bookings.`)) return;
    await wpCarts.remove(c.id);
    load();
  };

  const cancelBooking = async (b) => {
    if (!confirm('Cancel this booking?')) return;
    await wpBookings.cancel(b.id);
    load();
  };

  return (
    <div className="min-h-screen bg-dune">
      <Navbar />
      <div className="pt-24 px-6 md:px-10 max-w-6xl mx-auto pb-20">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-brand">Admin</h1>
            <p className="text-brand/55 mt-1">Manage fleet inventory and reservations.</p>
          </div>
          <Link to="/" className="text-sm text-brand/55 hover:text-brand transition">View site →</Link>
        </div>
        <div className="mt-8 inline-flex rounded-full bg-brand/5 p-1">
          {['fleet', 'bookings'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-6 py-2 text-sm font-medium capitalize transition ${tab === t ? 'bg-brand text-dune' : 'text-brand/60 hover:text-brand'}`}>
              {t} {t === 'fleet' ? `(${carts.length})` : `(${bookings.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center"><div className="w-8 h-8 border-4 border-brand/20 border-t-brand rounded-full animate-spin" /></div>
        ) : tab === 'fleet' ? (
          <div className="mt-8">
            <button onClick={() => setEditing({ ...EMPTY })} className="inline-flex items-center gap-2 rounded-full bg-solar text-brand font-semibold px-5 py-2.5 text-sm hover:brightness-105 transition mb-6">
              <Plus className="w-4 h-4" /> Add cart
            </button>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {carts.map((c) => (
                <div key={c.id} className="rounded-2xl bg-white border border-brand/5 overflow-hidden">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand/5">
                    {c.image_url && <Image src={c.image_url} alt={c.name} fittingType="fill" className="absolute inset-0 w-full h-full" />}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg text-brand">{c.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === 'available' ? 'bg-moss/10 text-moss' : 'bg-brand/10 text-brand/50'}`}>{c.status}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-sm text-brand/55">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {c.seats}</span>
                      <span>${c.hourly_rate}/hr</span>
                      <span>${c.daily_rate}/day</span>
                      <span>· {c.total_inventory} units</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => setEditing(c)} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-brand/15 text-brand py-2 text-sm hover:bg-brand/5 transition"><Pencil className="w-3.5 h-3.5" /> Edit</button>
                      <button onClick={() => deleteCart(c)} className="inline-flex items-center justify-center rounded-lg border border-destructive/20 text-destructive py-2 px-3 text-sm hover:bg-destructive/5 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-white border border-brand/5 overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand/5 text-brand/60 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Cart</th>
                  <th className="px-4 py-3 font-medium">Pick-up</th>
                  <th className="px-4 py-3 font-medium">Return</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-10 text-center text-brand/50">No bookings yet.</td></tr>
                ) : bookings.map((b) => (
                  <tr key={b.id} className="border-t border-brand/5">
                    <td className="px-4 py-3"><div className="font-medium text-brand">{b.customer_name}</div><div className="text-brand/45 text-xs">{b.customer_email}</div></td>
                    <td className="px-4 py-3 text-brand/70">{b.cart_name}</td>
                    <td className="px-4 py-3 text-brand/70">{new Date(b.start_datetime).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</td>
                    <td className="px-4 py-3 text-brand/70">{new Date(b.end_datetime).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</td>
                    <td className="px-4 py-3 font-medium text-brand">${b.total_price}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${b.status === 'confirmed' ? 'bg-moss/10 text-moss' : 'bg-destructive/10 text-destructive'}`}>{b.status}</span></td>
                    <td className="px-4 py-3 text-right">{b.status === 'confirmed' && <button onClick={() => cancelBooking(b)} className="text-destructive hover:underline text-xs">Cancel</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-brand/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dune rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-brand">{editing.id ? 'Edit cart' : 'New cart'}</h2>
              <button onClick={() => setEditing(null)} className="text-brand/50 hover:text-brand"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={saveCart} className="space-y-4">
              <I label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} required />
              <I label="Image URL" value={editing.image_url} onChange={(v) => setEditing({ ...editing, image_url: v })} placeholder="https://…" />
              <I label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} />
              <div className="grid grid-cols-2 gap-4">
                <I label="Seats" type="number" value={editing.seats} onChange={(v) => setEditing({ ...editing, seats: v })} />
                <I label="Inventory" type="number" value={editing.total_inventory} onChange={(v) => setEditing({ ...editing, total_inventory: v })} />
                <I label="Hourly rate ($)" type="number" value={editing.hourly_rate} onChange={(v) => setEditing({ ...editing, hourly_rate: v })} />
                <I label="Daily rate ($)" type="number" value={editing.daily_rate} onChange={(v) => setEditing({ ...editing, daily_rate: v })} />
                <I label="Battery range" value={editing.battery_range} onChange={(v) => setEditing({ ...editing, battery_range: v })} />
                <I label="Top speed" value={editing.top_speed} onChange={(v) => setEditing({ ...editing, top_speed: v })} />
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-brand/50">Status</span>
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="rounded-xl bg-white border border-brand/10 text-brand text-sm px-4 py-3 outline-none focus:ring-2 ring-solar">
                  <option value="available">available</option>
                  <option value="maintenance">maintenance</option>
                </select>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditing(null)} className="flex-1 rounded-full border border-brand/15 text-brand py-3 text-sm font-semibold hover:bg-brand/5 transition">Cancel</button>
                <button type="submit" className="flex-1 rounded-full bg-solar text-brand py-3 text-sm font-semibold hover:brightness-105 transition">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function I({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-brand/50">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} className="rounded-xl bg-white border border-brand/10 text-brand text-sm px-4 py-3 outline-none focus:ring-2 ring-solar" />
    </label>
  );
}