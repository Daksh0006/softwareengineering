export const roles = {
  STUDENT: 'student',
  CLUB_EXEC: 'club_exec',
  FACULTY: 'faculty'
};

export const demoUsers = [
  {
    user_id: 1,
    name: 'Aarav Sharma',
    email: 'student@campusgrid.dev',
    role: roles.STUDENT,
    branch: 'Computer Science',
    year: 'Third Year',
    academic_details: 'B.Tech CSE, CGPA 8.7',
    bio: 'Frontend developer who enjoys building useful campus tools and design systems.',
    domains: [1, 2],
    links: {
      portfolio: 'https://aarav.dev',
      github: 'https://github.com/aarav',
      linkedin: 'https://linkedin.com/in/aarav'
    },
    achievements: ['Finalist, Campus Hack 2025', 'Open-source design kit maintainer'],
    created_at: '2026-02-11T08:00:00Z'
  },
  {
    user_id: 2,
    name: 'Meera Iyer',
    email: 'meera@campusgrid.dev',
    role: roles.STUDENT,
    branch: 'Information Technology',
    year: 'Second Year',
    academic_details: 'B.Tech IT, CGPA 9.1',
    bio: 'Data storyteller focused on analytics, dashboards, and research operations.',
    domains: [3],
    links: {
      portfolio: 'https://meera.dev',
      github: 'https://github.com/meera',
      linkedin: 'https://linkedin.com/in/meera'
    },
    achievements: ['Winner, Analytics Sprint', 'Research volunteer, Placement Cell'],
    created_at: '2026-01-22T08:00:00Z'
  },
  {
    user_id: 3,
    name: 'Riya Menon',
    email: 'club@campusgrid.dev',
    role: roles.CLUB_EXEC,
    branch: 'Electronics and Communication',
    year: 'Final Year',
    academic_details: 'Technical Council, Product Club Executive',
    bio: 'Club executive coordinating student teams for campus products and events.',
    domains: [1, 2, 4],
    links: {
      portfolio: 'https://productclub.campusgrid.dev',
      github: '',
      linkedin: 'https://linkedin.com/in/riya'
    },
    achievements: ['Led TechWeek 2025', 'Mentored 12 product teams'],
    created_at: '2026-01-05T08:00:00Z'
  },
  {
    user_id: 4,
    name: 'Dr. Neel Rao',
    email: 'faculty@campusgrid.dev',
    role: roles.FACULTY,
    branch: 'Faculty Coordinator',
    year: 'Department of CSE',
    academic_details: 'Faculty coordinator for student innovation programs',
    bio: 'Oversees campus collaboration quality, approvals, and participation reports.',
    domains: [1, 3, 4],
    links: {
      portfolio: 'https://faculty.campusgrid.dev/neel-rao',
      github: '',
      linkedin: ''
    },
    achievements: ['Innovation Cell Coordinator', 'Faculty sponsor for Product Club'],
    created_at: '2025-12-10T08:00:00Z'
  }
];

export const skills = [
  { skill_id: 1, skill_name: 'React' },
  { skill_id: 2, skill_name: 'Node.js' },
  { skill_id: 3, skill_name: 'UI Design' },
  { skill_id: 4, skill_name: 'Data Analysis' },
  { skill_id: 5, skill_name: 'PostgreSQL' },
  { skill_id: 6, skill_name: 'Content Strategy' },
  { skill_id: 7, skill_name: 'Figma' },
  { skill_id: 8, skill_name: 'Project Management' },
  { skill_id: 9, skill_name: 'Python' },
  { skill_id: 10, skill_name: 'Research' }
];

export const domains = [
  { domain_id: 1, domain_name: 'Development', color: 'teal' },
  { domain_id: 2, domain_name: 'Design', color: 'rose' },
  { domain_id: 3, domain_name: 'Analytics', color: 'amber' },
  { domain_id: 4, domain_name: 'Operations', color: 'indigo' },
  { domain_id: 5, domain_name: 'Content', color: 'emerald' }
];

export const userSkills = [
  { user_id: 1, skill_id: 1, proficiency: 5 },
  { user_id: 1, skill_id: 2, proficiency: 3 },
  { user_id: 1, skill_id: 3, proficiency: 4 },
  { user_id: 1, skill_id: 5, proficiency: 3 },
  { user_id: 1, skill_id: 7, proficiency: 4 },
  { user_id: 2, skill_id: 4, proficiency: 5 },
  { user_id: 2, skill_id: 9, proficiency: 4 },
  { user_id: 2, skill_id: 10, proficiency: 4 },
  { user_id: 2, skill_id: 8, proficiency: 3 },
  { user_id: 3, skill_id: 8, proficiency: 5 },
  { user_id: 3, skill_id: 6, proficiency: 4 },
  { user_id: 3, skill_id: 3, proficiency: 4 },
  { user_id: 4, skill_id: 10, proficiency: 5 },
  { user_id: 4, skill_id: 8, proficiency: 5 }
];

export const opportunities = [
  {
    opportunity_id: 101,
    title: 'Campus App Launch Squad',
    description:
      'Build and launch a student services companion app with discovery, feedback, and event features.',
    domain_id: 1,
    created_by: 3,
    deadline: '2026-06-12',
    status: 'open',
    slots: 6,
    applicants_count: 18,
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    updates: ['Design review scheduled', 'API contract drafted']
  },
  {
    opportunity_id: 102,
    title: 'Culture Fest Analytics Cell',
    description:
      'Analyze registrations, attendance, and sponsor engagement for the annual culture festival.',
    domain_id: 3,
    created_by: 3,
    deadline: '2026-06-25',
    status: 'open',
    slots: 4,
    applicants_count: 12,
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    updates: ['Dataset template approved', 'Volunteer onboarding open']
  },
  {
    opportunity_id: 103,
    title: 'Sustainability Design Sprint',
    description:
      'Prototype visual campaigns and lightweight tools for campus sustainability drives.',
    domain_id: 2,
    created_by: 3,
    deadline: '2026-05-28',
    status: 'closed',
    slots: 5,
    applicants_count: 21,
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    updates: ['Team finalized', 'Faculty review complete']
  }
];

export const opportunityRoles = [
  {
    role_id: 201,
    opportunity_id: 101,
    role_name: 'Frontend Engineer',
    description: 'Own React interfaces, responsive pages, and accessibility polish.',
    slots: 2,
    required_skills: [
      { skill_id: 1, weight: 10 },
      { skill_id: 3, weight: 6 },
      { skill_id: 7, weight: 4 }
    ]
  },
  {
    role_id: 202,
    opportunity_id: 101,
    role_name: 'Backend Integrator',
    description: 'Connect REST APIs, database models, and service integrations.',
    slots: 2,
    required_skills: [
      { skill_id: 2, weight: 9 },
      { skill_id: 5, weight: 8 },
      { skill_id: 8, weight: 3 }
    ]
  },
  {
    role_id: 203,
    opportunity_id: 102,
    role_name: 'Data Analyst',
    description: 'Prepare data models, dashboards, and weekly insight briefs.',
    slots: 3,
    required_skills: [
      { skill_id: 4, weight: 10 },
      { skill_id: 9, weight: 7 },
      { skill_id: 10, weight: 5 }
    ]
  },
  {
    role_id: 204,
    opportunity_id: 103,
    role_name: 'Campaign Designer',
    description: 'Create campaign visuals, content kits, and sprint prototypes.',
    slots: 2,
    required_skills: [
      { skill_id: 3, weight: 8 },
      { skill_id: 6, weight: 6 },
      { skill_id: 7, weight: 6 }
    ]
  }
];

export const applications = [
  { application_id: 301, user_id: 1, role_id: 201, status: 'pending', applied_at: '2026-05-01T09:12:00Z' },
  { application_id: 302, user_id: 1, role_id: 203, status: 'accepted', applied_at: '2026-04-27T10:45:00Z' },
  { application_id: 303, user_id: 2, role_id: 203, status: 'pending', applied_at: '2026-05-02T14:24:00Z' },
  { application_id: 304, user_id: 2, role_id: 202, status: 'rejected', applied_at: '2026-04-25T12:10:00Z' },
  { application_id: 305, user_id: 1, role_id: 204, status: 'accepted', applied_at: '2026-04-14T12:10:00Z' }
];

export const teams = [
  {
    team_id: 401,
    opportunity_id: 102,
    name: 'Insight Grid',
    created_at: '2026-05-03T08:30:00Z',
    progress: 62
  },
  {
    team_id: 402,
    opportunity_id: 103,
    name: 'Green Signal',
    created_at: '2026-04-20T08:30:00Z',
    progress: 88
  }
];

export const teamMembers = [
  { team_id: 401, user_id: 1, role_id: 203 },
  { team_id: 401, user_id: 2, role_id: 203 },
  { team_id: 402, user_id: 1, role_id: 204 },
  { team_id: 402, user_id: 3, role_id: 204 }
];

export const messages = [
  {
    message_id: 501,
    team_id: 401,
    sender_id: 2,
    content: 'I uploaded the first registration cleanup sheet.',
    sent_at: '2026-05-05T09:30:00Z'
  },
  {
    message_id: 502,
    team_id: 401,
    sender_id: 1,
    content: 'Great. I will turn the summary metrics into dashboard tiles tonight.',
    sent_at: '2026-05-05T10:05:00Z'
  },
  {
    message_id: 503,
    team_id: 402,
    sender_id: 3,
    content: 'Faculty review is complete. Final poster revisions are due tomorrow.',
    sent_at: '2026-05-04T17:05:00Z'
  }
];

export const notifications = [
  {
    id: 601,
    user_id: 1,
    title: 'Application shortlisted',
    body: 'Your application for Data Analyst moved to accepted.',
    type: 'selection',
    read: false,
    created_at: '2026-05-05T13:05:00Z'
  },
  {
    id: 602,
    user_id: 1,
    title: 'Team message',
    body: 'Insight Grid has two new updates.',
    type: 'team',
    read: false,
    created_at: '2026-05-05T10:10:00Z'
  },
  {
    id: 603,
    user_id: 3,
    title: 'New applicants',
    body: 'Campus App Launch Squad received 5 pending applications.',
    type: 'applicant',
    read: false,
    created_at: '2026-05-05T08:40:00Z'
  },
  {
    id: 604,
    user_id: 4,
    title: 'Opportunity approval queue',
    body: 'Two opportunities are waiting for coordinator review.',
    type: 'approval',
    read: true,
    created_at: '2026-05-04T11:00:00Z'
  }
];

export const activityLog = [
  { id: 1, actor: 'Product Club', action: 'created Campus App Launch Squad', time: 'Today, 9:00 AM' },
  { id: 2, actor: 'Aarav Sharma', action: 'applied for Frontend Engineer', time: 'Yesterday, 5:30 PM' },
  { id: 3, actor: 'Faculty Office', action: 'approved Sustainability Design Sprint', time: 'May 4, 2026' }
];

export function getUserById(userId) {
  return demoUsers.find((user) => user.user_id === Number(userId));
}

export function getSkillById(skillId) {
  return skills.find((skill) => skill.skill_id === Number(skillId));
}

export function getDomainById(domainId) {
  return domains.find((domain) => domain.domain_id === Number(domainId));
}

export function getOpportunityById(opportunityId) {
  return opportunities.find((opportunity) => opportunity.opportunity_id === Number(opportunityId));
}

export function getRoleById(roleId) {
  return opportunityRoles.find((role) => role.role_id === Number(roleId));
}

export function getUserSkills(userId) {
  return userSkills
    .filter((skill) => skill.user_id === Number(userId))
    .map((skill) => ({
      ...skill,
      skill_name: getSkillById(skill.skill_id)?.skill_name ?? 'Unknown skill'
    }));
}

export function getOpportunityRoles(opportunityId) {
  return opportunityRoles.filter((role) => role.opportunity_id === Number(opportunityId));
}

export function getApplicationsForUser(userId) {
  return applications
    .filter((application) => application.user_id === Number(userId))
    .map((application) => {
      const role = getRoleById(application.role_id);
      const opportunity = getOpportunityById(role?.opportunity_id);
      return { ...application, role, opportunity };
    });
}

export function getTeamsForUser(userId) {
  const memberships = teamMembers.filter((member) => member.user_id === Number(userId));
  return memberships.map((membership) => {
    const team = teams.find((item) => item.team_id === membership.team_id);
    const opportunity = getOpportunityById(team?.opportunity_id);
    return {
      ...team,
      opportunity,
      membership
    };
  });
}

export function getTeamDetails(teamId) {
  const team = teams.find((item) => item.team_id === Number(teamId));
  if (!team) return null;

  const opportunity = getOpportunityById(team.opportunity_id);
  const members = teamMembers
    .filter((member) => member.team_id === team.team_id)
    .map((member) => ({
      ...member,
      user: getUserById(member.user_id),
      role: getRoleById(member.role_id)
    }));

  return {
    ...team,
    opportunity,
    members,
    messages: messages.filter((message) => message.team_id === team.team_id)
  };
}

export function isTeamMember(teamId, userId) {
  return teamMembers.some((member) => member.team_id === Number(teamId) && member.user_id === Number(userId));
}

export function computeMatchScore(userSkillList, roleRequirements) {
  const totalWeight = roleRequirements.reduce((sum, requirement) => sum + requirement.weight, 0);
  let score = 0;

  for (const requirement of roleRequirements) {
    const userSkill = userSkillList.find((skill) => Number(skill.skill_id) === Number(requirement.skill_id));
    if (userSkill) {
      score += (userSkill.proficiency / 5) * requirement.weight;
    }
  }

  return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;
}

export function getMatchedSkills(userSkillList, roleRequirements) {
  return roleRequirements
    .filter((requirement) => userSkillList.some((skill) => Number(skill.skill_id) === Number(requirement.skill_id)))
    .map((requirement) => getSkillById(requirement.skill_id)?.skill_name)
    .filter(Boolean);
}

export function getRankedApplicants(roleId) {
  const role = getRoleById(roleId);
  if (!role) return [];

  return applications
    .filter((application) => application.role_id === Number(roleId) && application.status === 'pending')
    .map((application) => {
      const user = getUserById(application.user_id);
      const skillsForUser = getUserSkills(application.user_id);
      return {
        ...application,
        user,
        score: computeMatchScore(skillsForUser, role.required_skills),
        matched_skills: getMatchedSkills(skillsForUser, role.required_skills)
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value));
}

export function formatTime(value) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(value));
}
