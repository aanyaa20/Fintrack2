import { useTranslation } from "react-i18next";

const Philosophy = () => {
  const { t } = useTranslation();
  
  const principles = [
    {
      title: t('landing.philosophy.principle1_title'),
      description: t('landing.philosophy.principle1_desc'),
    },
    {
      title: t('landing.philosophy.principle2_title'),
      description: t('landing.philosophy.principle2_desc'),
    },
    {
      title: t('landing.philosophy.principle3_title'),
      description: t('landing.philosophy.principle3_desc'),
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 bg-[#0f1419]">
      <div className="w-full max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">
            {t('landing.philosophy.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 text-justify">
            {t('landing.philosophy.subtitle')}
          </p>
        </div>

        {/* Principles */}
        <div className="space-y-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="pb-8 border-b border-gray-800 last:border-0"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {principle.title}
              </h3>
              <p className="text-base text-gray-300 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
