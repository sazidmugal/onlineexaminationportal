import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosConfig';

function SignUpAdmin() {
  const [formData, setFormData] = useState({ name: '', password: '', roles: 'ROLE_ADMIN' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await API.post('/api/auth/addNewUser', formData);
      setSuccess('Administrator account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('Registration error:', err);
      setError('Admin registration failed.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Registration</h2>
        <p style={styles.subtitle}>Create an administrative account</p>

        {error && <div style={styles.errorAlert}>{error}</div>}
        {success && <div style={styles.successAlert}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>Admin Username</label>
            <input
              type="text"
              required
              style={styles.input}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              required
              style={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" style={styles.primaryBtn}>Register as Admin</button>
        </form>

        <p style={styles.footerText}>
          Already registered? <Link to="/login" style={{ color: '#38bdf8' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff' },
  card: { width: '100%', maxWidth: '400px', padding: '32px', backgroundColor: '#1e293b', borderRadius: '10px', border: '1px solid #38bdf840' },
  title: { margin: 0, fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: '#38bdf8' },
  subtitle: { color: '#94a3b8', fontSize: '13px', textAlign: 'center', marginBottom: '24px' },
  errorAlert: { backgroundColor: '#450a0a', color: '#fca5a5', padding: '10px', borderRadius: '6px', marginBottom: '16px' },
  successAlert: { backgroundColor: '#064e3b', color: '#6ee7b7', padding: '10px', borderRadius: '6px', marginBottom: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  label: { display: 'block', marginBottom: '6px', fontSize: '13px', color: '#94a3b8' },
  input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' },
  primaryBtn: { padding: '12px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  footerText: { marginTop: '20px', fontSize: '13px', textAlign: 'center' }
};

export default SignUpAdmin;