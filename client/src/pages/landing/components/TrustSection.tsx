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
      description: "Built with feedback from real users, regular updates and transparent development process. Features are refined through actual usage, not assumptions.",
    },
  ];

  // Duplicate multiple times for truly seamless infinite loop with no gaps
  const duplicatedPoints = [...trustPoints, ...trustPoints, ...trustPoints];

  return (
    <section className="w-full py-12 sm:py-16 px-0 bg-[#1a1e2a] border-y border-gray-800 overflow-hidden">
      <div className="w-full relative">
        {/* Scrolling Container - Full width, shows exactly 4 cards */}
        <div className="marquee-container group">
          <div className="marquee-content">
            {duplicatedPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="marquee-item flex-shrink-0 flex flex-col items-start p-6 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-cyan-500 transition-colors duration-300"
                >
                  <div className="mb-4 p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-lg">
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

      <style>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          user-select: none;
          width: 100%;
        }

        .marquee-item {
          width: calc(25% - 1.125rem);
          min-width: 250px;
        }

        .marquee-content {
          display: flex;
          gap: 1.5rem;
          animation: scroll 25s linear infinite;
        }

        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-25% * 4 - 1.5rem * 4));
          }
        }
      `}</style>
    </section>
  );
};

export default TrustSection;
