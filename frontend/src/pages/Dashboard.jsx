import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axiosConfig';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({ totalAttempts: 0, totalQuizzes: 0, averageScore: 0 });
  const [quizzes, setQuizzes] = useState([]);
  const [recentAttempts, setRecentAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Step 1 Fix: Changed /api/quizzes -> /api/Quizzes to match backend controller
      const [analyticsRes, quizzesRes, attemptsRes] = await Promise.all([
        API.get('/api/attempts/analytics'),
        API.get('/api/Quizzes'),
        API.get('/api/attempts')
      ]);

      setAnalytics(analyticsRes.data || { totalAttempts: 0, totalQuizzes: 0, averageScore: 0 });
      setQuizzes(quizzesRes.data || []);
      setRecentAttempts((attemptsRes.data || []).slice(-5)); // Get latest 5 attempts
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        // Step 1 Fix: Match capitalization /api/Quizzes
        await API.delete(`/api/Quizzes/${quizId}`);
        fetchDashboardData(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting quiz:", error);
        alert("Failed to delete quiz.");
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-0">
            <i className="bi bi-speedometer2 text-primary me-2"></i>Admin Dashboard
          </h2>
          <small className="text-muted">Manage quizzes, view student submissions, and analyze system data.</small>
        </div>
        
        {/* Create New Quiz Link */}
        <Link to="/create-quiz" className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i> Create New Quiz
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-primary text-white p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-white-50 text-uppercase mb-1">Total Quizzes</h6>
                <h2 className="fw-bold mb-0">{analytics.totalQuizzes || quizzes.length}</h2>
              </div>
              <i className="bi bi-journal-text fs-1 opacity-50"></i>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-success text-white p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-white-50 text-uppercase mb-1">Total Attempts</h6>
                <h2 className="fw-bold mb-0">{analytics.totalAttempts}</h2>
              </div>
              <i className="bi bi-people-fill fs-1 opacity-50"></i>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-info text-white p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-white-50 text-uppercase mb-1">Average Score</h6>
                <h2 className="fw-bold mb-0">{analytics.averageScore}%</h2>
              </div>
              <i className="bi bi-graph-up-arrow fs-1 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quizzes Table */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3">
          <h5 className="card-title fw-bold mb-0">Active Quizzes</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <tr key={quiz.quizID || quiz.id}>
                    <td>#{quiz.quizID || quiz.id}</td>
                    <td className="fw-semibold">{quiz.title}</td>
                    <td className="text-muted">{quiz.description || 'No description provided'}</td>
                    <td className="text-center">
                      <Link 
                        to={`/edit-quiz/${quiz.quizID || quiz.id}`} 
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteQuiz(quiz.quizID || quiz.id)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No quizzes found. Click "Create New Quiz" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;