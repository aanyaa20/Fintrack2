import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="w-full pt-32 pb-20 px-6 sm:px-12 lg:px-20 bg-[#0f1419] relative overflow-hidden">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="w-full relative z-10">
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

          {/* Right: Dashboard Image with Gradient Blend */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden">
              {/* Dashboard image */}
              <div className="aspect-[4/3] relative h-[450px] lg:h-[550px]">
                <img
                  src="/assets/landing/image-1766883635155.png"
                  alt="Dashboard Preview"
                  className="w-full h-full object-contain opacity-70"
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
