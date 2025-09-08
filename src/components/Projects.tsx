import React from 'react';
import { Github } from 'lucide-react';
import './Projects.css';

const Projects: React.FC = () => {
  return (
    <div className="projects-container">
      <header className="projects-header">
        <h1>Projects</h1>
        <p className="intro">
          Side projects and weekend experiments where I get to play with new tech and solve problems I find interesting. Here's what I've been tinkering with lately.
        </p>
      </header>

      <div className="projects-grid">
        <div className="project-card">
          <h3>FPL Captain Picker Agent</h3>
          <p className="project-description">
          Every FPL player knows the weekly captain dilemma. I built this tool to combine stats with AI to help pick captains that actually deliver points. It's saved me from some terrible choices this season (and confirmed a few good ones).
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