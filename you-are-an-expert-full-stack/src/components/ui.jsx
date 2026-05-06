import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  SearchX,
  UsersRound
} from 'lucide-react';
import { formatDate, getDomainById, getSkillById } from '../data/mockData';

const domainClasses = {
  teal: 'bg-teal-50 text-teal-800 ring-teal-200',
  rose: 'bg-rose-50 text-rose-800 ring-rose-200',
  amber: 'bg-amber-50 text-amber-800 ring-amber-200',
  indigo: 'bg-indigo-50 text-indigo-800 ring-indigo-200',
  emerald: 'bg-emerald-50 text-emerald-800 ring-emerald-200'
};

const statusClasses = {
  pending: 'bg-amber-50 text-amber-800 ring-amber-200',
  accepted: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  selected: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  rejected: 'bg-rose-50 text-rose-800 ring-rose-200',
  open: 'bg-teal-50 text-teal-800 ring-teal-200',
  closed: 'bg-slate-100 text-slate-700 ring-slate-200'
};

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">{eyebrow}</p> : null}
        <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">{title}</h1>
        {description ? <p className="mt-2 text-base leading-7 text-slate-600">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function StatCard({ label, value, icon: Icon, tone = 'teal', detail }) {
  const tones = {
    teal: 'bg-teal-50 text-teal-700',
    amber: 'bg-amber-50 text-amber-700',
    rose: 'bg-rose-50 text-rose-700',
    sky: 'bg-sky-50 text-sky-700',
    slate: 'bg-slate-100 text-slate-700'
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
        </div>
        {Icon ? (
          <div className={`grid h-11 w-11 place-items-center rounded-lg ${tones[tone] ?? tones.teal}`}>
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
      {detail ? <p className="mt-4 text-sm text-slate-500">{detail}</p> : null}
    </div>
  );
}

export function SkillBadge({ skillId, label, proficiency }) {
  const skillLabel = label ?? getSkillById(skillId)?.skill_name ?? 'Skill';
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
      {skillLabel}
      {proficiency ? <span className="text-slate-500">L{proficiency}</span> : null}
    </span>
  );
}

export function DomainBadge({ domainId }) {
  const domain = getDomainById(domainId);
  if (!domain) return null;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
        domainClasses[domain.color] ?? domainClasses.teal
      }`}
    >
      {domain.domain_name}
    </span>
  );
}

export function ApplicationStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
        statusClasses[status] ?? statusClasses.pending
      }`}
    >
      {status}
    </span>
  );
}

export function MatchScoreBar({ score }) {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 55 ? 'bg-amber-500' : 'bg-rose-500';
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>Compatibility</span>
        <span>{score}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export function OpportunityCard({ opportunity, compact = false }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-subtle">
      {!compact ? (
        <img src={opportunity.image} alt="" className="h-40 w-full object-cover" loading="lazy" />
      ) : null}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <DomainBadge domainId={opportunity.domain_id} />
          <ApplicationStatusBadge status={opportunity.status} />
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-950">{opportunity.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{opportunity.description}</p>
        <div className="mt-4 grid gap-2 text-sm text-slate-500 sm:grid-cols-2">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-teal-700" />
            Due {formatDate(opportunity.deadline)}
          </span>
          <span className="flex items-center gap-2">
            <UsersRound className="h-4 w-4 text-teal-700" />
            {opportunity.applicants_count} applicants
          </span>
        </div>
        <Link
          to={`/opportunities/${opportunity.opportunity_id}`}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          View details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function EmptyState({ title = 'Nothing here yet', description = 'Items will appear here when available.', action }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <SearchX className="mx-auto h-10 w-10 text-slate-400" />
      <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function LoadingState({ label = 'Loading' }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-600">
        <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
        {label}
      </div>
    </div>
  );
}

export function SectionTitle({ title, description, icon: Icon = BriefcaseBusiness }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-50 text-teal-700">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
    </div>
  );
}

export function TimelineItem({ title, description, meta }) {
  return (
    <div className="relative pl-7">
      <span className="absolute left-0 top-1 grid h-4 w-4 place-items-center rounded-full bg-teal-100 ring-4 ring-white">
        <CheckCircle2 className="h-3 w-3 text-teal-700" />
      </span>
      <p className="font-semibold text-slate-950">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      {meta ? (
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-400">
          <Clock3 className="h-3 w-3" />
          {meta}
        </p>
      ) : null}
    </div>
  );
}
