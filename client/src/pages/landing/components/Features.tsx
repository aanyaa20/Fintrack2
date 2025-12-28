import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      title: t('landing.features.transaction_title'),
      description: t('landing.features.transaction_desc'),
      image: "/assets/landing/image-1766880354385.png",
      imageAlt: "Transaction recording interface",
    },
    {
      title: t('landing.features.analytics_title'),
      description: t('landing.features.analytics_desc'),
      image: "/assets/landing/image-1766880558860.png",
      imageAlt: "Analytics dashboard showing spending patterns",
    },
    {
      title: t('landing.features.receipt_title'),
      description: t('landing.features.receipt_desc'),
      image: "/assets/landing/image-1766881725239.png",
      imageAlt: "Receipt scanning feature",
    },
    {
      title: t('landing.features.account_title'),
      description: t('landing.features.account_desc'),
      image: "/assets/landing/image-1766880675915.png",
      imageAlt: "Account creation interface",
    },
  ];

  return (
    <section id="features" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0f1419]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4">
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
                <p className="text-base text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Feature Image */}
              <div 
                className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""} 
                  animate-fade-in-up opacity-0`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="relative rounded-lg border border-gray-700 overflow-hidden shadow-md bg-gray-900">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                    <img
                      src={feature.image}
                      alt={feature.imageAlt}
                      className="w-full h-auto object-contain"
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
