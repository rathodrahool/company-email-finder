// src/App.tsx
import React, { useState, useEffect } from "react";
import Toast from "./components/Toast";
import { isValidDomain, generateCorporateEmails } from "./utils/emailGenerator";

const App: React.FC = () => {
  // State Variables
  const [isBulk, setIsBulk] = useState<boolean>(false);
  const [singleDomain, setSingleDomain] = useState<string>("");
  const [domains, setDomains] = useState<string[]>([]);
  const [generatedEmails, setGeneratedEmails] = useState<{
    [key: string]: string[];
  }>({});
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Handle Email Generation
  const handleGenerateEmails = () => {
    let selectedDomains: string[] = [];

    if (isBulk && domains.length > 0) {
      selectedDomains = domains;
    } else if (!isBulk && singleDomain.trim() !== "") {
      selectedDomains = [singleDomain.trim()];
    } else {
      setToast({
        message: "Please provide at least one domain.",
        type: "error",
      });
      return;
    }

    // Validate Domains
    const invalidDomains = selectedDomains.filter(
      (domain) => !isValidDomain(domain)
    );
    if (invalidDomains.length > 0) {
      setToast({
        message: `Invalid domains: ${invalidDomains.join(", ")}`,
        type: "error",
      });
      return;
    }

    const emails: { [key: string]: string[] } = {};

    selectedDomains.forEach((domain) => {
      emails[domain] = generateCorporateEmails(domain);
    });

    setGeneratedEmails(emails);
    localStorage.setItem("generatedEmails", JSON.stringify(emails));

    setToast({
      message: "Emails generated successfully!",
      type: "success",
    });
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const domainList = text
          .split(/\r?\n/)
          .map((domain) => domain.trim())
          .filter((domain) => domain);
        setDomains(domainList);
      };
      reader.readAsText(file);
    }
  };

  // Copy to Clipboard
  const handleCopyToClipboard = () => {
    const allEmails = Object.values(generatedEmails).flat().join("\n");
    if (allEmails.trim() === "") {
      setToast({
        message: "No emails to copy.",
        type: "error",
      });
      return;
    }
    navigator.clipboard.writeText(allEmails).then(() => {
      setToast({
        message: "Emails copied to clipboard!",
        type: "success",
      });
    });
  };

  // Download Emails
  const handleDownload = () => {
    const allEmails = Object.values(generatedEmails).flat().join("\n");
    if (allEmails.trim() === "") {
      setToast({
        message: "No emails to download.",
        type: "error",
      });
      return;
    }
    const blob = new Blob([allEmails], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated_emails.txt";
    link.click();
    URL.revokeObjectURL(url);
    setToast({
      message: "Emails downloaded successfully!",
      type: "success",
    });
  };
  // Compose Gmail Link
  const composeGmailLink = (): string => {
    const allEmails = Object.values(generatedEmails).flat();
    const uniqueEmails = Array.from(new Set(allEmails)); // Remove duplicates
    const bcc = uniqueEmails.join(",");
    return `https://mail.google.com/mail/?view=cm&fs=1&bcc=${encodeURIComponent(
      bcc
    )}`;
  };
  // Retrieve Stored Emails on Mount
  useEffect(() => {
    const storedEmails = localStorage.getItem("generatedEmails");
    if (storedEmails) {
      setGeneratedEmails(JSON.parse(storedEmails));
    }
  }, []);

  // Auto-hide Toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Calculate total generated emails
  const generatedEmailsCount: number =
    Object.values(generatedEmails).flat().length;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center min-h-screen relative p-4">
      {/* Render Toast if exists */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="text-center max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-gray-800">
          Permutix{" "}
          <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
            Email Finder
          </span>
        </h1>
        <p className="text-2xl text-gray-800 mt-2">
          Generate company-specific email addresses
        </p>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <div className="flex items-center text-green-600">
            <i className="fas fa-check-circle"></i>
            <span className="ml-2 text-gray-600">
              Generate emails based on company domains
            </span>
          </div>
          <div className="flex items-center text-green-600">
            <i className="fas fa-check-circle"></i>
            <span className="ml-2 text-gray-600">
              Easy copy and download options
            </span>
          </div>
          <div className="flex items-center text-green-600">
            <i className="fas fa-check-circle"></i>
            <span className="ml-2 text-gray-600">100% Free</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-8 space-y-8 md:space-y-0 md:space-x-8">
          {/* Input Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Email Finder
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGenerateEmails();
              }}
            >
              <div className="mb-4 text-left">
                <label className="block text-sm font-medium text-blue-600">
                  Choose Input Type
                </label>
                <div className="flex space-x-4 mt-2">
                  <button
                    type="button"
                    className={`flex-1 p-2 rounded ${
                      !isBulk
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setIsBulk(false)}
                  >
                    Single Domain
                  </button>
                  <button
                    type="button"
                    className={`flex-1 p-2 rounded ${
                      isBulk
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setIsBulk(true)}
                  >
                    Bulk Upload
                  </button>
                </div>
              </div>

              {!isBulk ? (
                <div className="mb-4 text-left">
                  <label className="block text-sm font-medium text-blue-600">
                    Domain
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. example.com"
                    value={singleDomain}
                    onChange={(e) => setSingleDomain(e.target.value)}
                    className={`w-full p-3 border ${
                      toast &&
                      toast.type === "error" &&
                      !isValidDomain(singleDomain)
                        ? "border-red-500"
                        : "border-blue-300"
                    } rounded-lg focus:outline-none focus:ring-2 ${
                      toast &&
                      toast.type === "error" &&
                      !isValidDomain(singleDomain)
                        ? "focus:ring-red-500"
                        : "focus:ring-blue-500"
                    }`}
                  />
                </div>
              ) : (
                <div className="mb-4 text-left">
                  <label className="block text-sm font-medium text-blue-600">
                    Upload Domains File
                  </label>
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {domains.length > 0 && (
                    <p className="text-green-600 mt-2">
                      {domains.length} domains loaded.
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Generate Emails <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </form>
          </div>

          {/* Generated Emails Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Generated Emails
            </h2>
            {Object.keys(generatedEmails).length > 0 ? (
              <>
                <div className="max-h-80 overflow-y-auto">
                  {Object.entries(generatedEmails).map(([domain, emails]) => (
                    <div key={domain} className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {domain}
                      </h3>
                      <textarea
                        className="w-full h-24 p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                        value={emails.join("\n")}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 mt-4">
                  Generated{" "}
                  <span className="font-bold text-green-600">
                    {generatedEmailsCount}
                  </span>{" "}
                  emails.
                </p>
                <a
                  href={composeGmailLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-4 block"
                >
                  Open in Gmail
                </a>
                <div className="flex space-x-4 mt-4">
                  <button
                    type="button"
                    className="flex-1 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleCopyToClipboard}
                  >
                    Copy All to Clipboard{" "}
                    <i className="fas fa-clipboard ml-2"></i>
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={handleDownload}
                  >
                    Download Emails <i className="fas fa-download ml-2"></i>
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-600">
                Generated emails will appear here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
