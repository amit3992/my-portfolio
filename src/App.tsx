import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { ChatBot } from './components/ChatBot';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
            <div className="flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
                <Link to="/resume" className="text-gray-600 hover:text-gray-900">Resume</Link>
                <Link to="/projects" className="text-gray-600 hover:text-gray-900">Projects</Link>
              </div>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={
            <div>
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
            <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
                Amit Kulkarni
              </Link>
              <p className="text-xl text-gray-600 mb-6">Staff Software Engineer</p>
              <p className="text-gray-600 mb-8">
                Building backend systems that scale at Intuit for the past 9+ years. I lead technical initiatives that matter and love solving complex problems. My toolkit includes Java, Python, AWS, and designing distributed systems that don't fall over when things get busy.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:amit3992@gmail.com" className="flex items-center text-gray-600 hover:text-gray-900">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>amit3992@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/amit3992/" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/amit3992" className="text-gray-600 hover:text-gray-900">
                  <Github className="w-5 h-5" />
                </a>
              </div>
              <div className="mt-4">
                <a href="https://docs.google.com/document/d/1T9G5AsyDaZsPm8cY-LUAbvykWliwLUfOkj0g0SppuTs/edit?tab=t.0" target='_blank' className="text-gray-500 hover:text-gray-900">
                  Download Resume
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/IMG_1690.PNG" 
                alt="Amit Kulkarni"
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </header>


      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">© 2025 Amit Kulkarni. All rights reserved.</p>
          </div>
        </div>
      </footer>
            </div>
          } />
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;