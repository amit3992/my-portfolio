import { BrowserRouter as Router } from 'react-router-dom';
import { ChatBot } from './components/ChatBot';

function App() {
  return (
    <Router>
      <div className="page">
        {/* Header */}
        <header className="site-header">
          <div className="header-content">
            <img src="/IMG_1690.PNG" alt="Amit Kulkarni" className="headshot" />
            <div>
              <h1>Amit Kulkarni</h1>
              <p className="title">Senior Forward Deployed Engineer, Intercom</p>
              <div className="contact">
                <a href="mailto:amit3992@gmail.com">amit3992@gmail.com</a>
                <a href="https://www.linkedin.com/in/amit3992/">LinkedIn</a>
                <a href="https://github.com/amit3992">GitHub</a>
              </div>
            </div>
          </div>
        </header>

        {/* Nav */}
        <nav className="site-nav">
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
          </div>
          <a href="/Amit_Kulkarni_Resume.pdf" download className="resume-link">[download resume]</a>
        </nav>

        {/* About */}
        <section id="about" className="section">
          <h2>About</h2>
          <p>
            I'm a software engineer with 10+ years of experience across platform infrastructure, developer ecosystems, and AI products. I'm currently a senior FDE at Intercom where I joined as a founding FDE. Before that I spent 7 years at Intuit building fintech products, platform infrastructure, and developer ecosystems. I like building things that ship to real customers.
          </p>
        </section>

        {/* Experience */}
        <section id="experience" className="section">
          <h2>Experience</h2>

          <div className="role-entry">
            <h3>Senior Forward Deployed Engineer, Intercom</h3>
            <p className="meta">September 2025 to present</p>
            <ul>
              <li>First FDE hire. Contributed to early hiring decisions and team processes as the org scaled.</li>
              <li>Ran technical strategy for enterprise accounts, closing deals near $1M ARR through hands-on Fin deployments.</li>
              <li>Part of the team that built Fin Monitors from 0 to GA in 3 months.</li>
              <li>Core maintainer of the Fin CLI, a CLI tool used across the FD org to configure Intercom workspaces.</li>
              <li>Helped drive Claude Code adoption across FD and SE teams by writing a set of Intercom-specific skills and plugins.</li>
            </ul>
          </div>

          <div className="role-entry">
            <h3>Staff Software Engineer, Intuit</h3>
            <p className="meta">September 2018 to August 2025</p>
            <ul>
              <li>Helped build Intuit's Financing as a Service product, bringing Credit Karma's Lightbox into QuickBooks. Merchant sales went up 15%.</li>
              <li>Built a Financing Agent with RAG and LLMs that found merchants with open estimates and reached out automatically. 20% lift in conversions.</li>
              <li>Worked with Credit Karma's user management team to ship one-click registration. New user signups increased 5%.</li>
              <li>Designed and built a unified App Marketplace that worked across 100+ regions with localized content.</li>
              <li>Built a recommendation system using an App Quality Index and A/B tests. App connections went up 15%.</li>
              <li>Moved app updates from polling to event-driven. Went from 2 hour delays to under 2 minutes.</li>
              <li>Reworked Intuit's engineering interviews to test real-world skills and AI proficiency instead of whiteboard problems.</li>
              <li>Kept services at 99.9% availability through tax season.</li>
            </ul>
          </div>

          <div className="role-entry">
            <h3>Software Engineer II, Ericsson</h3>
            <p className="meta">February 2016 to August 2018</p>
            <ul>
              <li>Automated catalog configuration and deployment pipelines end to end. Deployment speed improved 40%.</li>
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <h2>Projects</h2>

          <div className="project-entry">
            <h3><a href="https://github.com/amit3992/fpl-copilot">FPL Copilot</a></h3>
            <p>A conversational CLI copilot for Fantasy Premier League. Chat with Claude to analyze your team, scout players, review fixtures, and execute transfers directly from the terminal. Like Claude Code, but for FPL.</p>
            <p className="tech">Python · Anthropic API · Playwright · aiohttp · Rich</p>
          </div>

          <div className="project-entry">
            <h3><a href="https://github.com/amit3992/fpl_captain_agent">FPL Captain Picker Agent</a></h3>
            <p>Uses stats and LLMs to help pick Fantasy Premier League captains. Deployed on Railway.</p>
            <p className="tech">Python · Ollama · OpenAI API</p>
          </div>

          <div className="project-entry">
            <h3><a href="https://github.com/amit3992/my-portfolio-bot">Portfolio AI Chatbot</a></h3>
            <p>RAG-powered chatbot on this site. Streams responses via SSE, uses Gemini with Claude fallback, and includes a private analytics dashboard tracking questions, visitors, and errors via Supabase.</p>
            <p className="tech">Python · FastAPI · LangChain · Gemini · Claude · FAISS · Supabase · Railway</p>
          </div>

          <div className="project-entry">
            <h3><a href="https://github.com/intuit-A4A">Intuit A4A Interview Platform</a></h3>
            <p>New interview format for Intuit engineering. Craft applications that test practical skills and AI proficiency, used by assessors across all domains.</p>
            <p className="tech">Python · LLMs · Public GitHub org</p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section">
          <h2>Skills</h2>
          <dl className="skills-list">
            <dt>Languages</dt>
            <dd>Java, Python, Kotlin, TypeScript, Scala, Ruby, SQL</dd>
            <dt>AI</dt>
            <dd>RAG, LLM integration (Claude, OpenAI, Ollama), LangChain, Claude Code plugins</dd>
            <dt>Frameworks</dt>
            <dd>Spring Boot, React, Kafka, Ruby on Rails</dd>
            <dt>Infra</dt>
            <dd>AWS, Kubernetes, ArgoCD, CDKTF, Wavefront, Splunk</dd>
            <dt>Databases</dt>
            <dd>PostgreSQL, DynamoDB, Redis</dd>
          </dl>
        </section>

        {/* Education */}
        <section id="education" className="section">
          <h2>Education</h2>
          <div className="role-entry">
            <h3>M.S. Electronics & Computer Engineering</h3>
            <p className="meta">Georgia Institute of Technology, 2014 to 2015</p>
          </div>
          <div className="role-entry">
            <h3>B.E. Electronics Engineering</h3>
            <p className="meta">University of Mumbai, 2010 to 2014. Silver Medalist.</p>
          </div>
        </section>

        {/* Also me */}
        <section id="also" className="section">
          <h2>Also Me</h2>
          <ul className="about-items">
            <li>Manchester United fan since I was a kid</li>
            <li>History nerd. Reading <em>How to Win the Premier League</em> by Ian Graham.</li>
            <li>Learning French at Alliance Fran&ccedil;aise Silicon Valley</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="site-footer">
          <p>
            &copy; 2026 Amit Kulkarni
          </p>
        </footer>
      </div>
      <ChatBot />
    </Router>
  );
}

export default App;
