import { ChatBot } from './components/ChatBot';

function App() {
  return (
    <>
      <div className="page">
        {/* Intro */}
        <header className="intro">
          <div className="intro-top">
            <img src="/IMG_1690.PNG" alt="Amit Kulkarni" className="headshot" />
            <div>
              <h1>Amit Kulkarni</h1>
              <p className="role">
                Forward Deployed Engineer at Intercom — I help enterprise teams make AI useful in production.
              </p>
              <p className="contact">
                <a href="mailto:amit3992@gmail.com">Email</a>
                <span className="sep">&#xb7;</span>
                <a href="https://github.com/amit3992">GitHub</a>
                <span className="sep">&#xb7;</span>
                <a href="https://www.linkedin.com/in/amit3992/">LinkedIn</a>
                <span className="sep">&#xb7;</span>
                <a href="/Amit_Kulkarni_Resume.pdf" download>
                  R&eacute;sum&eacute; (PDF &darr;)
                </a>
              </p>
            </div>
          </div>
        </header>

        {/* Selected work */}
        <section id="projects" className="section">
          <h2>Selected work</h2>

          <article className="work-entry">
            <h3>
              <a href="https://github.com/amit3992/fpl-cli">FPL CLI</a>
            </h3>
            <p>
              A command-line toolkit for Fantasy Premier League — squad, fixtures,
              transfers, and injury news from the terminal, with JSON output for agents.
            </p>
            <p className="stack">CLI &middot; TypeScript &middot; Node.js &middot; Python</p>
          </article>

          <article className="work-entry">
            <h3>
              <a href="https://github.com/amit3992/my-portfolio-bot">Portfolio bot</a>
            </h3>
            <p>
              The assistant on this page — streams responses over SSE, runs Gemini
              with a Claude fallback, and logs questions to a private Supabase dashboard.
            </p>
            <p className="stack">
              Python &middot; FastAPI &middot; LangChain &middot; Gemini &middot; Claude &middot; FAISS
            </p>
          </article>
        </section>

        {/* Work */}
        <section id="work" className="section">
          <h2>Work</h2>
          <p style={{ color: 'var(--muted)' }}>
            First Forward Deployed Engineer hire at Intercom, onboarding enterprise
            customers onto Fin and shipping Intercom-specific Claude Code plugins.
            Before that, seven years at Intuit building financing platforms, a RAG
            agent, and event-driven delivery pipelines kept at 99.9% through tax season.
            Full history on{' '}
            <a href="https://www.linkedin.com/in/amit3992/">LinkedIn</a>.
          </p>
        </section>

        {/* Now */}
        <section id="now" className="section">
          <h2>Now</h2>
          <ul className="now-list">
            <li>Onboarding enterprise customers onto Fin at Intercom</li>
            <li>Learning French at Alliance Fran&ccedil;aise Silicon Valley</li>
            <li>Reading <em>How to Win the Premier League</em> by Ian Graham</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-row">
            <span>
              <a href="mailto:amit3992@gmail.com">amit3992@gmail.com</a>
            </span>
            <span>&copy; 2026 Amit Kulkarni</span>
          </div>
        </footer>
      </div>
      <ChatBot />
    </>
  );
}

export default App;
