import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Resume.css';

const Resume: React.FC = () => {
  return (
    <div className="resume-container">
      <header className="resume-header">
        <h1>Hey, I'm Amit</h1>
        <p className="intro">
        Staff Software Engineer at Intuit with 9+ years of experience in building scalable backend systems and integrating AI into real-world products.
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
              <li>Led backend development for Credit Karma’s Lightbox integration in QuickBooks, driving a 15% increase in financing sales</li>
      <li>Designed seamless registration APIs with CK User Management, reducing signup friction and boosting new user registrations by 5%</li>
      <li>Built a Financing AI Agent using RAG and LLMs to automate merchant outreach, resulting in a 20% uplift in estimate conversions</li>
      <li>Driving the externalization of "Financing as a Service" to third-party Independent Service Vendors.</li>
              </ul>
            </div>
            <div className="role">
              <h3>Senior Software Engineer @ Intuit</h3>
              <p className="subtitle">QuickBooks App Store · 2019-2022</p>
              <ul>
              <li>Architected and launched the unified global App Marketplace, enabling localized app content and boosting 3P developer reach</li>
      <li>Developed an app recommendation engine based on AQI, increasing app connections and retention by 15%</li>
      <li>Led a team to build an event-driven system for real-time app updates, reducing sync time from 2 hours to minutes</li>
      <li>Championed operational excellence initiatives to maintain 99.9% uptime during peak tax season</li>
              </ul>
            </div>
            <div className="role">
              <h3>Software Engineer @ Ericsson</h3>
              <p className="subtitle">Chargind Node Automation · 2016-2018</p>
              <ul>
              <li>Designed and delivered a Spring Boot automation tool that converted Excel-based telecom orders to XML, reducing order processing time from 1 week to 5 hours</li>
    <li>Led end-to-end automation of catalog configuration and deployment, improving delivery speed by 40% and accelerating time-to-market for major customer projects</li>
              </ul>
            </div>
          </section>

          <section className="resume-section">
            <h2>Technical Impact</h2>
            <div className="impact-grid">
            <div className="impact-card">
      <h3>Financing as a Service</h3>
      <ul>
      <li>Founding engineer (#5) on the team — helped take a whiteboard concept to production in under 3 months</li>
        <li>20% increase in merchant sales conversion via AI-driven Financing Agent</li>
        <li>5% lift in CK registrations through streamlined seamless user registration</li>
        <li>Reduced latency by 40% and achieved 99.99% uptime during peak usage</li>
      </ul>
    </div>


    <div className="impact-card">
      <h3>Global App Marketplace</h3>
      <ul>
        <li>Growth in app integrations after launching unified marketplace</li>
        <li>Real-time app updates reduced sync delays from 2 hours to minutes</li>
        <li>Localized content in 11+ languages, deployed across multiple regions</li>
      </ul>
    </div>
    <div className="impact-card">
      <h3>Engineering Interview Revamp</h3>
      <ul>
        <li>Redesigned Intuit’s engineering interview process to focus on real-world engineering skills</li>
        <li>Developed LLM-powered craft projects adopted across multiple engineering domains</li>
        <li>Launched public GitHub org for interview exercises, improving candidate transparency and prep</li>
        <li>Improved candidate NPS and assessor signal accuracy</li>
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
                <h3>Languages:</h3>
                <span>Java, Python, Kotlin, TypeScript, SQL</span>
              </div>
              <div className="skill-row">
                <h3>AI & LLMs:</h3>
                <span>RAG pipelines, LLM integration (OpenAI, Ollama), LangChain, prompt engineering</span>
              </div>
              <div className="skill-row">
                <h3>Frameworks & Platforms</h3>
                <span>Spring Boot, AWS, Kubernetes, React, Kafka</span>
              </div>
              <div className="skill-row">
                <h3>Product Development:</h3>
                <span>Rapid prototyping, MVP development, user-first architecture, experimentation toward product-market fit</span>
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
