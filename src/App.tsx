import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import MainLayout from '@/components/layout/MainLayout'
import LandingPage from '@/pages/LandingPage'
import Dashboard from '@/pages/Dashboard'
import AnalysisPage from '@/pages/AnalysisPage'

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis/:owner/:repo" element={<AnalysisPage />} />
        </Routes>
      </MainLayout>
      <Toaster />
    </Router>
  )
}
