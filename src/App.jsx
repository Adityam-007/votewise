import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, CheckCircle, Fingerprint, Search, FileText, Vote, BarChart3, MessageSquare, ChevronRight } from 'lucide-react';
import './App.css';

import AIWidget from './components/AIWidget';
import RegistrationModule from './modules/RegistrationModule';
import IDRequirementsModule from './modules/IDRequirementsModule';
import ResearchModule from './modules/ResearchModule';
import BallotModule from './modules/BallotModule';
import CastingModule from './modules/CastingModule';
import CountingModule from './modules/CountingModule';
import './modules/ModuleStyles.css';

const moduleData = {
  0: { id: 0, title: 'VoteWise Home', summary: 'The general platform overview and introduction to civic education.' },
  1: { id: 1, title: 'Voter Registration', summary: 'Understanding how to register, eligibility requirements, and deadlines.' },
  2: { id: 2, title: 'ID Requirements', summary: 'Navigating state-specific identification laws for polling places.' },
  3: { id: 3, title: 'Candidate Research', summary: 'Finding reliable sources and evaluating political platforms objectively.' },
  4: { id: 4, title: 'Ballot Reading', summary: 'Deciphering complex ballot language, referendums, and instructions.' },
  5: { id: 5, title: 'Casting a Vote', summary: 'The logistics of early voting, mail-in ballots, and Election Day procedures.' },
  6: { id: 6, title: 'Counting Results', summary: 'How votes are tallied, the certification process, and the Electoral College.' },
};

const LandingPage = () => (
  <div className="animate-fade-in">
    <section className="hero">
      <div className="badge">First-time Voter Friendly</div>
      <h1>Your Journey to the <br />Polls Starts Here</h1>
      <p>VoteWise is your interactive guide to mastering the election process. 
         No jargon, just the essentials to make your voice heard.</p>
      <Link to="/module/1" className="btn btn-primary btn-lg">
        Start Election Journey <ChevronRight size={20} />
      </Link>
    </section>

    <div className="module-grid container">
      {Object.values(moduleData).filter(m => m.id > 0).map(m => (
        <Link key={m.id} to={`/module/${m.id}`} className="module-card card">
          <div className="module-number">0{m.id}</div>
          <h3>{m.title}</h3>
          <p>{m.summary}</p>
        </Link>
      ))}
    </div>
  </div>
);

const ModulePlaceholder = ({ id, title }) => (
  <div className="animate-fade-in module-container">
    <div className="module-header">
      <div className="module-tag">Module {id}</div>
      <h2>{title}</h2>
    </div>
    
    <div className="module-tabs">
      <button className="tab-btn active">Explainer</button>
      <button className="tab-btn">Simulation</button>
      <button className="tab-btn">Quiz</button>
    </div>

    <div className="module-content card">
      <p className="placeholder-text">Detailed content for {title} is being prepared. In the meantime, use the AI assistant to ask any questions about this topic!</p>
    </div>
  </div>
);

const AppLayout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Extract module ID from path
  const moduleIdMatch = currentPath.match(/\/module\/(\d+)/);
  const currentModuleId = moduleIdMatch ? parseInt(moduleIdMatch[1]) : 0;
  const currentModule = moduleData[currentModuleId];

  const modules = [
    { id: 1, title: 'Registration', icon: <CheckCircle size={18} />, path: '/module/1' },
    { id: 2, title: 'ID Requirements', icon: <Fingerprint size={18} />, path: '/module/2' },
    { id: 3, title: 'Research', icon: <Search size={18} />, path: '/module/3' },
    { id: 4, title: 'Ballots', icon: <FileText size={18} />, path: '/module/4' },
    { id: 5, title: 'Casting', icon: <Vote size={18} />, path: '/module/5' },
    { id: 6, title: 'Counting', icon: <BarChart3 size={18} />, path: '/module/6' },
  ];

  return (
    <div className="app-container">
      <nav className="top-nav glass">
        <div className="container nav-content">
          <Link to="/" className="logo">
            <Vote className="logo-icon" />
            <span>VoteWise</span>
          </Link>
          <div className="nav-modules">
            {modules.map((m) => (
              <Link 
                key={m.id} 
                to={m.path} 
                className={`nav-item ${currentPath === m.path ? 'active' : ''}`}
              >
                {m.icon}
                <span className="nav-text">{m.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="container main-content">
        {children}
      </main>

      <AIWidget currentModule={currentModule} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/module/1" element={<RegistrationModule />} />
          <Route path="/module/2" element={<IDRequirementsModule />} />
          <Route path="/module/3" element={<ResearchModule />} />
          <Route path="/module/4" element={<BallotModule />} />
          <Route path="/module/5" element={<CastingModule />} />
          <Route path="/module/6" element={<CountingModule />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
