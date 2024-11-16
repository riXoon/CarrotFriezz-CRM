import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Add BrowserRouter import
import './index.css';
import SideBar from './shared/SideBar/SideBar';
import LoginSignup from './components/Login/Signup/LoginSignup';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap your Routes with BrowserRouter */}
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/main" element={<SideBar />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
