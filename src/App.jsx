import { useState } from "react";
import RequestForm from "./Pages/RequestForm";
import ResultPanel from "./Pages/ResultPanel";
import analyzeApi from "./api/analyzeApi";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleAnalyze(payload) {
    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeApi(payload);
      setResult(data.analysis);
    } catch (error) {
      setResult({
        success: false,
        error: "Frontend error",
        details: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">
          API Response Analyzer
        </h1>

        <RequestForm
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        <ResultPanel result={result} />
      </div>
    </div>
  );
}
