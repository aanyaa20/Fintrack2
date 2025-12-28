import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      number: "01",
      title: t('landing.how_it_works.step1_title'),
      description: t('landing.how_it_works.step1_desc'),
    },
    {
      number: "02",
      title: t('landing.how_it_works.step2_title'),
      description: t('landing.how_it_works.step2_desc'),
    },
    {
      number: "03",
      title: t('landing.how_it_works.step3_title'),
      description: t('landing.how_it_works.step3_desc'),
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1e2a]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4">
            {t('landing.how_it_works.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            {t('landing.how_it_works.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col gap-4"
            >
              {/* Step Number and Content */}
              <div>
                <div className="text-6xl font-bold text-gray-800 mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
