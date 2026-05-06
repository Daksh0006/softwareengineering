import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Bell,
  BriefcaseBusiness,
  ClipboardList,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  X
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { roles } from '../data/mockData';

const roleLabels = {
  [roles.STUDENT]: 'Student',
  [roles.CLUB_EXEC]: 'Club Executive',
  [roles.FACULTY]: 'Faculty Coordinator'
};

function getLinks(role) {
  const common = [{ to: '/settings', label: 'Settings', icon: Settings }];

  if (role === roles.CLUB_EXEC) {
    return [
      { to: '/club/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/manage-opportunities', label: 'Manage', icon: BriefcaseBusiness },
      { to: '/opportunities/create', label: 'Create', icon: Sparkles },
      { to: '/teams/create', label: 'Team Builder', icon: UsersRound },
      { to: '/notifications', label: 'Notifications', icon: Bell },
      ...common
    ];
  }

  if (role === roles.FACULTY) {
    return [
      { to: '/overview', label: 'Overview', icon: Gauge },
      { to: '/monitoring', label: 'Monitoring', icon: ShieldCheck },
      { to: '/opportunities', label: 'Opportunities', icon: BriefcaseBusiness },
      { to: '/notifications', label: 'Notifications', icon: Bell },
      ...common
    ];
  }

  return [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/profile', label: 'Profile', icon: UserRound },
    { to: '/opportunities', label: 'Discover', icon: BriefcaseBusiness },
    { to: '/applications', label: 'Applications', icon: ClipboardList },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    ...common
  ];
}

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const links = useMemo(() => getLinks(user.role), [user.role]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navContent = (
    <nav className="flex flex-col gap-1">
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-teal-50 text-teal-800'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white px-4 py-5 lg:block">
        <div className="flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-950">CampusGrid</p>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{roleLabels[user.role]}</p>
          </div>
        </div>

        <div className="mt-7">{navContent}</div>

        <div className="absolute bottom-5 left-4 right-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="truncate text-sm font-semibold text-slate-950">{user.name}</p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-teal-700" />
            <span className="font-bold text-slate-950">CampusGrid</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden">
          <div className="h-full w-80 max-w-[85vw] bg-white p-4 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-950">CampusGrid</p>
                <p className="text-xs text-slate-500">{roleLabels[user.role]}</p>
              </div>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {navContent}
          </div>
        </div>
      ) : null}

      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
