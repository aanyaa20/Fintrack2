import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";

const Faqs = () => {
  const faqs = [
    {
      question: "How do I get started with FinEnsure?",
      answer: "Simply create an account, verify your email, and you're ready to start tracking your expenses. The onboarding guide will walk you through the basic features."
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes, we use bank-level encryption and security measures to protect your data. Your information is stored securely and never shared with third parties."
    },
    {
      question: "Can I use FinEnsure on multiple devices?",
      answer: "Absolutely! FinEnsure is accessible from any device with a web browser. Your data syncs automatically across all your devices."
    },
    {
      question: "How does AI receipt scanning work?",
      answer: "Take a photo of your receipt, and our AI will automatically extract the transaction details including merchant name, amount, date, and items. You can review and edit before saving."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export your transactions and reports in CSV, PDF, or Excel formats at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1e2a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-8">
          <ArrowLeft className="size-5" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="size-10 text-cyan-500" />
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        </div>

        <p className="text-gray-300 mb-8">
          Find answers to the most common questions about FinEnsure. Can't find what you're looking for? Contact our support team.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#0f1419] p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-cyan-500 mb-3">{faq.question}</h3>
              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <h3 className="text-xl font-semibold text-cyan-500 mb-3">Still have questions?</h3>
          <p className="text-gray-300 mb-4">
            Our support team is here to help. Reach out via email or join our community forums.
          </p>
          <a href="mailto:arjunbrt1303@gmail.com" className="text-cyan-500 hover:text-cyan-400 font-medium">
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
