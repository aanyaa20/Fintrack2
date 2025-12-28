import { GalleryVerticalEnd, Mail, Phone, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LandingFooter = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#1a1e2a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="bg-green-500 text-white h-8 w-8 rounded flex items-center justify-center">
                <GalleryVerticalEnd className="size-5" />
              </div>
              <span className="font-semibold text-lg text-white">
                Fintrack
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              {t('landing.footer.tagline')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              {t('landing.footer.product_title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/sign-in"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t('landing.footer.web_app')}
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t('landing.footer.features')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              {t('landing.footer.contact_title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:+919837985367"
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  9837985367
                </a>
              </li>
              <li>
                <a
                  href="mailto:arjunbrt1303@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  arjunbrt1303@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/arjunbrt1303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Fintrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
