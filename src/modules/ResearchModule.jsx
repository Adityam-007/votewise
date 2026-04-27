import React, { useState } from 'react';
import { Search, Globe, Filter, Star } from 'lucide-react';

const ResearchModule = () => {
  const [activeTab, setActiveTab] = useState('explainer');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [answers, setAnswers] = useState({});

  const quizQuestions = [
    {
      id: 1,
      question: "Which of these is generally considered a more reliable source for non-partisan candidate info?",
      options: ["A candidate's own TV ad", "A local non-partisan voter guide", "A social media post with 1M likes", "An email from a political party"],
      correct: 1
    },
    {
      id: 2,
      question: "What does 'non-partisan' mean in the context of voter education?",
      options: ["It supports both parties equally", "It does not support or oppose any candidate or party", "It is only for people who aren't registered", "It is paid for by the government"],
      correct: 1
    },
    {
      id: 3,
      question: "Why is it important to check a candidate's previous voting record or professional history?",
      options: ["To see if they are popular", "To see if their past actions align with their current promises", "To find out where they went to school", "To see how much money they have"],
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
        <h3>Finding the Facts</h3>
        <p>In the age of information, the challenge isn't finding info—it's finding *reliable* info. Candidate research is about looking beyond the commercials to see what a candidate actually stands for.</p>
      </section>

      <section>
        <h3>Where to Look</h3>
        <div className="steps-grid">
          <div className="step card">
            <Globe className="sim-icon" />
            <h4>Voter Guides</h4>
            <p>Look for non-partisan guides from organizations like the League of Women Voters (Vote411.org).</p>
          </div>
          <div className="step card">
            <Filter className="sim-icon" />
            <h4>Endorsements</h4>
            <p>See which organizations (unions, chambers of commerce, advocacy groups) support the candidate.</p>
          </div>
          <div className="step card">
            <Search className="sim-icon" />
            <h4>Official Sites</h4>
            <p>Read their platform directly on their website, but be aware of the bias.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSimulation = () => (
    <div className="simulation-content">
      <h3>Candidate Profile Evaluator</h3>
      <p>Click on different parts of this mock candidate profile to see why they are important to research.</p>
      
      <div className="profile-sim card">
        <div className="profile-header">
          <div className="profile-avatar">JD</div>
          <div className="profile-meta">
            <h4>Jane Doe</h4>
            <p>Running for State Senate</p>
          </div>
        </div>
        <div className="profile-sections">
          <div className="profile-item card clickable">
            <Star size={16} />
            <span>Top Priority: Education Funding</span>
          </div>
          <div className="profile-item card clickable">
            <Globe size={16} />
            <span>Endorsed by: Teacher's Union</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="quiz-content">
      {!quizStarted && quizScore === null && (
        <div className="quiz-intro">
          <h3>Research Pro Quiz</h3>
          <p>Are you ready to evaluate candidates fairly?</p>
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
        <div className="module-tag">Module 3</div>
        <h2>Candidate Research</h2>
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

export default ResearchModule;
