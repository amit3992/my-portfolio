import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import './Projects.css';

const Projects: React.FC = () => {
  return (
    <div className="projects-container">
      <header className="projects-header">
        <h1>Projects</h1>
        <p className="intro">
          A collection of personal projects and experiments that I've built to learn new technologies and solve interesting problems.
        </p>
      </header>

      <div className="projects-grid">
        <div className="project-card">
          <h3>FPL Captain Picker Agent</h3>
          <p className="project-description">
          A Fantasy Premier League (FPL) tool that helps you choose the best captain for your team each gameweek. The tool uses both statistical analysis and AI-powered recommendations to suggest the optimal captain choice.
          </p>
          <div className="project-tech">
            <span>Ollama</span>
            <span>OpenAI API</span>
            <span>Python</span>
            <span>Deployed on Railway</span>
          </div>
          <div className="project-links">
            <a href="https://github.com/amit3992/fpl_captain_agent" target="_blank" rel="noopener noreferrer" className="project-link">
              <Github className="icon" /> Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects; 