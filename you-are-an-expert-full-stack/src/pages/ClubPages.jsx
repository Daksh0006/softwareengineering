import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ClipboardCheck,
  Edit3,
  Plus,
  Save,
  Trash2,
  UsersRound,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  applications,
  computeMatchScore,
  domains,
  formatDate,
  formatTime,
  getMatchedSkills,
  getOpportunityById,
  getOpportunityRoles,
  getRoleById,
  getSkillById,
  getUserById,
  getUserSkills,
  opportunities,
  opportunityRoles,
  skills,
  teams
} from '../data/mockData';
import {
  ApplicationStatusBadge,
  DomainBadge,
  EmptyState,
  MatchScoreBar,
  PageHeader,
  SectionTitle,
  SkillBadge,
  StatCard
} from '../components/ui';

export function ClubDashboard() {
  const { user } = useAuth();
  const created = opportunities.filter((opportunity) => opportunity.created_by === user.user_id);
  const createdRoleIds = opportunityRoles
    .filter((role) => created.some((opportunity) => opportunity.opportunity_id === role.opportunity_id))
    .map((role) => role.role_id);
  const applicantCount = applications.filter((application) => createdRoleIds.includes(application.role_id)).length;
  const acceptedCount = applications.filter(
    (application) => createdRoleIds.includes(application.role_id) && application.status === 'accepted'
  ).length;

  return (
    <div>
      <PageHeader
        eyebrow="Club executive"
        title={`Executive dashboard`}
        description="Create opportunities, review applicants, and form balanced campus teams."
        action={
          <Link
            to="/opportunities/create"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" />
            New opportunity
          </Link>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Created opportunities" value={created.length} icon={BriefcaseBusiness} tone="teal" />
        <StatCard label="Total applicants" value={applicantCount} icon={UsersRound} tone="amber" />
        <StatCard label="Accepted applicants" value={acceptedCount} icon={ClipboardCheck} tone="sky" />
        <StatCard label="Teams formed" value={teams.length} icon={Check} tone="rose" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section>
          <SectionTitle title="Created opportunities" description="Open and closed listings owned by your club." />
          <div className="grid gap-4">
            {created.map((opportunity) => (
              <article key={opportunity.opportunity_id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <DomainBadge domainId={opportunity.domain_id} />
                      <ApplicationStatusBadge status={opportunity.status} />
                    </div>
                    <h2 className="mt-3 text-lg font-bold text-slate-950">{opportunity.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">Deadline {formatDate(opportunity.deadline)}</p>
                  </div>
                  <Link
                    to={`/opportunities/${opportunity.opportunity_id}/applicants`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
                  >
                    Applicants
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Applicant signals" description="Top pending candidates from the matching engine." icon={UsersRound} />
          <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
            {createdRoleIds
              .flatMap((roleId) => rankApplicationsForRole(roleId).slice(0, 1))
              .slice(0, 4)
              .map((candidate) => (
                <div key={candidate.application_id} className="rounded-lg bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-950">{candidate.user?.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{candidate.role?.role_name}</p>
                    </div>
                    <span className="text-sm font-bold text-teal-700">{candidate.score}%</span>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function CreateOpportunityPage() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    domain_id: domains[0].domain_id,
    deadline: '2026-06-30',
    slots: 4
  });
  const [roleRows, setRoleRows] = useState([
    {
      id: crypto.randomUUID(),
      role_name: 'Frontend Engineer',
      description: '',
      slots: 1,
      requirements: [{ skill_id: 1, weight: 8 }]
    }
  ]);

  const updateRole = (id, updates) => {
    setRoleRows((current) => current.map((role) => (role.id === id ? { ...role, ...updates } : role)));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      showToast({
        type: 'success',
        title: 'Opportunity drafted',
        message: `${form.title || 'New opportunity'} is ready for review in this frontend mock.`
      });
      navigate('/manage-opportunities');
    }, 600);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Create opportunity"
        title="Publish a role-based campus opportunity"
        description="Define the opportunity, add roles, and assign weighted required skills."
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <h2 className="text-xl font-bold text-slate-950">Opportunity details</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} required />
            <label>
              <span className="text-sm font-semibold text-slate-700">Domain</span>
              <select
                value={form.domain_id}
                onChange={(event) => setForm((current) => ({ ...current, domain_id: Number(event.target.value) }))}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
              >
                {domains.map((domain) => (
                  <option key={domain.domain_id} value={domain.domain_id}>
                    {domain.domain_name}
                  </option>
                ))}
              </select>
            </label>
            <Field
              label="Deadline"
              type="date"
              value={form.deadline}
              onChange={(value) => setForm((current) => ({ ...current, deadline: value }))}
              required
            />
            <Field
              label="Total slots"
              type="number"
              value={form.slots}
              onChange={(value) => setForm((current) => ({ ...current, slots: Number(value) }))}
            />
          </div>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">Description</span>
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
              required
            />
          </label>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Role builder</h2>
              <p className="mt-1 text-sm text-slate-500">Each role can have required skills and weights from 1 to 10.</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setRoleRows((current) => [
                  ...current,
                  { id: crypto.randomUUID(), role_name: '', description: '', slots: 1, requirements: [{ skill_id: 1, weight: 5 }] }
                ])
              }
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
            >
              <Plus className="h-4 w-4" />
              Add role
            </button>
          </div>

          <div className="mt-5 space-y-5">
            {roleRows.map((role, index) => (
              <div key={role.id} className="rounded-lg border border-slate-200 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-slate-950">Role {index + 1}</h3>
                  {roleRows.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => setRoleRows((current) => current.filter((item) => item.id !== role.id))}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-rose-200 text-rose-700"
                      aria-label="Remove role"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <Field label="Role name" value={role.role_name} onChange={(value) => updateRole(role.id, { role_name: value })} />
                  <Field
                    label="Slots"
                    type="number"
                    value={role.slots}
                    onChange={(value) => updateRole(role.id, { slots: Number(value) })}
                  />
                </div>
                <label className="mt-4 block">
                  <span className="text-sm font-semibold text-slate-700">Description</span>
                  <textarea
                    rows={3}
                    value={role.description}
                    onChange={(event) => updateRole(role.id, { description: event.target.value })}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
                  />
                </label>
                <div className="mt-4 space-y-3">
                  <p className="text-sm font-semibold text-slate-700">Required skills</p>
                  {role.requirements.map((requirement, requirementIndex) => (
                    <div key={`${role.id}-${requirementIndex}`} className="grid gap-3 md:grid-cols-[1fr_160px_44px]">
                      <select
                        value={requirement.skill_id}
                        onChange={(event) => {
                          const next = role.requirements.map((item, itemIndex) =>
                            itemIndex === requirementIndex ? { ...item, skill_id: Number(event.target.value) } : item
                          );
                          updateRole(role.id, { requirements: next });
                        }}
                        className="rounded-lg border border-slate-200 px-4 py-3"
                      >
                        {skills.map((skill) => (
                          <option key={skill.skill_id} value={skill.skill_id}>
                            {skill.skill_name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={requirement.weight}
                        onChange={(event) => {
                          const next = role.requirements.map((item, itemIndex) =>
                            itemIndex === requirementIndex ? { ...item, weight: Number(event.target.value) } : item
                          );
                          updateRole(role.id, { requirements: next });
                        }}
                        className="rounded-lg border border-slate-200 px-4 py-3"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateRole(role.id, {
                            requirements: role.requirements.filter((_, itemIndex) => itemIndex !== requirementIndex)
                          })
                        }
                        className="grid h-12 w-11 place-items-center rounded-lg border border-slate-200 text-slate-500"
                        aria-label="Remove skill requirement"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      updateRole(role.id, {
                        requirements: [...role.requirements, { skill_id: skills[0].skill_id, weight: 5 }]
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add skill
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {isLoading ? 'Creating...' : 'Create opportunity'}
        </button>
      </form>
    </div>
  );
}

export function ManageOpportunitiesPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [items, setItems] = useState(() => opportunities.filter((opportunity) => opportunity.created_by === user.user_id));
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});

  const startEdit = (opportunity) => {
    setEditingId(opportunity.opportunity_id);
    setDraft({
      title: opportunity.title,
      deadline: opportunity.deadline,
      status: opportunity.status
    });
  };

  const saveEdit = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.opportunity_id === id ? { ...item, title: draft.title, deadline: draft.deadline, status: draft.status } : item
      )
    );
    setEditingId(null);
    showToast({ type: 'success', title: 'Opportunity updated', message: 'Changes were saved locally.' });
  };

  const deleteItem = (id) => {
    setItems((current) => current.filter((item) => item.opportunity_id !== id));
    showToast({ type: 'success', title: 'Opportunity deleted', message: 'The opportunity was removed from this view.' });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Manage"
        title="Manage opportunities"
        description="View, edit, close, or delete opportunities created by your club."
        action={
          <Link
            to="/opportunities/create"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" />
            Create
          </Link>
        }
      />
      <div className="space-y-4">
        {items.map((opportunity) => {
          const isEditing = editingId === opportunity.opportunity_id;
          return (
            <article key={opportunity.opportunity_id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
              {isEditing ? (
                <div className="grid gap-4 md:grid-cols-[1fr_180px_160px_auto] md:items-end">
                  <Field label="Title" value={draft.title} onChange={(value) => setDraft((current) => ({ ...current, title: value }))} />
                  <Field
                    label="Deadline"
                    type="date"
                    value={draft.deadline}
                    onChange={(value) => setDraft((current) => ({ ...current, deadline: value }))}
                  />
                  <label>
                    <span className="text-sm font-semibold text-slate-700">Status</span>
                    <select
                      value={draft.status}
                      onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={() => saveEdit(opportunity.opportunity_id)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 text-sm font-bold text-white"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <DomainBadge domainId={opportunity.domain_id} />
                      <ApplicationStatusBadge status={opportunity.status} />
                    </div>
                    <h2 className="mt-3 text-lg font-bold text-slate-950">{opportunity.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">Deadline {formatDate(opportunity.deadline)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/opportunities/${opportunity.opportunity_id}/applicants`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700"
                    >
                      Applicants
                    </Link>
                    <button
                      type="button"
                      onClick={() => startEdit(opportunity)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteItem(opportunity.opportunity_id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function ApplicantManagementPage() {
  const { id } = useParams();
  const { showToast } = useToast();
  const opportunity = getOpportunityById(id);
  const rolesForOpportunity = getOpportunityRoles(id);
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(applications.map((application) => [application.application_id, application.status]))
  );

  if (!opportunity) {
    return <EmptyState title="Opportunity not found" description="Applicant management is unavailable." />;
  }

  const updateStatus = (applicationId, status) => {
    setStatuses((current) => ({ ...current, [applicationId]: status }));
    showToast({ type: 'success', title: 'Applicant updated', message: `Application marked ${status}.` });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Applicant management"
        title={opportunity.title}
        description="Review applicants by role, inspect compatibility scores, and accept or reject candidates."
      />
      <div className="space-y-6">
        {rolesForOpportunity.map((role) => {
          const ranked = rankApplicationsForRole(role.role_id, statuses);
          return (
            <section key={role.role_id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">{role.role_name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{role.description}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{role.slots} slots</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {role.required_skills.map((requirement) => (
                  <SkillBadge
                    key={requirement.skill_id}
                    label={`${getSkillById(requirement.skill_id)?.skill_name} x${requirement.weight}`}
                  />
                ))}
              </div>
              <div className="mt-5 grid gap-4">
                {ranked.length ? (
                  ranked.map((candidate) => (
                    <article key={candidate.application_id} className="rounded-lg border border-slate-200 p-5">
                      <div className="grid gap-4 lg:grid-cols-[1fr_240px_240px] lg:items-center">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-slate-950">{candidate.user?.name}</h3>
                            <ApplicationStatusBadge status={candidate.status} />
                          </div>
                          <p className="mt-1 text-sm text-slate-500">Applied {formatTime(candidate.applied_at)}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {candidate.matched_skills.length ? (
                              candidate.matched_skills.map((skillName) => <SkillBadge key={skillName} label={skillName} />)
                            ) : (
                              <span className="text-sm text-slate-500">No direct skill matches yet.</span>
                            )}
                          </div>
                        </div>
                        <MatchScoreBar score={candidate.score} />
                        <div className="flex flex-wrap gap-2 lg:justify-end">
                          <button
                            type="button"
                            onClick={() => updateStatus(candidate.application_id, 'accepted')}
                            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white"
                          >
                            <Check className="h-4 w-4" />
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStatus(candidate.application_id, 'rejected')}
                            className="inline-flex items-center gap-2 rounded-lg border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700"
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <EmptyState title="No applicants yet" description="Applicants for this role will appear here." />
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function TeamFormationPage() {
  const { showToast } = useToast();
  const [opportunityId, setOpportunityId] = useState(opportunities[0].opportunity_id);
  const [assignments, setAssignments] = useState({});
  const [teamName, setTeamName] = useState('New campus team');
  const selectedOpportunity = getOpportunityById(opportunityId);
  const rolesForOpportunity = getOpportunityRoles(opportunityId);

  const acceptedForRole = (roleId) =>
    applications
      .filter((application) => application.role_id === roleId && application.status === 'accepted')
      .map((application) => ({ ...application, user: getUserById(application.user_id), role: getRoleById(application.role_id) }));

  const handleCreate = () => {
    showToast({
      type: 'success',
      title: 'Team formed',
      message: `${teamName} has ${Object.values(assignments).filter(Boolean).length} assigned member slots.`
    });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Team formation"
        title="Build a team from accepted applicants"
        description="Select an opportunity, assign accepted candidates to roles, and create a team workspace."
      />
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <h2 className="text-xl font-bold text-slate-950">Team setup</h2>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-700">Team name</span>
            <input
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-slate-700">Opportunity</span>
            <select
              value={opportunityId}
              onChange={(event) => {
                setOpportunityId(Number(event.target.value));
                setAssignments({});
              }}
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
            >
              {opportunities.map((opportunity) => (
                <option key={opportunity.opportunity_id} value={opportunity.opportunity_id}>
                  {opportunity.title}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-5 rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-950">{selectedOpportunity?.title}</p>
            <p className="mt-1 text-sm text-slate-500">Deadline {formatDate(selectedOpportunity?.deadline)}</p>
          </div>
          <button
            type="button"
            onClick={handleCreate}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            <UsersRound className="h-4 w-4" />
            Form team
          </button>
        </aside>

        <section className="space-y-4">
          {rolesForOpportunity.map((role) => {
            const candidates = acceptedForRole(role.role_id);
            return (
              <article key={role.role_id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950">{role.role_name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{role.slots} available slots</p>
                  </div>
                  <select
                    value={assignments[role.role_id] || ''}
                    onChange={(event) =>
                      setAssignments((current) => ({ ...current, [role.role_id]: Number(event.target.value) || '' }))
                    }
                    className="rounded-lg border border-slate-200 px-4 py-3"
                  >
                    <option value="">Select accepted candidate</option>
                    {candidates.map((candidate) => (
                      <option key={candidate.application_id} value={candidate.user_id}>
                        {candidate.user?.name}
                      </option>
                    ))}
                  </select>
                </div>
                {candidates.length ? (
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {candidates.map((candidate) => (
                      <div key={candidate.application_id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="font-semibold text-slate-950">{candidate.user?.name}</p>
                        <p className="mt-1 text-sm text-slate-500">Accepted {formatTime(candidate.applied_at)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4">
                    <EmptyState title="No accepted applicants" description="Accept applicants before assigning this role." />
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}

function rankApplicationsForRole(roleId, statusOverrides = {}) {
  const role = getRoleById(roleId);
  if (!role) return [];

  return applications
    .filter((application) => application.role_id === Number(roleId))
    .map((application) => {
      const user = getUserById(application.user_id);
      const userSkillList = getUserSkills(application.user_id);
      const status = statusOverrides[application.application_id] || application.status;
      return {
        ...application,
        status,
        user,
        role,
        score: computeMatchScore(userSkillList, role.required_skills),
        matched_skills: getMatchedSkills(userSkillList, role.required_skills)
      };
    })
    .sort((a, b) => b.score - a.score);
}

function Field({ label, value, onChange, type = 'text', required = false }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
      />
    </label>
  );
}
