import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUpUser from './pages/SignUpUser';
import SignUpAdmin from './pages/SignUpAdmin';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import TakeQuiz from './pages/TakeQuiz';
import CreateQuiz from './pages/CreateQuiz';
import EditQuiz from './pages/EditQuiz';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* User & Admin Sign-up Routes */}
        <Route path="/signup-user" element={<SignUpUser />} />
        <Route path="/signup-admin" element={<SignUpAdmin />} />

        {/* --- PROTECTED ADMIN ROUTES --- */}
        <Route element={<ProtectedRoute allowedRole="ROLE_ADMIN" />}>
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/edit-quiz/:id" element={<EditQuiz />} />
        </Route>

        {/* --- PROTECTED STUDENT ROUTES --- */}
        <Route element={<ProtectedRoute allowedRole="ROLE_USER" />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/take-quiz/:id" element={<TakeQuiz />} />
        </Route>

        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;