import { ShieldCheck, Server, Zap, MessageSquare } from "lucide-react";
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
  ];

  return (
    <section className="w-full py-12 sm:py-16 px-6 sm:px-12 lg:px-20 bg-[#1a1e2a] border-y border-gray-800">
      <div className="w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trustPoints.map((point, index) => {
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
      </div>
    </section>
  );
};

export default TrustSection;
