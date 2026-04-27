import React, { useState } from 'react';
import { Fingerprint, AlertTriangle, CreditCard, ShieldCheck } from 'lucide-react';

const IDRequirementsModule = () => {
  const [activeTab, setActiveTab] = useState('explainer');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [answers, setAnswers] = useState({});

  const quizQuestions = [
    {
      id: 1,
      question: "Do all states require a photo ID to vote?",
      options: ["Yes, it's a federal law", "No, requirements vary by state", "Only for first-time voters", "Only in presidential elections"],
      correct: 1
    },
    {
      id: 2,
      question: "Which of these is typically an acceptable non-photo ID in some states?",
      options: ["A library card", "A utility bill with your name and address", "A gym membership card", "A handwritten note from a neighbor"],
      correct: 1
    },
    {
      id: 3,
      question: "What is a 'provisional ballot'?",
      options: ["A ballot for people who forgot their ID", "A ballot that only counts half", "A ballot for people under 18", "A ballot used only for local elections"],
      correct: 0
    }
  ];

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    quizQuestions.forEach(q => {
      if (answers[q.id] === q.correct) score++;
    });
    setQuizScore(score);
  };

  const renderExplainer = () => (
    <div className="explainer-content">
      <section>
        <h3>The "Show of ID"</h3>
        <p>Depending on where you live, you might need to show a specific type of identification before you can cast your ballot. This is intended to verify that you are the person registered to vote.</p>
        
        <div className="info-box glass">
          <AlertTriangle className="icon" />
          <p><strong>Strict vs. Non-Strict:</strong> In 'Strict' states, you cannot vote without the required ID. In 'Non-Strict' states, you might be able to vote by signing an affidavit if you forget your ID.</p>
        </div>
      </section>

      <section>
        <h3>Commonly Accepted IDs</h3>
        <div className="id-grid">
          <div className="id-type card">
            <ShieldCheck className="id-icon" />
            <h4>Driver's License</h4>
            <p>The most widely accepted form of ID in every state.</p>
          </div>
          <div className="id-type card">
            <CreditCard className="id-icon" />
            <h4>Passport</h4>
            <p>Valid federal photo ID accepted nationwide.</p>
          </div>
          <div className="id-type card">
            <Fingerprint className="id-icon" />
            <h4>State ID</h4>
            <p>A non-driver identification card issued by your state.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSimulation = () => (
    <div className="simulation-content">
      <h3>ID Compatibility Check</h3>
      <p>Select the ID you plan to bring to see if it's typically accepted.</p>
      
      <div className="sim-box card">
        <div className="id-options-grid">
          <button className="id-option card">
            <h4>Student ID</h4>
            <span>Depends on state</span>
          </button>
          <button className="id-option card">
            <h4>Utility Bill</h4>
            <span>Non-photo states only</span>
          </button>
          <button className="id-option card primary-id">
            <h4>U.S. Passport</h4>
            <span>Accepted Everywhere</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="quiz-content">
      {!quizStarted && quizScore === null && (
        <div className="quiz-intro">
          <h3>ID Knowledge Check</h3>
          <p>Test your understanding of identification laws.</p>
          <button className="btn btn-primary" onClick={() => setQuizStarted(true)}>Start Quiz</button>
        </div>
      )}

      {quizStarted && quizScore === null && (
        <form onSubmit={handleQuizSubmit} className="quiz-form">
          {quizQuestions.map((q) => (
            <div key={q.id} className="quiz-question">
              <p><strong>{q.id}. {q.question}</strong></p>
              <div className="options">
                {q.options.map((opt, i) => (
                  <label key={i} className="option-label">
                    <input 
                      type="radio" 
                      name={`q${q.id}`} 
                      value={i} 
                      onChange={() => setAnswers({...answers, [q.id]: i})}
                      required
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary">Submit Answers</button>
        </form>
      )}

      {quizScore !== null && (
        <div className="quiz-results card">
          <h3>Score: {quizScore} / {quizQuestions.length}</h3>
          <button className="btn btn-primary" onClick={() => {setQuizScore(null); setQuizStarted(false); setAnswers({});}}>Retry</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="module-container animate-fade-in">
      <div className="module-header">
        <div className="module-tag">Module 2</div>
        <h2>ID Requirements</h2>
      </div>
      
      <div className="module-tabs">
        <button className={`tab-btn ${activeTab === 'explainer' ? 'active' : ''}`} onClick={() => setActiveTab('explainer')}>Explainer</button>
        <button className={`tab-btn ${activeTab === 'simulation' ? 'active' : ''}`} onClick={() => setActiveTab('simulation')}>Simulation</button>
        <button className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>Quiz</button>
      </div>

      <div className="module-content card">
        {activeTab === 'explainer' && renderExplainer()}
        {activeTab === 'simulation' && renderSimulation()}
        {activeTab === 'quiz' && renderQuiz()}
      </div>
    </div>
  );
};

export default IDRequirementsModule;
