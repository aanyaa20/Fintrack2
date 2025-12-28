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
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0f1419]">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4">
            {t('landing.philosophy.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
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
