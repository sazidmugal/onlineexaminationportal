import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

function EditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [quiz, setQuiz] = useState({
    title: '',
    category: '',
    questions: []
  });

  useEffect(() => {
    fetchQuizData();
  }, [id]);

  const fetchQuizData = async () => {
    try {
      const response = await API.get(`/api/Quizzes/${id}`); // cite: 1
      const data = response.data || {};
      
      // Ensure questions array is initialized properly
      setQuiz({
        title: data.title || '',
        category: data.category || '',
        questions: Array.isArray(data.questions) ? data.questions : []
      });
    } catch (err) {
      console.error('Error fetching quiz details:', err);
      alert('Failed to load quiz details.');
      navigate('/admin-dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (qIndex, field, value) => {
    const updatedQuestions = [...(quiz.questions || [])];
    updatedQuestions[qIndex] = {
      ...updatedQuestions[qIndex],
      [field]: value
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...(quiz.questions || []),
        {
          questionTitle: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          rightAnswer: ''
        }
      ]
    });
  };

  const removeQuestion = (qIndex) => {
    const updatedQuestions = quiz.questions.filter((_, idx) => idx !== qIndex);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.put(`/api/Quizzes/${id}`, quiz); // cite: 1
      alert('Quiz updated successfully!');
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Error updating quiz:', err);
      alert('Failed to update quiz. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading quiz details...</span>
        </div>
      </div>
    );
  }

  const questionsList = quiz.questions || [];

  return (
    <div className="container py-4" style={{ maxWidth: '850px' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-0">
            <i className="bi bi-pencil-square text-primary me-2"></i>Edit Quiz #{id}
          </h2>
          <small className="text-muted">Modify quiz information and questions below.</small>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/admin-dashboard')}>
          <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Quiz Details */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-primary text-white py-2">
            <h5 className="card-title mb-0 fs-6">Quiz Details</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Quiz Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={quiz.title}
                  onChange={handleQuizChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Category / Topic</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={quiz.category || ''}
                  onChange={handleQuizChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Questions ({questionsList.length})</h5>
          <button type="button" className="btn btn-sm btn-outline-primary" onClick={addQuestion}>
            <i className="bi bi-plus-lg me-1"></i> Add Question
          </button>
        </div>

        {/* Questions List */}
        {questionsList.map((q, qIndex) => (
          <div key={q.id || qIndex} className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-light py-2 d-flex justify-content-between align-items-center border-bottom">
              <span className="fw-bold text-secondary">Question #{qIndex + 1}</span>
              {questionsList.length > 1 && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger border-0"
                  onClick={() => removeQuestion(qIndex)}
                >
                  <i className="bi bi-trash me-1"></i> Delete
                </button>
              )}
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Question Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter question text..."
                  value={q.questionTitle || q.text || ''}
                  onChange={(e) => handleQuestionChange(qIndex, 'questionTitle', e.target.value)}
                  required
                />
              </div>

              {/* Options */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small text-muted">Option 1</label>
                  <input
                    type="text"
                    className="form-control"
                    value={q.option1 || ''}
                    onChange={(e) => handleQuestionChange(qIndex, 'option1', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Option 2</label>
                  <input
                    type="text"
                    className="form-control"
                    value={q.option2 || ''}
                    onChange={(e) => handleQuestionChange(qIndex, 'option2', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Option 3</label>
                  <input
                    type="text"
                    className="form-control"
                    value={q.option3 || ''}
                    onChange={(e) => handleQuestionChange(qIndex, 'option3', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Option 4</label>
                  <input
                    type="text"
                    className="form-control"
                    value={q.option4 || ''}
                    onChange={(e) => handleQuestionChange(qIndex, 'option4', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Right Answer */}
              <div className="mb-2">
                <label className="form-label fw-semibold text-success">Correct Answer (Exact Match)</label>
                <input
                  type="text"
                  className="form-control border-success"
                  value={q.rightAnswer || ''}
                  onChange={(e) => handleQuestionChange(qIndex, 'rightAnswer', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="d-flex gap-2 justify-content-end mb-5">
          <button type="button" className="btn btn-light border px-4" onClick={() => navigate('/admin-dashboard')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success px-4 fw-semibold" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditQuiz;