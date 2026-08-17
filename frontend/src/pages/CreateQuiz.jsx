import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([
    { questionTitle: '', option1: '', option2: '', option3: '', option4: '', rightAnswer: '' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestionField = () => {
    setQuestions([
      ...questions,
      { questionTitle: '', option1: '', option2: '', option3: '', option4: '', rightAnswer: '' }
    ]);
  };

  const removeQuestionField = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, idx) => idx !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { title, category, questions };
      // FIX: Changed from '/Quizzes/create' to '/api/Quizzes' to match @PostMapping on /api/Quizzes
      await API.post('/api/Quizzes', payload);
      alert('Quiz created successfully!');
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Error creating quiz:', err);
      alert('Failed to create quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '850px' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold text-dark mb-0">
            <i className="bi bi-file-earmark-plus text-primary me-2"></i>Create New Quiz
          </h2>
          <small className="text-muted">Fill out the quiz details and questions below.</small>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/admin-dashboard')}>
          <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Meta Info Card */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-primary text-white py-2">
            <h5 className="card-title mb-0 fs-6">
              <i className="bi bi-info-circle me-2"></i>Quiz Information
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Quiz Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Java Fundamentals Assessment"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Category / Topic</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Core Java"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <h5 className="fw-bold text-dark mb-3">
          <i className="bi bi-question-circle text-primary me-2"></i>Questions
        </h5>

        {questions.map((q, idx) => (
          <div key={idx} className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-light d-flex justify-content-between align-items-center py-2">
              <span className="fw-bold text-secondary">Question #{idx + 1}</span>
              {questions.length > 1 && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger border-0"
                  onClick={() => removeQuestionField(idx)}
                >
                  <i className="bi bi-trash me-1"></i>Remove
                </button>
              )}
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Question Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the question text..."
                  value={q.questionTitle}
                  onChange={(e) => handleQuestionChange(idx, 'questionTitle', e.target.value)}
                  required
                />
              </div>

              {/* Options Inputs */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small text-muted">Option 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Option 1"
                    value={q.option1}
                    onChange={(e) => handleQuestionChange(idx, 'option1', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Option 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Option 2"
                    value={q.option2}
                    onChange={(e) => handleQuestionChange(idx, 'option2', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Option 3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Option 3"
                    value={q.option3}
                    onChange={(e) => handleQuestionChange(idx, 'option3', e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small text-muted">Option 4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Option 4"
                    value={q.option4}
                    onChange={(e) => handleQuestionChange(idx, 'option4', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Correct Answer */}
              <div className="mb-2">
                <label className="form-label fw-semibold text-success">Correct Answer (Exact Match)</label>
                <input
                  type="text"
                  className="form-control border-success"
                  placeholder="Enter the exact text matching the correct option"
                  value={q.rightAnswer}
                  onChange={(e) => handleQuestionChange(idx, 'rightAnswer', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <button type="button" className="btn btn-outline-primary" onClick={addQuestionField}>
            <i className="bi bi-plus-lg me-1"></i> Add Another Question
          </button>
          <button type="submit" className="btn btn-success px-4" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Saving...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-1"></i> Save Quiz
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;