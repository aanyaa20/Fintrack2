import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

const WhatsNew = () => {
  const updates = [
    {
      version: "v2.1.0",
      date: "January 2025",
      features: [
        "Enhanced AI receipt scanning with improved accuracy",
        "New dashboard widgets for better expense visualization",
        "Multi-currency support for international transactions",
        "Dark mode improvements and UI refinements"
      ]
    },
    {
      version: "v2.0.0",
      date: "December 2024",
      features: [
        "Complete redesign with modern dark theme",
        "Introducing AI-powered insights and recommendations",
        "Recurring transaction automation",
        "Custom report builder with advanced filters"
      ]
    },
    {
      version: "v1.5.0",
      date: "November 2024",
      features: [
        "Mobile responsive design improvements",
        "8 language support (English, Spanish, French, German, Hindi, Chinese, Japanese, Portuguese)",
        "Export to PDF and Excel",
        "Performance optimizations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1e2a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-8">
          <ArrowLeft className="size-5" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="size-10 text-green-500" />
          <h1 className="text-4xl font-bold">What's New in Fintrack</h1>
        </div>

        <p className="text-gray-300 mb-8">
          Stay up to date with the latest features, improvements, and updates to Fintrack. We're constantly working
          to make your expense tracking experience better.
        </p>

        <div className="space-y-8">
          {updates.map((update, index) => (
            <div key={index} className="bg-[#0f1419] p-6 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-500 text-gray-900 text-sm font-semibold rounded">
                  {update.version}
                </span>
                <span className="text-gray-400 text-sm">{update.date}</span>
              </div>
              <ul className="space-y-2">
                {update.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2 text-gray-300">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
          <h3 className="text-xl font-semibold text-green-500 mb-3">Coming Soon</h3>
          <p className="text-gray-300">
            We're working on exciting new features including bank account integration, mobile apps for iOS and Android,
            and collaborative budgeting for families and teams. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
