import React from 'react'
import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import Placeholder from './pages/Placeholder';
import ProtectedRoute from './routes/ProtectedRoute';
import AuditLogs from './pages/AuditLogs';
import Complaints from './pages/Complaints';
import VisitorRequests from './pages/VisitorRequests';
import ResidentsList from './pages/Resident/ResidentsList';
import AddResident from './pages/Resident/AddResident';
import FlatsList from './pages/Flats/FlatsList';
import AddFlat from './pages/Flats/AddFlat';
import BillsList from './pages/billing/BillsList';
import GenerateBills from './pages/billing/GenerateBills';
import NoticesList from './pages/notices/NoticesList';
import AddNotice from './pages/notices/AddNotice';
import FacilitiesList from './pages/facilities/FacilitiesList';
import AddFacility from './pages/facilities/AddFacility';
import PollsList from './pages/polls/PollsList';
import CreatePoll from './pages/polls/CreatePoll';
import EmergencyList from './pages/emergency/EmergencyList';
import BroadcastEmergency from './pages/emergency/BroadcastEmergency';
import SecurityList from './pages/security/SecurityList';
import AssignTask from './pages/security/AssignTask';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Overview />} />

        {/* admin only */}
        <Route path="residents" element={<ProtectedRoute allowedRoles={['admin']}><ResidentsList /></ProtectedRoute>} />
<Route path="residents/add" element={<ProtectedRoute allowedRoles={['admin']}><AddResident /></ProtectedRoute>} />
       <Route path="flats" element={<ProtectedRoute allowedRoles={['admin']}><FlatsList /></ProtectedRoute>} />
<Route path="flats/add" element={<ProtectedRoute allowedRoles={['admin']}><AddFlat /></ProtectedRoute>} />
       <Route path="billing" element={<ProtectedRoute allowedRoles={['admin']}><BillsList /></ProtectedRoute>} />
<Route path="billing/generate" element={<ProtectedRoute allowedRoles={['admin']}><GenerateBills /></ProtectedRoute>} />
       <Route path="security" element={<ProtectedRoute allowedRoles={['admin']}><SecurityList /></ProtectedRoute>} />
<Route path="security/assign" element={<ProtectedRoute allowedRoles={['admin']}><AssignTask /></ProtectedRoute>} />
        <Route path="audit" element={<ProtectedRoute allowedRoles={['admin']}><AuditLogs /></ProtectedRoute>} />
        {/* resident only */}
        <Route path="profile" element={<ProtectedRoute allowedRoles={['resident']}><Placeholder title="My Profile" /></ProtectedRoute>} />
        <Route path="bills" element={<ProtectedRoute allowedRoles={['resident']}><Placeholder title="Maintenance Bills" /></ProtectedRoute>} />
        <Route path="visitors" element={<ProtectedRoute allowedRoles={['resident']}><Placeholder title="Visitor Passes" /></ProtectedRoute>} />

        {/* guard only */}
        <Route path="scan" element={<ProtectedRoute allowedRoles={['guard']}><Placeholder title="Scan QR Pass" /></ProtectedRoute>} />
        <Route path="gate-verify" element={<ProtectedRoute allowedRoles={['guard']}><Placeholder title="Gate Verification" /></ProtectedRoute>} />
        <Route path="visitor-entry" element={<ProtectedRoute allowedRoles={['guard']}><Placeholder title="Visitor Entry" /></ProtectedRoute>} />
        <Route path="visitor-logs" element={<ProtectedRoute allowedRoles={['guard']}><Placeholder title="Visitor Logs" /></ProtectedRoute>} />
        <Route path="alerts" element={<ProtectedRoute allowedRoles={['guard']}><Placeholder title="Security Alerts" /></ProtectedRoute>} />

        {/* shared between admin and resident */}
        <Route path="complaints" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><Complaints /></ProtectedRoute>} />
        <Route path="facilities" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><FacilitiesList /></ProtectedRoute>} />
<Route path="facilities/add" element={<ProtectedRoute allowedRoles={['admin']}><AddFacility /></ProtectedRoute>} />
        <Route path="notices" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><NoticesList /></ProtectedRoute>} />
<Route path="notices/add" element={<ProtectedRoute allowedRoles={['admin']}><AddNotice /></ProtectedRoute>} />
       <Route path="polls" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><PollsList /></ProtectedRoute>} />
<Route path="polls/create" element={<ProtectedRoute allowedRoles={['admin']}><CreatePoll /></ProtectedRoute>} />

<Route path="emergency" element={<ProtectedRoute allowedRoles={['admin', 'resident']}><EmergencyList /></ProtectedRoute>} />
<Route path="emergency/broadcast" element={<ProtectedRoute allowedRoles={['admin']}><BroadcastEmergency /></ProtectedRoute>} />
        <Route path="visitor-requests" element={<ProtectedRoute allowedRoles={['admin']}><VisitorRequests /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default App;