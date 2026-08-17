import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await API.get('/Quizzes');
      setQuizzes(response.data);
    } catch (err) {
      console.error('Failed to fetch quizzes', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '40px' }}>Loading...</div>;

  return (
    <div style={{ padding: '30px', color: '#fff', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Available Quizzes</h2>
        <div>
          <button onClick={() => navigate('/create-quiz')} style={btnSuccess}>+ Create Quiz</button>
          <button onClick={handleLogout} style={btnDanger}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {quizzes.map((quiz, index) => {
          const qId = quiz.id ?? quiz.quizId ?? (index + 1);
          const title = quiz.title ?? quiz.quizTitle ?? 'Untitled Quiz';
          const desc = quiz.description ?? quiz.category ?? 'No description provided.';

          return (
            <div key={qId} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
              <h3 style={{ color: '#38bdf8' }}>{title}</h3>
              <p style={{ color: '#94a3b8' }}>{desc}</p>
              <button onClick={() => navigate(`/take-quiz/${qId}`)} style={btnPrimary}>Attempt Quiz</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const btnPrimary = { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };
const btnSuccess = { backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' };
const btnDanger = { backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer' };

export default QuizList;