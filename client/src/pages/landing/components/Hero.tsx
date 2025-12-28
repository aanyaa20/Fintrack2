import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="w-full pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-20 bg-[#0f1419] relative overflow-hidden">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="w-full relative z-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 sm:mb-4 lg:mb-6">
              {t('landing.hero.title')}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
              {t('landing.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-green-500 text-white text-sm sm:text-base font-medium rounded-md hover:bg-green-600 transition-colors"
              >
                {t('landing.hero.start_tracking')}
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 border border-gray-600 text-gray-300 text-sm sm:text-base font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                {t('landing.hero.see_how_it_works')}
              </a>
            </div>
          </div>

          {/* Right: Dashboard Image with Gradient Blend - FULLY RESPONSIVE */}
          <div className="relative w-full">
            <div className="relative rounded-lg overflow-hidden">
              {/* Dashboard image - responsive sizing */}
              <div className="relative w-full">
                <img
                  src="/assets/landing/image-1766883635155.png"
                  alt="Dashboard Preview"
                  className="w-full h-auto object-contain opacity-70 max-h-[300px] sm:max-h-[400px] lg:max-h-[550px]"
                />
                {/* Gradient overlay from left to right - creates blending effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f1419] via-[#0f1419]/50 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
