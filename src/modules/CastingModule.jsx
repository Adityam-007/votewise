import React, { useState } from 'react';
import { Vote, Mail, Calendar, MapPin } from 'lucide-react';

const CastingModule = () => {
  const [activeTab, setActiveTab] = useState('explainer');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [answers, setAnswers] = useState({});

  const quizQuestions = [
    {
      id: 1,
      question: "Which of these is NOT a typical way to cast a vote in the US?",
      options: ["Early voting in person", "Mail-in/Absentee ballot", "Voting on Election Day", "Voting via text message"],
      correct: 3
    },
    {
      id: 2,
      question: "If you are in line at your polling place when it closes, what should you do?",
      options: ["Go home and try again tomorrow", "Stay in line—you are legally allowed to vote", "Ask for a mail-in ballot", "Call the police"],
      correct: 1
    },
    {
      id: 3,
      question: "What is an 'absentee ballot'?",
      options: ["A ballot for people who are out of town or cannot make it to the polls", "A ballot for people who don't want to vote", "A ballot that is only counted if the election is close", "A ballot for people who have already voted"],
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
        <h3>Getting Your Vote Counted</h3>
        <p>You've registered, researched, and read your ballot. Now it's time for the most important part: actually casting your vote. There are several ways to do this, depending on your state.</p>
      </section>

      <section>
        <h3>Ways to Vote</h3>
        <div className="steps-grid">
          <div className="step card">
            <Calendar className="sim-icon" />
            <h4>Early In-Person</h4>
            <p>Vote before Election Day at designated locations.</p>
          </div>
          <div className="step card">
            <Mail className="sim-icon" />
            <h4>By Mail</h4>
            <p>Request a ballot, fill it out, and mail it back or drop it in a secure box.</p>
          </div>
          <div className="step card">
            <MapPin className="sim-icon" />
            <h4>Election Day</h4>
            <p>The traditional way: go to your local polling place on the Tuesday after the first Monday in November.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSimulation = () => (
    <div className="simulation-content">
      <h3>The Polling Place Experience</h3>
      <p>A step-by-step walkthrough of what happens when you arrive at the polls.</p>
      
      <div className="polling-sim card">
        <div className="sim-steps">
          <div className="sim-step-item">
            <div className="sim-step-badge">1</div>
            <div className="sim-step-text">
              <h5>Check-In</h5>
              <p>State your name and address to the poll worker. They will check the register.</p>
            </div>
          </div>
          <div className="sim-step-item">
            <div className="sim-step-badge">2</div>
            <div className="sim-step-text">
              <h5>Receive Ballot</h5>
              <p>You'll be given a paper ballot or access to a voting machine.</p>
            </div>
          </div>
          <div className="sim-step-item">
            <div className="sim-step-badge">3</div>
            <div className="sim-step-text">
              <h5>Cast Vote</h5>
              <p>Fill out the ballot in private and feed it into the scanner.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="quiz-content">
      {!quizStarted && quizScore === null && (
        <div className="quiz-intro">
          <h3>Casting Proficiency Quiz</h3>
          <p>Ready to hit the polls?</p>
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
        <div className="module-tag">Module 5</div>
        <h2>Casting a Vote</h2>
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

export default CastingModule;
