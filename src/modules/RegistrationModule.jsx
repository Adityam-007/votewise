import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Calendar, UserCheck } from 'lucide-react';

const RegistrationModule = () => {
  const [activeTab, setActiveTab] = useState('explainer');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [answers, setAnswers] = useState({});

  const quizQuestions = [
    {
      id: 1,
      question: "In most states, how many days before an election is the registration deadline?",
      options: ["On the day of", "15-30 days before", "6 months before", "Only in the year you turn 18"],
      correct: 1
    },
    {
      id: 2,
      question: "Which of the following is usually a requirement to register to vote in the US?",
      options: ["A college degree", "US Citizenship", "Owning property", "A specific income level"],
      correct: 1
    },
    {
      id: 3,
      question: "Can you register to vote if you are 17 but will be 18 by Election Day?",
      options: ["No, wait until you are 18", "Yes, in many states", "Only with parent permission", "Only in presidential years"],
      correct: 1
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
        <h3>Why Register?</h3>
        <p>Registration is the first step in the voting process. It ensures you are eligible to vote and helps polling places prepare for the number of voters expected.</p>
        
        <div className="info-box glass">
          <AlertCircle className="icon" />
          <p><strong>Note:</strong> Registration requirements and deadlines vary significantly from state to state. Always check your local election office website.</p>
        </div>
      </section>

      <section>
        <h3>Eligibility Requirements</h3>
        <ul className="check-list">
          <li><CheckCircle2 size={18} /> Must be a U.S. citizen</li>
          <li><CheckCircle2 size={18} /> Must meet your state's residency requirements</li>
          <li><CheckCircle2 size={18} /> Must be 18 years old on or before Election Day</li>
        </ul>
      </section>

      <section>
        <h3>How to Register</h3>
        <div className="steps-grid">
          <div className="step card">
            <div className="step-num">1</div>
            <h4>Online</h4>
            <p>Fastest method. Available in most states using a state ID or SSN.</p>
          </div>
          <div className="step card">
            <div className="step-num">2</div>
            <h4>By Mail</h4>
            <p>Print the National Mail Voter Registration Form and send it in.</p>
          </div>
          <div className="step card">
            <div className="step-num">3</div>
            <h4>In Person</h4>
            <p>Register at the DMV, public libraries, or election offices.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSimulation = () => (
    <div className="simulation-content">
      <h3>Eligibility Decision Tree</h3>
      <p>Are you eligible to register? Follow this quick path to find out.</p>
      
      <div className="sim-box card">
        <div className="sim-step">
          <UserCheck size={32} className="sim-icon" />
          <h4>Step 1: Citizenship</h4>
          <p>Are you a U.S. citizen? (Note: Permanent residents/green card holders cannot vote in federal elections).</p>
          <div className="sim-actions">
            <button className="btn btn-primary">Yes</button>
            <button className="btn">No</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="quiz-content">
      {!quizStarted && quizScore === null && (
        <div className="quiz-intro">
          <h3>Test Your Knowledge</h3>
          <p>See how much you've learned about voter registration.</p>
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
          <h3>Results: {quizScore} / {quizQuestions.length}</h3>
          <p>{quizScore === quizQuestions.length ? "Perfect score! You're a registration pro." : "Good effort! Review the content and try again."}</p>
          <button className="btn btn-primary" onClick={() => {setQuizScore(null); setQuizStarted(false); setAnswers({});}}>Retry</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="module-container animate-fade-in">
      <div className="module-header">
        <div className="module-tag">Module 1</div>
        <h2>Voter Registration</h2>
      </div>
      
      <div className="module-tabs">
        <button 
          className={`tab-btn ${activeTab === 'explainer' ? 'active' : ''}`}
          onClick={() => setActiveTab('explainer')}
        >
          Explainer
        </button>
        <button 
          className={`tab-btn ${activeTab === 'simulation' ? 'active' : ''}`}
          onClick={() => setActiveTab('simulation')}
        >
          Simulation
        </button>
        <button 
          className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz
        </button>
      </div>

      <div className="module-content card">
        {activeTab === 'explainer' && renderExplainer()}
        {activeTab === 'simulation' && renderSimulation()}
        {activeTab === 'quiz' && renderQuiz()}
      </div>
    </div>
  );
};

export default RegistrationModule;
