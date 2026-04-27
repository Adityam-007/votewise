import React, { useState } from 'react';
import { BarChart3, PieChart, Clock, CheckCircle } from 'lucide-react';

const CountingModule = () => {
  const [activeTab, setActiveTab] = useState('explainer');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [answers, setAnswers] = useState({});

  const quizQuestions = [
    {
      id: 1,
      question: "Are election results final on election night?",
      options: ["Yes, once the TV says so", "No, results are preliminary until certified", "Only if the winner has a big lead", "Only for local races"],
      correct: 1
    },
    {
      id: 2,
      question: "In the Electoral College, how many total votes are there?",
      options: ["100", "435", "538", "1,000"],
      correct: 2
    },
    {
      id: 3,
      question: "What is a 'recount'?",
      options: ["Voting again because you didn't like the result", "A second, formal count of the ballots to ensure accuracy", "Asking everyone who they voted for", "Counting only the mail-in ballots"],
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
        <h3>After the Polls Close</h3>
        <p>The work doesn't stop when the sun goes down on Election Day. Local election officials begin the meticulous process of tallying every valid vote cast.</p>
      </section>

      <section>
        <h3>The Certification Timeline</h3>
        <div className="steps-grid">
          <div className="step card">
            <Clock className="sim-icon" />
            <h4>Unofficial Results</h4>
            <p>Reported on election night as precincts finish counting. These are preliminary.</p>
          </div>
          <div className="step card">
            <PieChart className="sim-icon" />
            <h4>Canvassing</h4>
            <p>The process of verifying every ballot and ensuring the count is accurate.</p>
          </div>
          <div className="step card">
            <CheckCircle className="sim-icon" />
            <h4>Certification</h4>
            <p>The final, official declaration of the winner by state authorities.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSimulation = () => (
    <div className="simulation-content">
      <h3>Electoral College vs Popular Vote</h3>
      <p>A simple visualization of how a candidate can win the popular vote but lose the Electoral College.</p>
      
      <div className="results-sim card">
        <div className="sim-group">
          <h5>Candidate A</h5>
          <div className="sim-bar-wrapper">
            <div className="sim-bar popular" style={{width: '51%'}}></div>
            <span className="label">Popular: 51%</span>
          </div>
          <div className="sim-bar-wrapper">
            <div className="sim-bar electoral" style={{width: '45%'}}></div>
            <span className="label">Electoral: 232</span>
          </div>
        </div>
        <div className="sim-group">
          <h5>Candidate B</h5>
          <div className="sim-bar-wrapper">
            <div className="sim-bar popular secondary" style={{width: '49%'}}></div>
            <span className="label">Popular: 49%</span>
          </div>
          <div className="sim-bar-wrapper">
            <div className="sim-bar electoral secondary" style={{width: '55%'}}></div>
            <span className="label">Electoral: 306</span>
          </div>
        </div>
        <div className="sim-result">
          <strong>Candidate B Wins!</strong>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="quiz-content">
      {!quizStarted && quizScore === null && (
        <div className="quiz-intro">
          <h3>Results Proficiency Quiz</h3>
          <p>Do you understand how the final count works?</p>
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
        <div className="module-tag">Module 6</div>
        <h2>Counting the Results</h2>
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

export default CountingModule;
