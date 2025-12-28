import { ShieldCheck, Server, Zap, MessageSquare, Lock, Globe, Smartphone, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const TrustSection = () => {
  const { t } = useTranslation();
  
  const trustPoints = [
    {
      icon: ShieldCheck,
      title: t('landing.trust.privacy_title'),
      description: t('landing.trust.privacy_desc'),
    },
    {
      icon: Server,
      title: t('landing.trust.security_title'),
      description: t('landing.trust.security_desc'),
    },
    {
      icon: Zap,
      title: t('landing.trust.reliability_title'),
      description: t('landing.trust.reliability_desc'),
    },
    {
      icon: MessageSquare,
      title: "Community-Driven Development",
      description: "Built with feedback from real users. Regular updates and transparent development process.",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data belongs to you. We never sell or share your personal information with third parties.",
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Access your finances from anywhere in the world with multi-language support and currency conversion.",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Sync",
      description: "Seamlessly sync across all your devices. Start on mobile, continue on desktop without missing a beat.",
    },
    {
      icon: TrendingUp,
      title: "Smart Insights",
      description: "AI-powered analytics provide actionable insights to help you make better financial decisions.",
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 px-6 sm:px-12 lg:px-20 bg-[#1a1e2a] border-y border-gray-800">
      <div className="w-full">
        {/* First Row - 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {trustPoints.slice(0, 3).map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className="flex flex-col items-start">
                <div className="mb-4 p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                  <Icon className="size-6 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Second Row - 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {trustPoints.slice(3, 6).map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index + 3} className="flex flex-col items-start">
                <div className="mb-4 p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                  <Icon className="size-6 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Third Row - 2 items (centered) */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl">
            {trustPoints.slice(6, 8).map((point, index) => {
              const Icon = point.icon;
              return (
                <div key={index + 6} className="flex flex-col items-start">
                  <div className="mb-4 p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                    <Icon className="size-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
