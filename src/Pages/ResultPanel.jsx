import React, { useState } from "react";

const TABS = ["Body", "Headers", "Raw"];

const ResultPanel = ({ result }) => {
  const [activeTab, setActiveTab] = useState("Body");

  if (!result) {
    return (
      <div className="p-4 text-gray-500">
        No response yet. Send a request to see results.
      </div>
    );
  }

  if (result.success === false) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded">
        <h3 className="font-semibold text-red-600">Error</h3>
        <p>{result.error}</p>
        {result.details && (
          <pre className="mt-2 text-sm">{result.details}</pre>
        )}
      </div>
    );
  }

  const {
    statusCode,
    detectedResponseType,
    expectedResponseType,
    confidence,
    issues,
    suggestions,
    metadata,
  } = result;

  const preview = metadata?.responsePreview || "";
  const responseHeaders = metadata?.responseHeaders || {};

  return (
    <div className="border rounded bg-white shadow-sm">
      {/* Meta info */}
      <div className="flex flex-wrap gap-4 p-4 border-b text-sm">
        <span>
          <strong>Status:</strong> {statusCode}
        </span>
        <span>
          <strong>Type:</strong> {detectedResponseType}
        </span>
        <span>
          <strong>Expected:</strong> {expectedResponseType}
        </span>
        <span>
          <strong>Confidence:</strong> {confidence ?? "N/A"}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm border-r last:border-r-0 ${
              activeTab === tab
                ? "bg-gray-100 font-medium"
                : "hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "Body" && (
          <pre className="text-sm overflow-auto whitespace-pre-wrap">
            {preview}
          </pre>
        )}

        {activeTab === "Headers" && (
          <pre className="text-sm overflow-auto">
            {JSON.stringify(responseHeaders, null, 2)}
          </pre>
        )}

        {activeTab === "Raw" && (
          <pre className="text-sm overflow-auto whitespace-pre-wrap">
            {preview}
          </pre>
        )}
      </div>

      {/* Issues / Suggestions */}
      {(issues?.length > 0 || suggestions?.length > 0) && (
        <div className="p-4 border-t bg-gray-50 text-sm">
          {issues?.length > 0 && (
            <div className="mb-2">
              <strong className="text-red-600">Issues:</strong>
              <ul className="list-disc ml-5">
                {issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          {suggestions?.length > 0 && (
            <div>
              <strong className="text-green-600">Suggestions:</strong>
              <ul className="list-disc ml-5">
                {suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultPanel;
