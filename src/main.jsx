import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import DashboardPage from './components/Dashboard/DashboardPage.jsx'
import SideBar from './components/SideBar/SideBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

      <SideBar/>

  </StrictMode>,
)
