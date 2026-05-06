import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Edit3,
  ExternalLink,
  Filter,
  MessageSquareText,
  Plus,
  Save,
  Search,
  Send,
  Settings2,
  SlidersHorizontal,
  UsersRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  applications,
  computeMatchScore,
  domains,
  formatDate,
  formatTime,
  getApplicationsForUser,
  getDomainById,
  getMatchedSkills,
  getOpportunityById,
  getOpportunityRoles,
  getRoleById,
  getSkillById,
  getTeamDetails,
  getTeamsForUser,
  getUserById,
  getUserSkills,
  isTeamMember,
  messages,
  notifications,
  opportunities,
  skills
} from '../data/mockData';
import {
  ApplicationStatusBadge,
  DomainBadge,
  EmptyState,
  MatchScoreBar,
  OpportunityCard,
  PageHeader,
  SectionTitle,
  SkillBadge,
  StatCard,
  TimelineItem
} from '../components/ui';

export function StudentDashboard() {
  const { user } = useAuth();
  const studentApplications = getApplicationsForUser(user.user_id);
  const studentTeams = getTeamsForUser(user.user_id);
  const studentSkills = getUserSkills(user.user_id);
  const recommended = useMemo(() => {
    return opportunities
      .filter((opportunity) => opportunity.status === 'open')
      .map((opportunity) => {
        const roleScores = getOpportunityRoles(opportunity.opportunity_id).map((role) =>
          computeMatchScore(studentSkills, role.required_skills)
        );
        return { ...opportunity, score: Math.max(...roleScores, 0) };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [studentSkills]);

  return (
    <div>
      <PageHeader
        eyebrow="Student workspace"
        title={`Welcome back, ${user.name.split(' ')[0]}`}
        description="Your applications, team memberships, recommended opportunities, and updates are gathered here."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Recommended" value={recommended.length} icon={BriefcaseBusiness} tone="teal" />
        <StatCard
          label="Active applications"
          value={studentApplications.filter((item) => item.status === 'pending').length}
          icon={ClipboardList}
          tone="amber"
        />
        <StatCard label="Teams" value={studentTeams.length} icon={UsersRound} tone="sky" />
        <StatCard
          label="Notifications"
          value={notifications.filter((item) => item.user_id === user.user_id && !item.read).length}
          icon={Bell}
          tone="rose"
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section>
          <SectionTitle
            title="Recommended opportunities"
            description="Ranked using the best available role fit from your current skill profile."
            icon={SlidersHorizontal}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {recommended.map((opportunity) => (
              <div key={opportunity.opportunity_id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
                <div className="flex items-center justify-between gap-3">
                  <DomainBadge domainId={opportunity.domain_id} />
                  <span className="text-sm font-bold text-teal-700">{opportunity.score}% fit</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{opportunity.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{opportunity.description}</p>
                <MatchScoreBar score={opportunity.score} />
                <Link
                  to={`/opportunities/${opportunity.opportunity_id}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  View roles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Application status" description="Your most recent submissions." icon={ClipboardList} />
          <div className="space-y-3">
            {studentApplications.slice(0, 4).map((application) => (
              <div key={application.application_id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-subtle">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{application.role?.role_name}</p>
                    <p className="mt-1 text-sm text-slate-500">{application.opportunity?.title}</p>
                  </div>
                  <ApplicationStatusBadge status={application.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <SectionTitle title="Team updates" description="Your current campus teams." icon={UsersRound} />
          <div className="grid gap-4">
            {studentTeams.map((team) => (
              <Link
                key={team.team_id}
                to={`/teams/${team.team_id}`}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle transition hover:border-teal-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-950">{team.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{team.opportunity?.title}</p>
                  </div>
                  <span className="text-sm font-bold text-teal-700">{team.progress}%</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-teal-500" style={{ width: `${team.progress}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Notifications" description="Selections, invitations, approvals, and updates." icon={Bell} />
          <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
            {notifications
              .filter((item) => item.user_id === user.user_id)
              .slice(0, 3)
              .map((item) => (
                <TimelineItem key={item.id} title={item.title} description={item.body} meta={formatTime(item.created_at)} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function ProfilePage() {
  const { user } = useAuth();
  const profileSkills = getUserSkills(user.user_id);
  const profileDomains = user.domains || [];

  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title={user.name}
        description="Your profile powers recommendations, application context, and matching signals."
        action={
          <div className="flex flex-wrap gap-2">
            <Link
              to="/profile/skills"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
            >
              <Settings2 className="h-4 w-4" />
              Skills
            </Link>
            <Link
              to="/profile/edit"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <Edit3 className="h-4 w-4" />
              Edit profile
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-lg bg-teal-600 text-2xl font-bold text-white">
              {user.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-950">{user.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{user.email}</p>
            </div>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <ProfileFact label="Branch" value={user.branch} />
            <ProfileFact label="Year" value={user.year} />
            <ProfileFact label="Academic details" value={user.academic_details || 'Not added'} wide />
          </dl>

          <div className="mt-6">
            <h3 className="font-bold text-slate-950">Bio</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{user.bio || 'No bio added yet.'}</p>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <h2 className="text-xl font-bold text-slate-950">Skills and domains</h2>
          <div className="mt-5">
            <p className="text-sm font-semibold text-slate-500">Skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profileSkills.length ? (
                profileSkills.map((skill) => (
                  <SkillBadge key={skill.skill_id} label={skill.skill_name} proficiency={skill.proficiency} />
                ))
              ) : (
                <span className="text-sm text-slate-500">No skills added yet.</span>
              )}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-500">Domain interests</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profileDomains.length ? (
                profileDomains.map((domainId) => <DomainBadge key={domainId} domainId={domainId} />)
              ) : (
                <span className="text-sm text-slate-500">No domains selected yet.</span>
              )}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-500">Links</p>
            <div className="mt-3 grid gap-2">
              {Object.entries(user.links || {}).map(([label, value]) =>
                value ? (
                  <a
                    key={label}
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold capitalize text-teal-700"
                  >
                    {label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null
              )}
            </div>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
        <h2 className="text-xl font-bold text-slate-950">Achievements</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {(user.achievements || []).length ? (
            user.achievements.map((achievement) => (
              <div key={achievement} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 className="h-5 w-5 text-teal-700" />
                <p className="text-sm font-medium text-slate-700">{achievement}</p>
              </div>
            ))
          ) : (
            <EmptyState title="No achievements added" description="Add hackathons, projects, publications, or club work." />
          )}
        </div>
      </section>
    </div>
  );
}

export function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bio: user.bio || '',
    branch: user.branch || '',
    year: user.year || '',
    academic_details: user.academic_details || '',
    portfolio: user.links?.portfolio || '',
    github: user.links?.github || '',
    linkedin: user.links?.linkedin || '',
    achievements: (user.achievements || []).join(', ')
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    window.setTimeout(() => {
      updateUser({
        bio: form.bio,
        branch: form.branch,
        year: form.year,
        academic_details: form.academic_details,
        links: {
          portfolio: form.portfolio,
          github: form.github,
          linkedin: form.linkedin
        },
        achievements: form.achievements
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      });
      setIsLoading(false);
      showToast({ type: 'success', title: 'Profile updated', message: 'Your profile changes were saved locally.' });
      navigate('/profile');
    }, 450);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Edit profile"
        title="Update your student profile"
        description="Keep matching signals accurate before applying to roles."
      />
      <form className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-subtle" onSubmit={handleSubmit}>
        <label>
          <span className="text-sm font-semibold text-slate-700">Bio</span>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Branch" value={form.branch} onChange={(value) => setForm((current) => ({ ...current, branch: value }))} />
          <Field label="Year" value={form.year} onChange={(value) => setForm((current) => ({ ...current, year: value }))} />
        </div>
        <Field
          label="Academic details"
          value={form.academic_details}
          onChange={(value) => setForm((current) => ({ ...current, academic_details: value }))}
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Portfolio" value={form.portfolio} onChange={(value) => setForm((current) => ({ ...current, portfolio: value }))} />
          <Field label="GitHub" value={form.github} onChange={(value) => setForm((current) => ({ ...current, github: value }))} />
          <Field label="LinkedIn" value={form.linkedin} onChange={(value) => setForm((current) => ({ ...current, linkedin: value }))} />
        </div>
        <Field
          label="Achievements"
          value={form.achievements}
          onChange={(value) => setForm((current) => ({ ...current, achievements: value }))}
          helper="Separate each achievement with a comma."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </div>
  );
}

export function SkillsDomainsPage() {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const initialSkills = getUserSkills(user.user_id);
  const [selectedSkills, setSelectedSkills] = useState(() =>
    skills.map((skill) => {
      const existing = initialSkills.find((item) => item.skill_id === skill.skill_id);
      return {
        ...skill,
        enabled: Boolean(existing),
        proficiency: existing?.proficiency || 3
      };
    })
  );
  const [domainIds, setDomainIds] = useState(user.domains || []);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDomain = (domainId) => {
    setDomainIds((current) =>
      current.includes(domainId) ? current.filter((item) => item !== domainId) : [...current, domainId]
    );
  };

  const handleSave = () => {
    setIsLoading(true);
    window.setTimeout(() => {
      updateUser({ domains: domainIds });
      setIsLoading(false);
      showToast({
        type: 'success',
        title: 'Skills saved',
        message: `${selectedSkills.filter((skill) => skill.enabled).length} skills ready for matching.`
      });
    }, 400);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Skills and domains"
        title="Manage matching signals"
        description="Select skills, adjust proficiency levels, and choose domain interests."
        action={
          <button
            type="button"
            disabled={isLoading}
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <h2 className="text-xl font-bold text-slate-950">Skills</h2>
          <div className="mt-5 divide-y divide-slate-100">
            {selectedSkills.map((skill) => (
              <div key={skill.skill_id} className="grid gap-4 py-4 md:grid-cols-[1fr_220px] md:items-center">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={skill.enabled}
                    onChange={(event) =>
                      setSelectedSkills((current) =>
                        current.map((item) =>
                          item.skill_id === skill.skill_id ? { ...item, enabled: event.target.checked } : item
                        )
                      )
                    }
                    className="h-4 w-4 rounded border-slate-300 text-teal-600"
                  />
                  <span className="font-semibold text-slate-800">{skill.skill_name}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={skill.proficiency}
                    disabled={!skill.enabled}
                    onChange={(event) =>
                      setSelectedSkills((current) =>
                        current.map((item) =>
                          item.skill_id === skill.skill_id
                            ? { ...item, proficiency: Number(event.target.value) }
                            : item
                        )
                      )
                    }
                    className="w-full accent-teal-600 disabled:opacity-40"
                  />
                  <span className="w-8 text-sm font-bold text-slate-700">{skill.proficiency}/5</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <h2 className="text-xl font-bold text-slate-950">Domain interests</h2>
          <div className="mt-5 grid gap-3">
            {domains.map((domain) => (
              <button
                key={domain.domain_id}
                type="button"
                onClick={() => toggleDomain(domain.domain_id)}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
                  domainIds.includes(domain.domain_id)
                    ? 'border-teal-500 bg-teal-50 text-teal-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {domain.domain_name}
                {domainIds.includes(domain.domain_id) ? <CheckCircle2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function DiscoverOpportunitiesPage() {
  const { user } = useAuth();
  const studentSkills = getUserSkills(user.user_id);
  const [search, setSearch] = useState('');
  const [domainId, setDomainId] = useState('all');
  const [status, setStatus] = useState('open');

  const filtered = opportunities
    .filter((opportunity) => (status === 'all' ? true : opportunity.status === status))
    .filter((opportunity) => (domainId === 'all' ? true : opportunity.domain_id === Number(domainId)))
    .filter((opportunity) => opportunity.title.toLowerCase().includes(search.toLowerCase()))
    .map((opportunity) => {
      const roleScores = getOpportunityRoles(opportunity.opportunity_id).map((role) =>
        computeMatchScore(studentSkills, role.required_skills)
      );
      return { ...opportunity, score: Math.max(...roleScores, 0) };
    });

  return (
    <div>
      <PageHeader
        eyebrow="Discover"
        title="Browse campus opportunities"
        description="Search, filter, and compare opportunities across development, design, analytics, operations, and content."
      />

      <div className="mb-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-subtle lg:grid-cols-[1fr_220px_180px]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search opportunities"
            className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4"
          />
        </label>
        <label className="relative">
          <Filter className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <select
            value={domainId}
            onChange={(event) => setDomainId(event.target.value)}
            className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4"
          >
            <option value="all">All domains</option>
            {domains.map((domain) => (
              <option key={domain.domain_id} value={domain.domain_id}>
                {domain.domain_name}
              </option>
            ))}
          </select>
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="w-full rounded-lg border border-slate-200 px-4 py-3"
        >
          <option value="open">Open only</option>
          <option value="closed">Closed</option>
          <option value="all">All status</option>
        </select>
      </div>

      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((opportunity) => (
            <div key={opportunity.opportunity_id}>
              <OpportunityCard opportunity={opportunity} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No opportunities found" description="Try a different keyword, domain, or status filter." />
      )}
    </div>
  );
}

export function OpportunityDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const opportunity = getOpportunityById(id);
  const rolesForOpportunity = getOpportunityRoles(id);
  const [appliedRoleIds, setAppliedRoleIds] = useState(() =>
    applications.filter((application) => application.user_id === user.user_id).map((application) => application.role_id)
  );
  const [loadingRole, setLoadingRole] = useState(null);
  const studentSkills = getUserSkills(user.user_id);

  if (!opportunity) {
    return <EmptyState title="Opportunity not found" description="The requested opportunity is unavailable." />;
  }

  const handleApply = (roleId) => {
    setLoadingRole(roleId);
    window.setTimeout(() => {
      setAppliedRoleIds((current) => [...current, roleId]);
      setLoadingRole(null);
      showToast({ type: 'success', title: 'Application submitted', message: 'Your application is now pending review.' });
    }, 500);
  };

  return (
    <div>
      <PageHeader
        eyebrow={getDomainById(opportunity.domain_id)?.domain_name}
        title={opportunity.title}
        description={opportunity.description}
        action={<ApplicationStatusBadge status={opportunity.status} />}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="space-y-5">
          <img src={opportunity.image} alt="" className="h-72 w-full rounded-lg object-cover shadow-subtle" />
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
            <h2 className="text-xl font-bold text-slate-950">Open roles</h2>
            <div className="mt-5 space-y-4">
              {rolesForOpportunity.map((role) => {
                const score = computeMatchScore(studentSkills, role.required_skills);
                const alreadyApplied = appliedRoleIds.includes(role.role_id);
                const isClosed = opportunity.status === 'closed';
                return (
                  <article key={role.role_id} className="rounded-lg border border-slate-200 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-950">{role.role_name}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{role.description}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {role.slots} slots
                      </span>
                    </div>
                    <div className="mt-4 grid gap-4 md:grid-cols-[1fr_220px] md:items-end">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Required skills</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {role.required_skills.map((requirement) => (
                            <SkillBadge
                              key={requirement.skill_id}
                              label={`${getSkillById(requirement.skill_id)?.skill_name} x${requirement.weight}`}
                            />
                          ))}
                        </div>
                      </div>
                      <MatchScoreBar score={score} />
                    </div>
                    <button
                      type="button"
                      disabled={alreadyApplied || isClosed || loadingRole === role.role_id}
                      onClick={() => handleApply(role.role_id)}
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isClosed
                        ? 'Closed'
                        : alreadyApplied
                          ? 'Already applied'
                          : loadingRole === role.role_id
                            ? 'Submitting...'
                            : 'Apply'}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
            <h2 className="text-lg font-bold text-slate-950">Opportunity details</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-teal-700" />
                Deadline {formatDate(opportunity.deadline)}
              </p>
              <p className="flex items-center gap-2">
                <UsersRound className="h-4 w-4 text-teal-700" />
                {opportunity.applicants_count} applicants
              </p>
              <p className="flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-teal-700" />
                {rolesForOpportunity.length} roles
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
            <h2 className="text-lg font-bold text-slate-950">Recent updates</h2>
            <div className="mt-4 space-y-4">
              {opportunity.updates.map((update, index) => (
                <TimelineItem key={update} title={update} description="Shared by the opportunity owner." meta={`Update ${index + 1}`} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function ApplicationsPage() {
  const { user } = useAuth();
  const studentApplications = getApplicationsForUser(user.user_id);

  return (
    <div>
      <PageHeader
        eyebrow="Applications"
        title="Track submitted applications"
        description="Pending, rejected, and selected role applications remain visible here."
      />
      {studentApplications.length ? (
        <div className="grid gap-4">
          {studentApplications.map((application) => (
            <article key={application.application_id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{application.role?.role_name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{application.opportunity?.title}</p>
                  <p className="mt-2 text-xs font-medium text-slate-400">Applied {formatTime(application.applied_at)}</p>
                </div>
                <ApplicationStatusBadge status={application.status} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No applications yet"
          description="Discover opportunities and apply to a role to start tracking."
          action={
            <Link
              to="/opportunities"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white"
            >
              Browse opportunities
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      )}
    </div>
  );
}

export function TeamWorkspacePage() {
  const { teamId } = useParams();
  const { user } = useAuth();
  const team = getTeamDetails(teamId);

  if (!team) {
    return <EmptyState title="Team not found" description="The requested workspace does not exist." />;
  }

  if (!isTeamMember(team.team_id, user.user_id)) {
    return <EmptyState title="Team access restricted" description="Team workspaces are visible only to assigned members." />;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Team workspace"
        title={team.name}
        description={team.opportunity?.title}
        action={
          <Link
            to={`/teams/${team.team_id}/chat`}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            <MessageSquareText className="h-4 w-4" />
            Open chat
          </Link>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-subtle">
          <h2 className="text-xl font-bold text-slate-950">Members and assigned roles</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {team.members.map((member) => (
              <div key={`${member.team_id}-${member.user_id}`} className="rounded-lg border border-slate-200 p-4">
                <p className="font-bold text-slate-950">{member.user?.name}</p>
                <p className="mt-1 text-sm text-slate-500">{member.role?.role_name}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {getUserSkills(member.user_id)
                    .slice(0, 3)
                    .map((skill) => (
                      <SkillBadge key={skill.skill_id} label={skill.skill_name} proficiency={skill.proficiency} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
            <h2 className="text-lg font-bold text-slate-950">Team information</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <InfoRow label="Opportunity" value={team.opportunity?.title} />
              <InfoRow label="Created" value={formatDate(team.created_at)} />
              <InfoRow label="Progress" value={`${team.progress}%`} />
            </dl>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-subtle">
            <h2 className="text-lg font-bold text-slate-950">Latest messages</h2>
            <div className="mt-4 space-y-3">
              {team.messages.slice(-2).map((message) => (
                <div key={message.message_id} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-950">{getUserById(message.sender_id)?.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function TeamCommunicationPage() {
  const { teamId } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const team = getTeamDetails(teamId);
  const [thread, setThread] = useState(() => messages.filter((message) => message.team_id === Number(teamId)));
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [thread.length]);

  if (!team) {
    return <EmptyState title="Team not found" description="The requested chat does not exist." />;
  }

  if (!isTeamMember(team.team_id, user.user_id)) {
    return <EmptyState title="Messages restricted" description="Team messages are visible only to assigned members." />;
  }

  const handleSend = (event) => {
    event.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    window.setTimeout(() => {
      setThread((current) => [
        ...current,
        {
          message_id: Date.now(),
          team_id: team.team_id,
          sender_id: user.user_id,
          content: content.trim(),
          sent_at: new Date().toISOString()
        }
      ]);
      setContent('');
      setIsLoading(false);
      showToast({ type: 'success', title: 'Message sent', message: 'Your team can see the update now.' });
    }, 300);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Team communication"
        title={`${team.name} chat`}
        description="Messages are scoped to this team workspace."
      />
      <section className="rounded-lg border border-slate-200 bg-white shadow-subtle">
        <div ref={listRef} className="scrollbar-thin h-[58vh] space-y-4 overflow-y-auto p-5">
          {thread.map((message) => {
            const sender = getUserById(message.sender_id);
            const isMine = message.sender_id === user.user_id;
            return (
              <div key={message.message_id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl rounded-lg p-4 ${isMine ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold opacity-80">
                    <span>{sender?.name}</span>
                    <span>{formatTime(message.sent_at)}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6">{message.content}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form className="flex gap-3 border-t border-slate-200 p-4" onSubmit={handleSend}>
          <input
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Type a team update"
            className="min-w-0 flex-1 rounded-lg border border-slate-200 px-4 py-3"
          />
          <button
            type="submit"
            disabled={isLoading || !content.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

export function NotificationsPage() {
  const { user } = useAuth();
  const items = notifications.filter((notification) => notification.user_id === user.user_id);

  return (
    <div>
      <PageHeader
        eyebrow="Notifications"
        title="Selections, invitations, approvals, and updates"
        description="A single place for campus workflow events."
      />
      {items.length ? (
        <div className="grid gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className={`rounded-lg border p-5 shadow-subtle ${
                item.read ? 'border-slate-200 bg-white' : 'border-teal-200 bg-teal-50'
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">{formatTime(item.created_at)}</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No notifications" description="Selections, invitations, and updates will appear here." />
      )}
    </div>
  );
}

function ProfileFact({ label, value, wide }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-800">{value}</dd>
    </div>
  );
}

function Field({ label, value, onChange, helper }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
      />
      {helper ? <span className="mt-1 block text-xs text-slate-500">{helper}</span> : null}
    </label>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-semibold text-slate-800">{value}</dd>
    </div>
  );
}
