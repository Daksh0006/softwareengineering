import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, LockKeyhole, Save, ShieldAlert, SlidersHorizontal, UserCog } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PageHeader } from '../components/ui';

export function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    visibility: 'Campus members',
    emailNotifications: true,
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    window.setTimeout(() => {
      updateUser({ name: form.name, email: form.email });
      setIsLoading(false);
      showToast({ type: 'success', title: 'Settings saved', message: 'Account preferences were updated locally.' });
    }, 400);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Account and privacy settings"
        description="Manage account details, visibility, notifications, and password updates."
      />
      <form className="grid gap-6 lg:grid-cols-[1fr_360px]" onSubmit={handleSubmit}>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <div className="mb-5 flex items-center gap-3">
            <UserCog className="h-5 w-5 text-teal-700" />
            <h2 className="text-xl font-bold text-slate-950">Account</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
            <Field label="Email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
          </div>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">Password update</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="New password"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
            />
          </label>
        </section>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
            <div className="mb-5 flex items-center gap-3">
              <SlidersHorizontal className="h-5 w-5 text-teal-700" />
              <h2 className="text-xl font-bold text-slate-950">Privacy</h2>
            </div>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Profile visibility</span>
              <select
                value={form.visibility}
                onChange={(event) => setForm((current) => ({ ...current, visibility: event.target.value }))}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
              >
                <option>Campus members</option>
                <option>Only opportunity owners</option>
                <option>Private</option>
              </select>
            </label>
            <label className="mt-5 flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
              <span className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <Bell className="h-4 w-4 text-teal-700" />
                Email notifications
              </span>
              <input
                type="checkbox"
                checked={form.emailNotifications}
                onChange={(event) => setForm((current) => ({ ...current, emailNotifications: event.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 text-teal-600"
              />
            </label>
          </section>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Saving...' : 'Save settings'}
          </button>
        </aside>
      </form>
    </div>
  );
}

export function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <CenteredState
      icon={ShieldAlert}
      title="Unauthorized"
      description="Your current role does not have access to that page."
      action={
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back
        </button>
      }
    />
  );
}

export function NotFoundPage() {
  return (
    <CenteredState
      icon={LockKeyhole}
      title="Page not found"
      description="The route you opened does not exist in CampusGrid."
      action={
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
        >
          Return home
        </Link>
      }
    />
  );
}

function CenteredState({ icon: Icon, title, description, action }) {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-8 text-center shadow-subtle">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-rose-50 text-rose-700">
          <Icon className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-3xl font-bold text-slate-950">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
      />
    </label>
  );
}
