import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const FinalCTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 bg-[#1a1e2a]">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 sm:mb-6 px-4">
          {t('landing.cta.title')}
        </h2>
        <p className="text-lg text-gray-300 mb-10">
          {t('landing.cta.description')}
        </p>
        <Link
          to="/sign-up"
          className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors"
        >
          {t('landing.cta.create_account')}
          <ArrowRight className="ml-2 size-5" />
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;
