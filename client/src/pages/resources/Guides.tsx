import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

const Guides = () => {
  return (
    <div className="min-h-screen bg-[#1a1e2a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-8">
          <ArrowLeft className="size-5" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Users className="size-10 text-green-500" />
          <h1 className="text-4xl font-bold">Business & Personal Finance Guides</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-500">Complete Guide to Expense Tracking</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Master the art of expense tracking with our comprehensive guide designed for both individuals and businesses.
              Learn how to categorize expenses effectively, identify spending patterns, and make data-driven financial decisions.
              This guide covers everything from basic setup to advanced analytics and reporting.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Whether you're a freelancer managing business expenses, a small business owner tracking operational costs, or
              an individual looking to improve personal finance management, this guide provides practical strategies and
              best practices tailored to your needs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-500">Budget Planning Strategies</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Creating and maintaining a realistic budget is crucial for financial success. Learn proven budgeting methods
              like the 50/30/20 rule, zero-based budgeting, and envelope budgeting. Discover how to set achievable savings
              goals, plan for irregular expenses, and adjust your budget as your circumstances change.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our guide includes real-world examples, templates, and worksheets to help you create a budget that works for
              your unique situation. Track your progress, identify areas for improvement, and celebrate your financial wins
              along the way.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-500">Financial Reporting Best Practices</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Generate professional financial reports that provide valuable insights into your spending habits and financial
              health. Learn how to create monthly expense summaries, trend analysis reports, category breakdowns, and
              year-over-year comparisons. Understand key financial metrics and use them to make informed decisions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              For businesses, discover how to prepare reports for tax purposes, investor presentations, and internal
              decision-making. Our guides include industry-specific tips and compliance considerations to ensure your
              financial reporting meets all necessary standards.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Guides;
