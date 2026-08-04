import { Routes, Route } from 'react-router-dom'
import LandingLayout from '@/layouts/LandingLayout'
import WorkspaceLayout from '@/layouts/WorkspaceLayout'
import LandingPage from '@/pages/LandingPage'
import WorkspacePage from '@/features/workspace/pages/WorkspacePage'
import ComposePage from '@/features/compose/pages/ComposePage'
import DraftsPage from '@/features/drafts/pages/DraftsPage'
import CollectionsPage from '@/features/collections/pages/CollectionsPage'
import InsightsPage from '@/features/insights/pages/InsightsPage'
import SettingsPage from '@/features/settings/pages/SettingsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/app" element={<WorkspaceLayout />}>
        <Route index element={<WorkspacePage />} />
        <Route path="compose" element={<ComposePage />} />
        <Route path="drafts" element={<DraftsPage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
