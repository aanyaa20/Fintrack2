import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 px-6 lg:px-8 bg-slate-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">
          Built for people who want clarity and control over their financial
          data.
        </h2>
        <p className="text-lg text-slate-300 mb-10">
          Start tracking your finances with FinTrak today. No credit card
          required.
        </p>
        <Link
          to="/sign-up"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-medium rounded-md hover:bg-slate-100 transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2 size-5" />
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;
