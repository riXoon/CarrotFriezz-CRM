import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import SideBar from './shared/SideBar/SideBar';
import LoginSignup from './components/Admin/Registration/LoginSignup';
import CustomerPage from './components/Customer/Customer/CustomerPage';
import ViewReviews from './components/Customer/Customer/ViewReviews';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap your Routes with BrowserRouter */}
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/AdminDashboard" element={<SideBar />} />
        <Route path="/Customer" element={<CustomerPage />} />
        <Route path="/Customer/view-reviews" element={<ViewReviews />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
