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
          Staff Software Engineer based in the Bay Area. I live with my partner Alida, our dog Sunny and two cats - Big Papa and Delilah.
        </p>
      </section>

      <div className="about-sections-grid">
        <section className="about-section">
          <h2>✨ What I do</h2>
          <p>
          I design and build backend systems that scale — with care, clarity, and a bias for action. I love to turn ideas into products, whether that’s launching financing platforms, or integrating AI tools into existing workflows.
          </p>
        </section>

        <section className="about-section">
          <h2>💡 What I care about</h2>
          <p>
          I care about building things that last — not just in uptime, but in impact. Tools that help people do what they do better. Products that feel thoughtful. Code that’s easy to pick up long after it’s been written.
<p>I’m driven by a quiet principle from Japanese aesthetics: <b>mono no aware</b> — which means the gentle awareness of impermanence. It reminds me to appreciate every fleeting build cycle, every team moment, every shipped line of code. Nothing lasts forever, so let’s make it count while it’s here.</p>


I care about clarity, craft, and leaving systems — and people — better than I found them.
          </p>
        </section>

        <section className="about-section">
          <h2>🌟 Also me</h2>
          <ul className="fun-facts">
            <li>Lifelong Manchester United supporter — for better or for worse.</li>
            <li>A history nerd at heart. One of my favorite reads is Unruly by David Mitchell — a sharp, funny deep-dive into Britain’s royal chaos. </li>
            <li>Always curious, always tinkering — I love exploring new ideas, tools, and the occasional rabbit hole.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>📚 Currently Reading</h2>
          <div className="reading-section">
            <div className="book">
              <h3>Wanderers</h3>
              <p className="book-author">by Chuck Wendig</p>
            </div>
          </div>
        </section>
      </div>

      <section className="connect-section">
        <h2>Let's connect 👋</h2>
        <p>
          Got an interesting project or just want to chat about tech, football, or coffee?
          I'd love to hear from you!
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
