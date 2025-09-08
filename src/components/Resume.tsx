import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Resume.css';

const Resume: React.FC = () => {
  return (
    <div className="resume-container">
      <header className="resume-header">
        <h1>Hey, I'm Amit</h1>
        <p className="intro">
        I've spent the last 9+ years at Intuit building backend systems that scale and recently, bringing AI into products people actually use. Here's what I've been up to.
        </p>
        <div className="mt-4">
                <a href="https://docs.google.com/document/d/1T9G5AsyDaZsPm8cY-LUAbvykWliwLUfOkj0g0SppuTs/edit?tab=t.0" target='_blank' className="text-gray-500 hover:text-gray-900">
                  Download Resume
                </a>
              </div>
      </header>
     

      <div className="resume-main-content">
        <div className="resume-left-column">
          <section className="resume-section">
            <h2>Experience</h2>
            <div className="role">
              <h3>Staff Software Engineer @ Intuit</h3>
              <p className="subtitle">Emerging Products Group · 2022-Present</p>
              <ul>
              <li>Led the backend team that brought Credit Karma's Lightbox into QuickBooks, which bumped financing sales by 15%</li>
      <li>Created registration APIs that actually feel seamless to users, cutting signup friction and lifting new user numbers by 5%</li>
      <li>Built an AI assistant that talks to merchants about financing options, boosting conversion rates by 20%</li>
      <li>Currently working on opening up our "Financing as a Service" platform to third-party vendors</li>
              </ul>
            </div>
            <div className="role">
              <h3>Senior Software Engineer @ Intuit</h3>
              <p className="subtitle">QuickBooks App Store · 2019-2022</p>
              <ul>
              <li>Built and launched a global App Marketplace that lets developers reach users in their own language</li>
      <li>Created a recommendation engine that actually suggests apps people want, boosting connections and retention by 15%</li>
      <li>Led the team that rebuilt our update system to be event-driven, cutting sync delays from hours to minutes</li>
      <li>Kept our systems running smoothly through tax season madness with 99.9% uptime</li>
              </ul>
            </div>
            <div className="role">
              <h3>Software Engineer @ Ericsson</h3>
              <p className="subtitle">Chargind Node Automation · 2016-2018</p>
              <ul>
              <li>Built a Spring Boot tool that turned mind-numbing Excel order processing into an automated system, cutting work from a week to just 5 hours</li>
    <li>Automated our entire catalog configuration process, speeding up delivery by 40% and helping us ship customer projects way faster</li>
              </ul>
            </div>
          </section>

          <section className="resume-section">
            <h2>Technical Impact</h2>
            <div className="impact-grid">
            <div className="impact-card">
      <h3>Financing as a Service</h3>
      <ul>
      <li>Joined as engineer #5 on the team — we took an idea on a whiteboard to production in just 3 months</li>
        <li>Built an AI assistant that helped boost merchant sales by 20%</li>
        <li>Made the registration flow so smooth that Credit Karma signups jumped 5%</li>
        <li>Cut response times by 40% while keeping the system rock-solid (99.99% uptime) even during traffic spikes</li>
      </ul>
    </div>


    <div className="impact-card">
      <h3>Global Quickbooks App Marketplace</h3>
      <ul>
        <li>Helped grow app integrations by 10% after launching our unified marketplace</li>
        <li>Rebuilt our sync system to be event-driven, cutting delays from hours to real-time</li>
        <li>Made the marketplace work in 11+ languages across different regions</li>
      </ul>
    </div>
    <div className="impact-card">
      <h3>Engineering Interview Revamp</h3>
      <ul>
        <li>Revamped how we interview engineers to focus on practical skills instead of whiteboard puzzles</li>
        <li>Created interview projects using LLMs that actually test what engineers do day-to-day</li>
        <li>Put our interview exercises on GitHub so candidates know what to expect</li>
        <li>Made the whole process better for both candidates and interviewers</li>
      </ul>
    </div>
            </div>
          </section>
        </div>

        <div className="resume-right-column">
          <section className="resume-section skills-section">
            <h2>Technical Skills</h2>
            <div className="skills-container">
              <div className="skill-row">
                <span>Languages I use daily:</span>
                <span>Java, Python, Kotlin, TypeScript, SQL</span>
              </div>
              <div className="skill-row">
                <span>AI stuff I work with:</span>
                <span>Building RAG systems, integrating LLMs (OpenAI, Ollama), LangChain, crafting prompts that actually work</span>
              </div>
              <div className="skill-row">
                <span>Tech stack:</span>
                <span>Spring Boot, AWS, Kubernetes, React, Kafka</span>
              </div>
              <div className="skill-row">
                <span>How I build products:</span>
                <span>Quick prototypes, lean MVPs, putting users first, and testing assumptions until we find what works</span>
              </div>
            </div>
          </section>

          <section className="resume-section find-me">
            <h2>Contact</h2>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/amit3992/" className="social-link">
                <Linkedin className="icon" /> LinkedIn
              </a>
              <a href="https://github.com/amit3992" className="social-link">
                <Github className="icon" /> GitHub
              </a>
              <a href="mailto:amit3992@gmail.com" className="social-link">
                <Mail className="icon" /> amit3992@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume;
