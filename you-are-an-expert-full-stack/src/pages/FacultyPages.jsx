import { useState } from 'react';
import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  ShieldCheck,
  UsersRound
} from 'lucide-react';
import {
  activityLog,
  applications,
  demoUsers,
  domains,
  formatDate,
  getDomainById,
  getOpportunityRoles,
  opportunities,
  teams
} from '../data/mockData';
import { ApplicationStatusBadge, DomainBadge, EmptyState, PageHeader, SectionTitle, StatCard, TimelineItem } from '../components/ui';
import { useToast } from '../context/ToastContext';

export function FacultyDashboardPage() {
  const clubs = demoUsers.filter((user) => user.role === 'club_exec');
  const students = demoUsers.filter((user) => user.role === 'student');
  const openOpportunities = opportunities.filter((opportunity) => opportunity.status === 'open');
  const participation = new Set(applications.map((application) => application.user_id)).size;

  return (
    <div>
      <PageHeader
        eyebrow="Faculty coordinator"
        title="CampusGrid overview"
        description="Read-only campus activity across clubs, opportunities, teams, and participation."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Clubs" value={clubs.length} icon={GraduationCap} tone="teal" />
        <StatCard label="Open opportunities" value={openOpportunities.length} icon={BriefcaseBusiness} tone="amber" />
        <StatCard label="Teams" value={teams.length} icon={UsersRound} tone="sky" />
        <StatCard label="Participating students" value={`${participation}/${students.length}`} icon={BarChart3} tone="rose" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <SectionTitle title="Opportunity report" description="Current listings with team formation signals." />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-3 pr-4">Opportunity</th>
                  <th className="py-3 pr-4">Domain</th>
                  <th className="py-3 pr-4">Roles</th>
                  <th className="py-3 pr-4">Applicants</th>
                  <th className="py-3 pr-4">Deadline</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {opportunities.map((opportunity) => (
                  <tr key={opportunity.opportunity_id}>
                    <td className="py-4 pr-4 font-semibold text-slate-950">{opportunity.title}</td>
                    <td className="py-4 pr-4">
                      <DomainBadge domainId={opportunity.domain_id} />
                    </td>
                    <td className="py-4 pr-4 text-slate-600">{getOpportunityRoles(opportunity.opportunity_id).length}</td>
                    <td className="py-4 pr-4 text-slate-600">{opportunity.applicants_count}</td>
                    <td className="py-4 pr-4 text-slate-600">{formatDate(opportunity.deadline)}</td>
                    <td className="py-4 pr-4">
                      <ApplicationStatusBadge status={opportunity.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <SectionTitle title="Participation by domain" description="Distribution of live opportunities." icon={BarChart3} />
          <div className="space-y-4">
            {domains.map((domain) => {
              const count = opportunities.filter((opportunity) => opportunity.domain_id === domain.domain_id).length;
              const width = Math.max((count / opportunities.length) * 100, count ? 18 : 4);
              return (
                <div key={domain.domain_id}>
                  <div className="flex justify-between text-sm font-semibold text-slate-700">
                    <span>{domain.domain_name}</span>
                    <span>{count}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-teal-500" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export function MonitoringPage() {
  const { showToast } = useToast();
  const [queue, setQueue] = useState([
    { id: 1, title: 'Robotics Documentation Sprint', club: 'Robotics Club', domain_id: 4 },
    { id: 2, title: 'Open Source Maintainers Cohort', club: 'Developer Student Club', domain_id: 1 }
  ]);

  const approve = (id) => {
    const item = queue.find((candidate) => candidate.id === id);
    setQueue((current) => current.filter((candidate) => candidate.id !== id));
    showToast({ type: 'success', title: 'Opportunity approved', message: `${item.title} can now go live.` });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Approval and monitoring"
        title="Monitor platform activity"
        description="Approve opportunities and inspect activity across the collaboration pipeline."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <SectionTitle title="Approval queue" description="Opportunities awaiting faculty coordinator approval." icon={ShieldCheck} />
          {queue.length ? (
            <div className="space-y-4">
              {queue.map((item) => (
                <article key={item.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.club}</p>
                      <p className="mt-2 text-xs font-semibold text-teal-700">{getDomainById(item.domain_id)?.domain_name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => approve(item.id)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Approve
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="Approval queue clear" description="New opportunities will appear here before publication." />
          )}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <SectionTitle title="Activity stream" description="Recent platform activity." icon={ClipboardCheck} />
          <div className="space-y-5">
            {activityLog.map((activity) => (
              <TimelineItem
                key={activity.id}
                title={activity.actor}
                description={activity.action}
                meta={activity.time}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
