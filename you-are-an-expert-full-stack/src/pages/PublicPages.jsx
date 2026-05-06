import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  UsersRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { roles } from '../data/mockData';

const roleHome = {
  [roles.STUDENT]: '/dashboard',
  [roles.CLUB_EXEC]: '/club/dashboard',
  [roles.FACULTY]: '/overview'
};

const demoAccounts = [
  { label: 'Student', role: roles.STUDENT, email: 'student@campusgrid.dev' },
  { label: 'Club Executive', role: roles.CLUB_EXEC, email: 'club@campusgrid.dev' },
  { label: 'Faculty', role: roles.FACULTY, email: 'faculty@campusgrid.dev' }
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/15 backdrop-blur">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">CampusGrid</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-50"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <section className="hero-campus relative min-h-[82vh]">
        <div className="mx-auto flex min-h-[82vh] max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Campus collaboration, matched by skill
            </p>
            <h1 className="mt-6 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">CampusGrid</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              A team formation system where students build verified profiles, clubs publish roles, and faculty
              coordinators monitor collaboration across campus.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-400"
              >
                Create student profile
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore demo workspace
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              icon: BriefcaseBusiness,
              title: 'Structured opportunities',
              body: 'Club executives define roles, slots, required skills, deadlines, and review pipelines.'
            },
            {
              icon: Network,
              title: 'Skill-aware discovery',
              body: 'Students browse by domain, apply to roles, and track every submission from one dashboard.'
            },
            {
              icon: ShieldCheck,
              title: 'Faculty visibility',
              body: 'Coordinators get a read-heavy view of participation, approvals, teams, and platform health.'
            }
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-600 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-950">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">How matching works</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Profiles become ranked role fit.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              CampusGrid compares each applicant's proficiency levels with weighted role requirements. Clubs see a
              sorted compatibility view while still making the final human decision.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['1', 'Students maintain skills and domains'],
              ['2', 'Clubs publish roles with weighted requirements'],
              ['3', 'Applicants are ranked with transparent matched skills']
            ].map(([step, text]) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-sm font-bold text-amber-800">
                  {step}
                </span>
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-800">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Team collaboration</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">From application to team workspace.</h2>
          </div>
          <div className="space-y-4">
            {[
              'Accepted applicants are assigned to roles inside opportunity-specific teams.',
              'Team pages show members, roles, deadlines, and controlled team-scoped messages.',
              'Notifications keep students, club executives, and faculty aligned on approvals and updates.'
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: 'student@campusgrid.dev',
    password: 'password',
    role: roles.STUDENT
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const loggedInUser = await login(form);
      showToast({
        type: 'success',
        title: 'Signed in',
        message: `Welcome back, ${loggedInUser.name}.`
      });
      navigate(location.state?.from?.pathname || roleHome[loggedInUser.role], { replace: true });
    } catch (error) {
      showToast({ type: 'error', title: 'Login failed', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Role-based login"
      subtitle="Choose a campus role and enter the matching demo email. Any 6+ character password works for this frontend build."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-3 sm:grid-cols-3">
          {demoAccounts.map((account) => (
            <button
              key={account.role}
              type="button"
              onClick={() => setForm((current) => ({ ...current, role: account.role, email: account.email }))}
              className={`rounded-lg border px-3 py-3 text-left text-sm transition ${
                form.role === account.role
                  ? 'border-teal-500 bg-teal-50 text-teal-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="font-semibold">{account.label}</span>
              <span className="mt-1 block truncate text-xs opacity-75">{account.email}</span>
            </button>
          ))}
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-950 shadow-sm"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-950 shadow-sm"
            required
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LockKeyhole className="h-4 w-4" />
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthShell>
  );
}

export function RegisterPage() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    branch: '',
    year: 'First Year',
    role: roles.STUDENT
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const registeredUser = await register(form);
      showToast({
        type: 'success',
        title: 'Profile created',
        message: `${registeredUser.name}, your student workspace is ready.`
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      showToast({ type: 'error', title: 'Registration failed', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Student registration"
      subtitle="Create a campus profile that can power recommendations, applications, and team formation."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Full name</span>
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 shadow-sm"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">College email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 shadow-sm"
            required
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Branch</span>
            <input
              value={form.branch}
              onChange={(event) => setForm((current) => ({ ...current, branch: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 shadow-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Year</span>
            <select
              value={form.year}
              onChange={(event) => setForm((current) => ({ ...current, year: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 shadow-sm"
            >
              <option>First Year</option>
              <option>Second Year</option>
              <option>Third Year</option>
              <option>Final Year</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 shadow-sm"
            required
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <BadgeCheck className="h-4 w-4" />
          {isLoading ? 'Creating profile...' : 'Create student account'}
        </button>
      </form>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen bg-slate-50 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-teal-500">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold">CampusGrid</span>
        </Link>
        <div>
          <UsersRound className="h-12 w-12 text-teal-300" />
          <h2 className="mt-6 max-w-md text-4xl font-bold leading-tight">Find the right campus team faster.</h2>
          <p className="mt-4 max-w-md leading-7 text-slate-300">
            Profiles, opportunity roles, applications, matching, and team workspaces live in one coordinated system.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-subtle sm:p-8">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 lg:hidden">
            <GraduationCap className="h-4 w-4" />
            CampusGrid
          </Link>
          <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
