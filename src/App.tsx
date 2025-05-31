import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Amit Kulkarni</h1>
              <p className="text-xl text-gray-600 mb-6">Staff Software Engineer</p>
              <p className="text-gray-600 mb-8">
                Seasoned software engineer with 9+ years at Intuit, specializing in building scalable backend systems
                and leading high-impact technical initiatives. Expert in Java, Python, AWS, and distributed systems architecture.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:contact@amitpk.com" className="flex items-center text-gray-600 hover:text-gray-900">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>contact@amitpk.com</span>
                </a>
                <a href="https://linkedin.com/in/amitpk" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/amitpk" className="text-gray-600 hover:text-gray-900">
                  <Github className="w-5 h-5" />
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

      {/* Technical Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Technical Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FaaS Project */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Financing as a Service (FaaS)</h3>
              <p className="text-gray-600 mb-4">
                Led the implementation of a scalable microservices platform handling $2B+ in annual transaction volume.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Reduced system latency by 40%</li>
                <li>• Achieved 99.99% uptime</li>
                <li>• Led the externalization of Intuit's Financing as a service product.</li>
              </ul>
            </div>

            {/* QuickBooks App Marketplace */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">QuickBooks App Marketplace</h3>
              <p className="text-gray-600 mb-4">
                Spearheaded the international expansion of the QuickBooks App Marketplace across 7 countries.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• 300% growth in global app integrations</li>
                <li>• Implemented multi-region deployment</li>
                <li>• Enhanced developer platform adoption</li>
              </ul>
            </div>

            {/* Engineering Interview Process */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Engineering Interview Process</h3>
              <p className="text-gray-600 mb-4">
                Redesigned the technical interview process at Intuit, improving candidate experience and hiring quality.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Improvement in candidate NPS</li>
                <li>• Reduced time-to-hire by 2 weeks</li>
                <li>• Standardized evaluation framework</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Technologies</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900">Languages</h4>
                  <p className="text-gray-600">Java, Python, JavaScript</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900">Cloud & Infrastructure</h4>
                  <p className="text-gray-600">AWS, Kubernetes, Docker</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900">Databases</h4>
                  <p className="text-gray-600">DynamoDB, PostgreSQL, Redis</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900">Frameworks</h4>
                  <p className="text-gray-600">Spring Boot, Django, React</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Leadership & Expertise</h3>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <ul className="space-y-3 text-gray-600">
                  <li>• System Design & Architecture</li>
                  <li>• Distributed Systems</li>
                  <li>• Technical Leadership</li>
                  <li>• Mentorship & Team Building</li>
                  <li>• Agile & DevOps Practices</li>
                  <li>• Performance Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">© 2025 Amit Kulkarni. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="/Resume_Amit_Kulkarni_2025.pdf" className="text-gray-500 hover:text-gray-900">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;