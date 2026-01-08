import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="w-full pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-20 bg-[#0f1419] relative overflow-hidden">
      {/* Meshy Glassmorphic Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Scattered Glowing Mesh Blobs */}
        <div className="absolute top-10 left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-teal-500/30 via-cyan-500/20 to-transparent rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] left-[15%] w-[350px] h-[350px] bg-gradient-to-tr from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute top-[40%] left-[8%] w-[300px] h-[300px] bg-gradient-to-bl from-blue-500/25 via-cyan-400/15 to-transparent rounded-full blur-[110px] animate-pulse-delay-1000"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[320px] h-[320px] bg-gradient-to-t from-emerald-500/20 via-teal-400/15 to-transparent rounded-full blur-[90px]"></div>
        
        {/* Additional scattered blobs for depth */}
        <div className="absolute top-[30%] left-[25%] w-[250px] h-[250px] bg-gradient-to-br from-indigo-500/15 via-purple-400/10 to-transparent rounded-full blur-[80px] opacity-60 animate-pulse-delay-500"></div>
        <div className="absolute top-[60%] left-[12%] w-[280px] h-[280px] bg-gradient-to-tl from-cyan-500/18 via-teal-500/12 to-transparent rounded-full blur-[95px]"></div>
        
        {/* Glassmorphic overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent backdrop-blur-[1px]"></div>
      </div>

      <div className="w-full relative z-10">
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
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm sm:text-base font-medium rounded-md hover:from-teal-600 hover:to-cyan-600 transition-colors shadow-lg shadow-teal-500/30"
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
