import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="w-full max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight mb-4 sm:mb-6">
              Financial tracking, designed for clarity.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed">
              Fintrack helps you track income, expenses, and financial patterns
              with structured records and clear insights. Built for people who
              value control over their financial data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors"
              >
                Start Tracking
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-colors"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Right: Product Preview Image */}
          <div className="relative">
            <div className="relative rounded-lg border border-slate-200 shadow-xl overflow-hidden bg-white">
              {/* Placeholder for dashboard screenshot */}
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <img
                  src="/assets/landing/dashboard-preview.png"
                  alt="FinTrak Dashboard Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter, system-ui' font-size='18' fill='%2364748b'%3EDashboard Preview%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
            {/* Subtle shadow effect */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-slate-900/5 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
