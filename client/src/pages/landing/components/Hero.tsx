import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0f1419]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="w-full max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4 sm:mb-6">
              {t('landing.hero.title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              {t('landing.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors"
              >
                {t('landing.hero.start_tracking')}
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                {t('landing.hero.see_how_it_works')}
              </a>
            </div>
          </div>

          {/* Right: Product Preview Image */}
          <div className="relative">
            <div className="relative rounded-lg border border-gray-700 shadow-xl overflow-hidden bg-gray-900">
              {/* Placeholder for dashboard screenshot */}
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-slate-400 text-lg font-medium">Dashboard Preview</div>
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
