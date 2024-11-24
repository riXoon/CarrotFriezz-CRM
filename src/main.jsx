import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import SideBar from './shared/SideBar/SideBar';
import LoginSignup from './components/Admin/Registration/LoginSignup';
import CustomerPage from './components/Customer/Customer/CustomerPage';
import ViewReviews from './components/Customer/Customer/ViewReviews';
import NotificationPage from './components/Customer/Notification/NotificationPage';
import NotificationDetail from './components/Customer/Notification/NotificationDetail';
import EditProfile from './components/Customer/EditProfile/EditProfile';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/AdminDashboard" element={<SideBar />} />
        <Route path="/Customer" element={<CustomerPage />} />
        <Route path="/Customer/view-reviews" element={<ViewReviews />} />
        <Route path="/Customer/notifications" element={<NotificationPage />} />
        <Route path="/Customer/notification-detail" element={<NotificationDetail />} />
        <Route path="/Customer/edit-profile" element={<EditProfile />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
