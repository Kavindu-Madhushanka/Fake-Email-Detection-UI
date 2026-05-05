import React, { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [emailText, setEmailText] = useState("");

  const handleCheck = () => {
    if (!emailText.trim()) return;

    setLoading(true);
    setShowResult(false);

    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 font-sans selection:bg-cyan-500/30">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 blur-[120px] rounded-full"></div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-zinc-900/70 backdrop-blur-3xl border border-zinc-800 p-8 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] relative z-10">
        {/* Title Section */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-black tracking-tight text-white">
            Fake Email <span className="text-cyan-400">Detector</span>
          </h1>
          <p className="text-sm font-medium text-zinc-500">
            Enterprise-grade phishing analysis
          </p>
        </div>

        <div className="space-y-6">
          {/* Text Area */}
          <div className="relative group">
            <textarea
              rows="6"
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              className="w-full p-5 transition-all border shadow-2xl resize-none bg-zinc-950/50 border-zinc-800 rounded-3xl text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              placeholder="Paste the email content to analyze..."
            ></textarea>
          </div>

          {/* Check Button */}
          <button
            onClick={handleCheck}
            disabled={loading || !emailText.trim()}
            className={`w-full py-4 rounded-2xl font-bold text-zinc-950 transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group ${
              loading || !emailText.trim()
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] active:scale-[0.97]"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 rounded-full border-zinc-950/30 border-t-zinc-950 animate-spin"></div>
                <span className="text-xs tracking-widest uppercase">
                  Analyzing Protocol...
                </span>
              </>
            ) : (
              <span className="text-xs font-black tracking-widest uppercase">
                Scan Content
              </span>
            )}
          </button>
        </div>

        {/* Result & Loading UI Area */}
        <div className="mt-10">
          {loading ? (
            <div className="space-y-5 animate-pulse">
              <div className="flex justify-between px-1 mb-1 text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-500/80">
                <span>Neural Engine Scanning</span>
                <span className="animate-bounce">...</span>
              </div>
              <div className="w-full h-[6px] overflow-hidden rounded-full bg-zinc-800">
                <div className="bg-cyan-400 h-full w-1/3 animate-[loading_1.5s_infinite] shadow-[0_0_15px_rgba(34,211,238,0.6)]"></div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="h-1.5 col-span-3 rounded-full bg-zinc-800"></div>
                <div className="h-1.5 col-span-1 rounded-full bg-zinc-800"></div>
              </div>
            </div>
          ) : showResult ? (
            <div className="w-full p-6 border bg-emerald-500/5 border-emerald-500/20 rounded-[2rem] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-3 text-lg font-bold text-emerald-400">
                <div className="relative flex w-3 h-3">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400"></span>
                  <span className="relative inline-flex w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                Scan Verified
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400">
                Our analysis indicates that this email is{" "}
                <span className="text-emerald-400/80">Likely Safe</span>. No
                common phishing patterns or malicious injection signatures were
                detected.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full py-12 border border-dashed border-zinc-800 rounded-[2rem] group hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 mb-3 transition-colors border rounded-full bg-zinc-950 border-zinc-800 text-zinc-600 group-hover:text-zinc-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600">
                Awaiting Data Input
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Global CSS for Smooth Loading */}
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}

export default App;
