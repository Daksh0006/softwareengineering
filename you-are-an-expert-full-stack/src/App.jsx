import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { roles } from './data/mockData';
import { ApplicantManagementPage, ClubDashboard, CreateOpportunityPage, ManageOpportunitiesPage, TeamFormationPage } from './pages/ClubPages';
import { FacultyDashboardPage, MonitoringPage } from './pages/FacultyPages';
import { LandingPage, LoginPage, RegisterPage } from './pages/PublicPages';
import { NotFoundPage, SettingsPage, UnauthorizedPage } from './pages/SharedPages';
import {
  ApplicationsPage,
  DiscoverOpportunitiesPage,
  EditProfilePage,
  NotificationsPage,
  OpportunityDetailsPage,
  ProfilePage,
  SkillsDomainsPage,
  StudentDashboard,
  TeamCommunicationPage,
  TeamWorkspacePage
} from './pages/StudentPages';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={[roles.STUDENT]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={[roles.STUDENT]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute roles={[roles.STUDENT]}>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/skills"
          element={
            <ProtectedRoute roles={[roles.STUDENT]}>
              <SkillsDomainsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/opportunities"
          element={
            <ProtectedRoute roles={[roles.STUDENT, roles.FACULTY]}>
              <DiscoverOpportunitiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/opportunities/:id"
          element={
            <ProtectedRoute roles={[roles.STUDENT, roles.CLUB_EXEC, roles.FACULTY]}>
              <OpportunityDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute roles={[roles.STUDENT]}>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams/:teamId"
          element={
            <ProtectedRoute roles={[roles.STUDENT, roles.CLUB_EXEC]}>
              <TeamWorkspacePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams/:teamId/chat"
          element={
            <ProtectedRoute roles={[roles.STUDENT, roles.CLUB_EXEC]}>
              <TeamCommunicationPage />
            </ProtectedRoute>
          }
        />
        <Route path="/notifications" element={<NotificationsPage />} />

        <Route
          path="/club/dashboard"
          element={
            <ProtectedRoute roles={[roles.CLUB_EXEC]}>
              <ClubDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-opportunities"
          element={
            <ProtectedRoute roles={[roles.CLUB_EXEC]}>
              <ManageOpportunitiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/opportunities/create"
          element={
            <ProtectedRoute roles={[roles.CLUB_EXEC]}>
              <CreateOpportunityPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/opportunities/:id/applicants"
          element={
            <ProtectedRoute roles={[roles.CLUB_EXEC]}>
              <ApplicantManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams/create"
          element={
            <ProtectedRoute roles={[roles.CLUB_EXEC]}>
              <TeamFormationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/overview"
          element={
            <ProtectedRoute roles={[roles.FACULTY]}>
              <FacultyDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/monitoring"
          element={
            <ProtectedRoute roles={[roles.FACULTY]}>
              <MonitoringPage />
            </ProtectedRoute>
          }
        />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
