import React from 'react';
import './About.css';
import { Github, Linkedin, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="profile-image">
          <img src="/Amit.jpg" alt="Amit Kulkarni" />
        </div>
        <h1 className="text-black">Hey, I'm Amit 👋</h1>
        <p className="intro">
          I'm a Software Engineer living in the Bay Area with my partner Alida, our dog Sunny, and two cats, Big Papa and Delilah who run the house.
        </p>
      </section>

      <div className="about-sections-grid">
        <section className="about-section">
          <h2>✨ What I do</h2>
          <p>
          I build backend systems designed to handle scale without breaking. I care about the details, write code that’s easy to follow, and focus on steady progress. I like taking ideas from whiteboard sketches to production.
          </p>
        </section>

        <section className="about-section">
          <h2>💡 What I care about</h2>
          <p>
          I want to build things that stick around, not just servers with good uptime but products that actually matter to people. Tools that make work better. Software that feels like someone thought about the humans using it. Code that makes sense six months later when someone else needs to work with it.
          </p>
          <p>There's this Japanese concept I really connect with: <b>mono no aware</b>—the bittersweet awareness that nothing lasts forever. It reminds me that every build cycle, every team collaboration, every deployment is temporary. That's why I try to make each one count.</p>
          <p>At the end of the day, I just want to leave both code and teams better than I found them.</p>
        </section>

        <section className="about-section">
          <h2>🌟 Also me</h2>
          <ul className="fun-facts">
            <li>Manchester United fan since I was a kid. Through the glory days and... whatever you'd call the last decade.</li>
            <li>Total history nerd. Just finished <i>Unruly</i> by David Mitchell—it's this hilarious take on Britain's messiest royal drama.</li>
            <li>Can't stop tinkering with new tech. My GitHub is basically a graveyard of weekend projects that taught me something cool.</li>
            <li>Trying to learn French at <a href="https://www.afscv.org/" target="_blank" rel="noopener noreferrer">Alliance Française Silicon Valley</a>. Je suis débutant, mais j'essaie!</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>📚 Currently Reading</h2>
          <div className="reading-section">
            <div className="book">
              <h3>How to win the Premier League</h3>
              <p className="book-author">by Ian Graham</p>
            </div>
          </div>
        </section>
      </div>

      <section className="connect-section">
        <h2>Let's connect 👋</h2>
        <p>
          Working on something interesting? Or just want to talk tech, football, or where to find decent coffee in the Bay? Drop me a line i'm always up for a good conversation.
        </p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/amit3992/" className="social-link">
            <Linkedin className="icon" />
            LinkedIn
          </a>
          <a href="mailto:amit3992@gmail.com" className="social-link">
            <Mail className="icon" />
            amit3992@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
