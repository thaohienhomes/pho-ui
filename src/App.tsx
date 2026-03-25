import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import Overview from '@/pages/Overview'
import Colors from '@/pages/Colors'
import Typography from '@/pages/Typography'
import Spacing from '@/pages/Spacing'
import Components from '@/pages/Components'
import Motion from '@/pages/Motion'
import Accessibility from '@/pages/Accessibility'
import Icons from '@/pages/Icons'
import Patterns from '@/pages/Patterns'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--bg-base)]">
        <Sidebar />
        <main className="lg:ml-[280px] min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-10 lg:px-10 lg:py-12">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/colors" element={<Colors />} />
              <Route path="/typography" element={<Typography />} />
              <Route path="/spacing" element={<Spacing />} />
              <Route path="/components" element={<Components />} />
              <Route path="/icons" element={<Icons />} />
              <Route path="/patterns" element={<Patterns />} />
              <Route path="/motion" element={<Motion />} />
              <Route path="/accessibility" element={<Accessibility />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}
