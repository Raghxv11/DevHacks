"use client"
import Link from "next/link"

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, #53505008 1px, transparent 1px), 
                          linear-gradient(to bottom, #53505008 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative z-10 px-4 md:px-6 py-8">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
          <Link href="/">
            <div className="font-bold text-3xl text-investa-primary transition-all hover:scale-105">Renvue</div>
          </Link>
          <Link href="/">
            <button className="h-10 px-8 bg-investa-dark text-white rounded-full hover:bg-opacity-90 transition-all font-medium text-sm flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105">
              Back to Home
            </button>
          </Link>
        </div>

        {/* Page Content */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-investa-dark leading-tight mb-6">
              Learn More About Renvue
            </h1>
            <p className="text-investa-gray text-lg md:text-xl max-w-3xl mx-auto">
              Discover how our platform connects investors with promising startups and helps entrepreneurs find the perfect funding match.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Section 1 */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-10 transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-bold text-investa-primary mb-4">For Investors</h2>
                  <p className="text-investa-gray mb-6">
                    Renvue provides investors with powerful tools to discover, evaluate, and connect with high-potential startups that align with their investment criteria.
                  </p>
                  <ul className="space-y-3">
                    {["AI-powered startup matching", "Comprehensive due diligence tools", "Direct communication channels", "Portfolio tracking"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-investa-primary text-xl">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/find-startups">
                      <button className="py-2 px-6 bg-investa-primary text-white rounded-full text-base font-medium hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md transform hover:scale-105">
                        Find Startups
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 bg-gray-100 rounded-xl flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-6xl text-investa-primary mb-4">📊</div>
                    <div className="text-investa-gray font-medium">Investor Dashboard Preview</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-10 transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex flex-col md:flex-row-reverse gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-bold text-investa-primary mb-4">For Startups</h2>
                  <p className="text-investa-gray mb-6">
                    Renvue helps startups showcase their vision to relevant investors, streamlining the fundraising process and increasing chances of finding the right financial partner.
                  </p>
                  <ul className="space-y-3">
                    {["Smart investor matching", "Pitch deck optimization", "Funding stage guidance", "Fundraising timeline tools"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-investa-primary text-xl">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/find-investors">
                      <button className="py-2 px-6 bg-investa-primary text-white rounded-full text-base font-medium hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md transform hover:scale-105">
                        Find Investors
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 bg-gray-100 rounded-xl flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-6xl text-investa-primary mb-4">🚀</div>
                    <div className="text-investa-gray font-medium">Startup Dashboard Preview</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-10 transform hover:scale-[1.01] transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-investa-primary mb-6 text-center">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Create Your Profile",
                    description: "Set up your investor or startup profile with your specific criteria and preferences.",
                    icon: "👤"
                  },
                  {
                    title: "Get Matched",
                    description: "Our AI algorithm connects you with the most relevant partners based on your profile.",
                    icon: "🔄"
                  },
                  {
                    title: "Connect & Grow",
                    description: "Communicate directly with potential partners and build meaningful relationships.",
                    icon: "🤝"
                  }
                ].map((step, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-6 text-center">
                    <div className="text-5xl mb-4">{step.icon}</div>
                    <h3 className="text-xl font-semibold text-investa-dark mb-2">{step.title}</h3>
                    <p className="text-investa-gray">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-investa-dark mb-6">Ready to Get Started?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/find-startups">
                <button className="py-3 px-8 bg-investa-primary text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                  I'm an Investor
                </button>
              </Link>
              <Link href="/find-investors">
                <button className="py-3 px-8 bg-investa-dark text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                  I'm a Startup
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 