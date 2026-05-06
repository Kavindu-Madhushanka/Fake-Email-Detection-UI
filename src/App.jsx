import React, { useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [emailText, setEmailText] = useState("");

  const handleCheck = async () => {
    if (!emailText.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const apiCall = axios.post("http://127.0.0.1:5000/predict", {
        text: emailText,
      });

      const delay = new Promise((resolve) => setTimeout(resolve, 1500));

      const [response] = await Promise.all([apiCall, delay]);

      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error connecting to API:", error);
      alert("Could not connect to the API. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 font-sans selection:bg-cyan-500/30">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-2xl bg-zinc-900/70 backdrop-blur-3xl border border-zinc-800 p-8 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] relative z-10">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-black tracking-tight text-white">
            Fake Email <span className="text-cyan-400">Detector</span>
          </h1>
          <p className="text-sm font-medium text-zinc-500">
            Enterprise-grade AI analysis
          </p>
        </div>

        <div className="space-y-6">
          <textarea
            rows="6"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            className="w-full p-5 transition-all border shadow-2xl resize-none bg-zinc-950/50 border-zinc-800 rounded-3xl text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50"
            placeholder="Paste the email content to analyze..."
          ></textarea>

          <button
            onClick={handleCheck}
            disabled={loading || !emailText.trim()}
            className={`w-full py-4 rounded-2xl font-bold text-zinc-950 transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden ${
              loading || !emailText.trim()
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] active:scale-[0.97]"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 rounded-full border-zinc-950/30 border-t-zinc-950 animate-spin"></div>
                <span className="text-xs tracking-widest uppercase">
                  Analyzing...
                </span>
              </>
            ) : (
              <span className="text-xs font-black tracking-widest uppercase">
                Scan Content
              </span>
            )}
          </button>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="space-y-5 animate-pulse">
              <div className="w-full h-[6px] overflow-hidden rounded-full bg-zinc-800">
                <div className="bg-cyan-400 h-full w-1/3 animate-[loading_1.5s_infinite]"></div>
              </div>
            </div>
          ) : result === "ham" ? (
            /* Safe Email (Ham) UI */
            <div className="w-full p-6 border bg-emerald-500/5 border-emerald-500/20 rounded-[2rem] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-3 text-lg font-bold text-emerald-400">
                <div className="relative flex w-3 h-3">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400"></span>
                  <span className="relative inline-flex w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                Scan Verified: Safe
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400">
                This email message appears to be safe. No phishing patterns were
                detected.
              </p>
            </div>
          ) : result === "spam" ? (
            /* Spam Email UI */
            <div className="w-full p-6 border bg-red-500/5 border-red-500/20 rounded-[2rem] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-3 text-lg font-bold text-red-400">
                <div className="relative flex w-3 h-3">
                  <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                  <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
                </div>
                Warning: Potential Spam
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400">
                Attention! This is most likely a fraudulent (Spam/Phishing)
                message.
              </p>
            </div>
          ) : (
            /* Default State */
            <div className="flex flex-col items-center justify-center w-full py-12 border border-dashed border-zinc-800 rounded-[2rem] text-zinc-600">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
                Awaiting Data Input
              </p>
            </div>
          )}
        </div>
      </div>

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
