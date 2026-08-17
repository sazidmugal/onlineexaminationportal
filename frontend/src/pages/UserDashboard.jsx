import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

function UserDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableQuizzes();
  }, []);

  const fetchAvailableQuizzes = async () => {
    try {
      // Calls GET /api/Quizzes
      const response = await API.get('/api/Quizzes');
      setQuizzes(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load exams:', err);
      setError('Failed to fetch available exams. Please check your connection.');
      setLoading(false);
    }
  };

  const handleStartExam = async (quiz) => {
    // Check quizID (uppercase ID) coming from Spring Boot entity/DTO
    const targetId = quiz?.quizID || quiz?.quizId || quiz?.id || quiz?.quiz_id;

    if (!targetId) {
      console.error("Quiz ID missing from object:", quiz);
      return;
    }

    try {
      // Sends JSON { "quizID": targetId } matching userAttemptDto.getQuizID()
      const response = await API.post('/api/UserAttempt', { quizID: targetId });
      const attemptId = response.data?.id || response.data?.userAttemptId || response.data;

      navigate(`/take-quiz/${targetId}`, { state: { attemptId } });
    } catch (err) {
      console.warn('Attempt creation failed, navigating directly:', err);
      navigate(`/take-quiz/${targetId}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
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
      {/* Header Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-0">
            <i className="bi bi-mortarboard-fill text-primary me-2"></i>Student Portal
          </h2>
          <small className="text-muted">Select an assessment to begin your examination</small>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          <i className="bi bi-box-arrow-right me-1"></i> Logout
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
          <div>{error}</div>
        </div>
      )}

      {/* Main Content */}
      {quizzes.length === 0 ? (
        <div className="card border-0 shadow-sm text-center py-5">
          <div className="card-body">
            <i className="bi bi-journal-x text-muted display-4 d-block mb-3"></i>
            <h4 className="fw-bold text-dark">No Examinations Available</h4>
            <p className="text-muted mb-0">
              There are currently no active quizzes assigned to your portal.
            </p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {quizzes.map((quiz, idx) => (
            <div 
              key={quiz.quizID || quiz.quizId || quiz.id || idx} 
              className="col-md-6 col-lg-4"
            >
              <div className="card h-100 border-0 shadow-sm d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-success-subtle text-success border border-success-subtle">
                      Active
                    </span>
                  </div>
                  
                  <h5 className="card-title fw-bold text-dark mb-2">
                    {quiz.title}
                  </h5>
                  
                  <p className="card-text text-muted flex-grow-1 small">
                    {quiz.description || 'Standard assessment module evaluating core competencies.'}
                  </p>

                  <div className="pt-3 border-top mt-3">
                    <button
                      onClick={() => handleStartExam(quiz)}
                      className="btn btn-success w-100 fw-semibold"
                    >
                      Start Exam <i className="bi bi-rocket-takeoff ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;