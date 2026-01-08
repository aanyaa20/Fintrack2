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
    {
      number: "04",
      title: "AI-Powered Receipt Scanning",
      description: "Simply snap a photo of your receipt and let our AI extract transaction details automatically. Save time with intelligent data capture.",
    },
    {
      number: "05",
      title: "Set Recurring Transactions",
      description: "Automate regular income and expenses with recurring transactions. Set frequencies and let FinEnsure handle the rest for effortless tracking.",
    },
    {
      number: "06",
      title: "Generate Custom Reports",
      description: "Create detailed financial reports with AI-powered insights. Schedule automated email reports to stay informed about your finances.",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 bg-[#1a1e2a]">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">
            {t('landing.how_it_works.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            {t('landing.how_it_works.subtitle')}
          </p>
        </div>

        {/* Steps - 2 Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-cyan-500 transition-all duration-300"
            >
              {/* Step Number and Content */}
              <div>
                <div className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
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

