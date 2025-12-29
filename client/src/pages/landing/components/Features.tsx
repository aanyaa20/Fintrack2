import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

const Features = () => {
  const { t } = useTranslation();
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const features = [
    {
      title: t('landing.features.transaction_title'),
      points: [
        "Log income and expenses with clear categories and timestamps",
        "Maintain a consistent, searchable record of all transactions",
        "Keep financial data structured for quick review and reference"
      ],
      image: "/assets/landing/image-1766880354385.png",
      imageAlt: "Transaction recording interface",
    },
    {
      title: t('landing.features.analytics_title'),
      points: [
        "Visual breakdown of spending by category and time period",
        "Identify recurring expenses and long-term trends",
        "Gain clarity on where money is actually being spent"
      ],
      image: "/assets/landing/image-1766880558860.png",
      imageAlt: "Analytics dashboard showing spending patterns",
    },
    {
      title: t('landing.features.receipt_title'),
      points: [
        "Extract amounts, dates, and categories directly from receipts",
        "Reduce manual entry with automated transaction capture",
        "Store scanned receipts alongside verified financial records"
      ],
      image: "/assets/landing/image-1766883729680.png",
      imageAlt: "Receipt scanning feature",
    },
    {
      title: t('landing.features.account_title'),
      points: [
        "Create an account quickly using email or trusted providers",
        "Set preferred currency and basic financial preferences",
        "Start tracking immediately with a clean initial setup"
      ],
      image: "/assets/landing/image-1766880675915.png",
      imageAlt: "Account creation interface",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleImages((prev) => [...new Set([...prev, index])]);
          } else {
            // Remove from visible when scrolled out of view to re-trigger animation
            setVisibleImages((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px',
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 bg-[#0f1419]">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">
            {t('landing.features.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            {t('landing.features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-16 sm:space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text Content */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <ul className="text-base text-gray-300 leading-relaxed space-y-2">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Image */}
              <div 
                ref={(el) => { imageRefs.current[index] = el; }}
                data-index={index}
                className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""} 
                  group cursor-pointer`}
              >
                <div className={`relative rounded-lg border border-gray-700 overflow-hidden shadow-md bg-gray-900
                  transition-all duration-1000 ease-out
                  ${visibleImages.includes(index) 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'}`
                  }
                  group-hover:scale-105 group-hover:shadow-2xl group-hover:border-green-500`}>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                    <img
                      src={feature.image}
                      alt={feature.imageAlt}
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter, system-ui' font-size='16' fill='%2364748b'%3E${feature.imageAlt}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
