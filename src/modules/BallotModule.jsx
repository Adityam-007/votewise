import React, { useState } from 'react';
import { FileText, Layout, Info, Edit3 } from 'lucide-react';

const BallotModule = () => {
  const [activeTab, setActiveTab] = useState('explainer');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [answers, setAnswers] = useState({});

  const quizQuestions = [
    {
      id: 1,
      question: "What is a 'referendum' or 'ballot measure'?",
      options: ["A vote on a specific law or policy", "A type of pencil used for voting", "A list of candidates' names", "A rule about who can vote"],
      correct: 0
    },
    {
      id: 2,
      question: "What happens if you mark too many choices in a single race?",
      options: ["Your whole ballot is discarded", "That specific race is disqualified (overvote)", "The machine picks one for you", "You get a second vote later"],
      correct: 1
    },
    {
      id: 3,
      question: "What should you do if you make a mistake on your paper ballot?",
      options: ["Cross it out and keep going", "Ask for a new ballot (spoil your old one)", "Use white-out", "Tell the person next to you"],
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
        <h3>The Ballot Anatomy</h3>
        <p>A ballot can be overwhelming. It's often multiple pages long and filled with legal jargon. Understanding the layout before you enter the booth is key.</p>
      </section>

      <section>
        <h3>Key Sections</h3>
        <div className="steps-grid">
          <div className="step card">
            <Layout className="sim-icon" />
            <h4>Federal Races</h4>
            <p>President, Senate, and House of Representatives.</p>
          </div>
          <div className="step card">
            <Edit3 className="sim-icon" />
            <h4>State & Local</h4>
            <p>Governor, state legislators, judges, and school board members.</p>
          </div>
          <div className="step card">
            <Info className="sim-icon" />
            <h4>Propositions</h4>
            <p>Direct votes on laws, often called 'measures' or 'initiatives'.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSimulation = () => (
    <div className="simulation-content">
      <h3>Practice Ballot</h3>
      <p>Hover over the sections to see what they mean.</p>
      
      <div className="ballot-sim card">
        <div className="ballot-header">Official Sample Ballot</div>
        <div className="ballot-race card highlight-zone">
          <h5>City Mayor</h5>
          <div className="ballot-options">
            <div className="ballot-option"><div className="bubble"></div> <span>Candidate A</span></div>
            <div className="ballot-option"><div className="bubble"></div> <span>Candidate B</span></div>
          </div>
          <div className="ballot-info-overlay">Vote for ONE</div>
        </div>
        
        <div className="ballot-race card highlight-zone">
          <h5>Measure A</h5>
          <p className="measure-text">Should the city increase taxes by 0.5% to fund public parks?</p>
          <div className="ballot-options">
            <div className="ballot-option"><div className="bubble"></div> <span>YES</span></div>
            <div className="ballot-option"><div className="bubble"></div> <span>NO</span></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="quiz-content">
      {!quizStarted && quizScore === null && (
        <div className="quiz-intro">
          <h3>Ballot Proficiency Quiz</h3>
          <p>Test your ballot-reading skills.</p>
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
        <div className="module-tag">Module 4</div>
        <h2>Ballot Reading</h2>
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

export default BallotModule;
