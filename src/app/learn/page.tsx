"use client"
import Link from "next/link"

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div
    className={`bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 md:p-10 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-investa-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">{children}</div>
  </div>
);

export default function LearnPage() {
  
  return (
    <main className="min-h-screen bg-[#fafafa] relative overflow-hidden selection:bg-investa-primary/20">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-[#fafafa]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#535050 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        
        {/* Static Gradient Blobs */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[80px]" 
        />
        <div 
          className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-investa-primary/5 rounded-full mix-blend-multiply filter blur-[80px]" 
        />
        <div 
          className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-100/40 rounded-full mix-blend-multiply filter blur-[80px]" 
        />
      </div>

      <div className="relative z-10 px-4 md:px-6 py-6 md:py-10">
        {/* Navbar */}
        <div 
          className="flex justify-between items-center mb-16 max-w-7xl mx-auto"
        >
          <Link href="/" className="group">
            <div className="font-bold text-3xl tracking-tight text-investa-dark group-hover:text-investa-primary transition-colors duration-300">
              Renvue<span className="text-investa-primary">.</span>
            </div>
          </Link>
          <Link href="/">
            <button 
              className="h-10 px-6 bg-white border border-gray-200 text-investa-dark rounded-full hover:border-investa-primary/50 hover:text-investa-primary transition-all font-medium text-sm flex items-center justify-center shadow-sm hover:shadow-md gap-2 active:scale-95 transform"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto mb-20">
          {/* Hero Section */}
          <div 
            className="text-center mb-24 relative"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-investa-primary/5 text-investa-primary text-sm font-semibold tracking-wide uppercase border border-investa-primary/10">
              The Future of Funding
            </div>
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-investa-dark tracking-tight leading-[1.1] mb-8"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-investa-dark to-investa-gray">Renvue</span>
            </h1>
            <p 
              className="text-investa-gray text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
            >
              An AI-powered investment marketplace connecting investors with promising startups in seconds.
            </p>
          </div>

          <div className="space-y-24">
            {/* Section 1: Inspiration */}
            <section className="relative">
              <div className="absolute -left-4 top-10 w-2 h-20 bg-investa-primary rounded-full hidden md:block" />
              <Card>
                <div className="grid md:grid-cols-[1fr,1.5fr] gap-10 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-investa-primary mb-4">Our Inspiration</h2>
                    <div className="h-1 w-20 bg-investa-dark/10 rounded-full" />
                  </div>
                  <p className="text-lg text-investa-gray leading-relaxed">
                    We were inspired by the millions of innovators dreaming of building the next big thing but struggling to connect with the right investors, and the investors drowning in irrelevant pitches. The inefficiency of early-stage startup funding felt like a problem ripe for an AI solution. Platforms like Crunchbase and Product Hunt showed us the wealth of startup data out there, but nothing tied it together with natural language search for both sides of the equation—investors and founders. We wanted to create a two-sided marketplace that makes funding fast, smart, and accessible.
                  </p>
                </div>
              </Card>
            </section>

            {/* Section 2: What it does */}
            <section>
              <div 
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-investa-dark mb-6">What Renvue Does</h2>
                <p className="text-investa-gray text-lg max-w-4xl mx-auto leading-relaxed">
                  Renvue.ai is an AI-powered investment marketplace that connects investors with early-stage startups in seconds. Investors can search for startups by idea, category, or funding needs using natural language queries (e.g., "AI healthcare startups under $1M"), while founders can create profiles and get matched with investors based on their pitch and requirements. It's a seamless platform that simplifies discovery and funding, targeting investors hungry for opportunities and startups desperate for capital.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Investor Card */}
                <div
                  className="bg-investa-dark text-white p-10 rounded-3xl relative overflow-hidden group shadow-2xl transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white text-investa-dark flex items-center justify-center text-sm">I</span>
                    For Investors
                  </h3>
                  <ul className="space-y-4 relative z-10">
                    {[
                      "Search startups with natural language",
                      "Filter by industry, stage, and funding needs",
                      "Discover promising early-stage opportunities",
                      "Connect directly with founders"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 opacity-90 hover:opacity-100 transition-opacity">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-investa-primary flex-shrink-0" />
                        <span className="text-lg leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Startup Card */}
                <div
                  className="bg-white p-10 rounded-3xl relative overflow-hidden group border border-gray-100 shadow-xl transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-investa-primary">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-investa-dark mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-investa-primary text-white flex items-center justify-center text-sm">S</span>
                    For Startups
                  </h3>
                  <ul className="space-y-4 relative z-10">
                    {[
                      "Create detailed company profiles",
                      "Get matched with relevant investors",
                      "Simplify your fundraising process",
                      "Focus on building, not endless pitching"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-investa-gray hover:text-investa-dark transition-colors">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-investa-primary flex-shrink-0" />
                        <span className="text-lg leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: How It Works */}
            <section className="relative">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-investa-dark mb-6">How It Works</h2>
              </div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-investa-primary/20 to-transparent border-t-2 border-dashed border-investa-primary/30" />
                
                {[
                  {
                    step: "01",
                    title: "Create Your Profile",
                    desc: "Set up your investor or startup profile with your specific criteria and preferences.",
                  },
                  {
                    step: "02",
                    title: "Get Matched",
                    desc: "Our AI algorithm connects you with the most relevant partners based on your profile.",
                  },
                  {
                    step: "03",
                    title: "Connect & Grow",
                    desc: "Communicate directly with potential partners and build meaningful relationships.",
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group z-10"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-2xl font-bold text-investa-primary mb-6 mx-auto group-hover:scale-110 group-hover:bg-investa-primary group-hover:text-white transition-all duration-300 relative z-20">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-investa-dark mb-3 text-center">{item.title}</h3>
                    <p className="text-investa-gray text-center leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <div 
            className="mt-32 text-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 -z-10 rounded-3xl transform scale-110" />
            <h2 className="text-4xl md:text-6xl font-bold text-investa-dark mb-10 tracking-tight">Ready to Get Started?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/find-startups">
                <button className="w-full sm:w-auto py-4 px-10 bg-investa-primary text-white rounded-full text-lg font-bold hover:bg-[#d62f04] transition-all shadow-lg hover:shadow-investa-primary/30 transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                  I'm an Investor
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
              </Link>
              <Link href="/find-investors">
                <button className="w-full sm:w-auto py-4 px-10 bg-investa-dark text-white rounded-full text-lg font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                  I'm a Startup
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
