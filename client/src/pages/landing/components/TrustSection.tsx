import { Shield, Lock, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const TrustSection = () => {
  const { t } = useTranslation();
  
  const trustPoints = [
    {
      icon: Shield,
      title: t('landing.trust.privacy_title'),
      description: t('landing.trust.privacy_desc'),
    },
    {
      icon: Lock,
      title: t('landing.trust.security_title'),
      description: t('landing.trust.security_desc'),
    },
    {
      icon: CheckCircle2,
      title: t('landing.trust.reliability_title'),
      description: t('landing.trust.reliability_desc'),
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 px-6 sm:px-12 lg:px-20 bg-[#1a1e2a] border-y border-gray-800">
      <div className="w-full">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className="flex flex-col items-start">
                <div className="mb-4 p-2.5 bg-green-500 rounded-md">
                  <Icon className="size-5 text-white" />
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
