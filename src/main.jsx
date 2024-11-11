import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SideBar from './shared/SideBar/SideBar'



createRoot(document.getElementById('root')).render(
  <StrictMode>

      <SideBar />


  </StrictMode>,
)
