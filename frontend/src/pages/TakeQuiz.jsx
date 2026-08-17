import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  const fetchQuestions = async () => {
    try {
      // Fetch quiz details directly using URL parameter `id`
      const response = await API.get(`/api/Quizzes/${id}`);
      
      // Extract embedded questions array
      setQuestions(response.data.questions || []);
      setLoading(false);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('Failed to load exam questions. Please check server logs.');
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((q) => {
      const selectedOptionId = answers[q.id];
      const correctOption = q.options?.find((opt) => opt.isCorrect || opt.correct);
      if (correctOption && correctOption.id === selectedOptionId) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading exam questions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-danger shadow-sm text-center p-4">
              <div className="card-body">
                <i className="bi bi-exclamation-triangle-fill text-danger display-4 d-block mb-3"></i>
                <h4 className="card-title text-danger mb-3">{error}</h4>
                <button 
                  onClick={() => navigate('/user-dashboard')} 
                  className="btn btn-primary"
                >
                  <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    const percentage = Math.round((score / (questions.length || 1)) * 100);

    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm text-center p-4">
              <div className="card-body">
                <i className="bi bi-check-circle-fill text-success display-3 d-block mb-3"></i>
                <h2 className="fw-bold text-dark mb-2">Exam Completed! 🎉</h2>
                <p className="text-muted mb-4">Your responses have been evaluated successfully.</p>
                
                <div className="bg-light rounded p-3 mb-4">
                  <h5 className="text-muted mb-1">Your Score</h5>
                  <h1 className="fw-bold text-primary mb-0">
                    {score} <span className="fs-4 text-muted">/ {questions.length}</span>
                  </h1>
                  <span className="badge bg-info-subtle text-info border border-info-subtle mt-2 fs-6">
                    {percentage}% Accuracy
                  </span>
                </div>

                <button 
                  onClick={() => navigate('/user-dashboard')} 
                  className="btn btn-primary px-4 fw-semibold"
                >
                  <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-0">
            <i className="bi bi-file-earmark-text-fill text-primary me-2"></i>Online Examination
          </h2>
          <small className="text-muted">Select one correct answer for each question below.</small>
        </div>
        <span className="badge bg-primary fs-6">
          Total Questions: {questions.length}
        </span>
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="card border-0 shadow-sm text-center py-5 mb-4">
          <div className="card-body">
            <i className="bi bi-journal-x text-muted display-4 d-block mb-3"></i>
            <p className="text-muted mb-0">No questions found for this exam.</p>
          </div>
        </div>
      ) : (
        questions.map((q, idx) => (
          <div key={q.id || idx} className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3 border-bottom">
              <h5 className="fw-bold text-dark mb-0">
                Q{idx + 1}. {q.text || q.questionText}
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex flex-column gap-2">
                {q.options?.map((opt) => {
                  const isSelected = answers[q.id] === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`form-check p-3 rounded border cursor-pointer transition ${
                        isSelected 
                          ? 'border-primary bg-primary-subtle text-primary fw-medium' 
                          : 'border-light-subtle bg-light text-dark'
                      }`}
                      style={{ cursor: 'pointer' }}
                    >
                      <input
                        className="form-check-input me-2"
                        type="radio"
                        name={`q_${q.id}`}
                        checked={isSelected}
                        onChange={() => handleOptionSelect(q.id, opt.id)}
                      />
                      <span className="form-check-label">
                        {opt.text || opt.optionText}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Submit Action */}
      {questions.length > 0 && (
        <div className="mb-5">
          <button 
            onClick={handleSubmit} 
            className="btn btn-success btn-lg w-100 fw-bold shadow-sm"
          >
            <i className="bi bi-send-check-fill me-2"></i> Submit Examination
          </button>
        </div>
      )}
    </div>
  );
}

export default TakeQuiz;