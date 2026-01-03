import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

const HelpDocs = () => {
  return (
    <div className="min-h-screen bg-[#1a1e2a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-8">
          <ArrowLeft className="size-5" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="size-10 text-cyan-500" />
          <h1 className="text-4xl font-bold">Help Documents</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-500">Getting Started with Fintrack</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Welcome to Fintrack! This comprehensive guide will help you navigate through all the features and capabilities
              of our expense tracking platform. Whether you're new to financial management or an experienced user, these
              documents will help you make the most of Fintrack.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Fintrack is designed to simplify your financial life by providing powerful tools for tracking expenses,
              analyzing spending patterns, and generating insightful reports. Our AI-powered features help you understand
              your financial behavior and make informed decisions about your money.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-500">Core Features Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Fintrack offers a wide range of features including transaction tracking, category management, budget planning,
              and automated insights. You can manually enter transactions or use our AI receipt scanning feature to
              automatically extract transaction details from photos of your receipts.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The dashboard provides real-time analytics and visualizations of your spending patterns. Set up recurring
              transactions for bills and subscriptions, create custom reports, and export your data in multiple formats.
              Our multi-language support ensures that users worldwide can manage their finances in their preferred language.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-500">Common Tasks</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Learn how to add transactions, create categories, set budgets, and generate reports. Our step-by-step guides
              walk you through each feature with screenshots and detailed explanations. Discover tips and tricks for
              maximizing your productivity with keyboard shortcuts and advanced filtering options.
            </p>
            <p className="text-gray-300 leading-relaxed">
              If you encounter any issues or have questions not covered in these documents, please don't hesitate to
              contact our support team or visit our community forums where experienced users and our team are ready to help.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpDocs;
