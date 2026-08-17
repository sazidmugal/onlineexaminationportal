import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosConfig';

function Login() {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/api/auth/signing', {
        name: formData.name,
        password: formData.password
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.clear();
        localStorage.setItem('token', token);

        const rawRole = String(role || '').toUpperCase();
        const normalizedRole = rawRole.includes('ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER';
        
        localStorage.setItem('role', normalizedRole);

        // Explicit, immediate navigation based on determined role
        if (normalizedRole === 'ROLE_ADMIN') {
          navigate('/admin-dashboard', { replace: true });
        } else {
          navigate('/user-dashboard', { replace: true });
        }
      } else {
        setError('No authentication token received from server.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '420px', width: '100%', backgroundColor: '#1e293b' }}>
        <div className="card-body text-white">
          <div className="text-center mb-4">
            <i className="bi bi-shield-lock-fill text-info fs-1"></i>
            <h3 className="fw-bold mt-2 mb-1">System Login</h3>
            <p className="text-muted small">Enter your credentials to access the portal</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small text-center rounded-3" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-muted small mb-1">Username</label>
              <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-secondary">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Enter username"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-muted small mb-1">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-secondary">
                  <i className="bi bi-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Enter password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-info text-dark fw-bold w-100 py-2 rounded-3 shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Authenticating...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="text-center mt-4 small text-muted">
            Don't have an account? <br />
            <Link to="/signup-user" className="text-info text-decoration-none me-2">
              Register as Student
            </Link>
            <span className="text-secondary">|</span>
            <Link to="/signup-admin" className="text-info text-decoration-none ms-2">
              Register as Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;