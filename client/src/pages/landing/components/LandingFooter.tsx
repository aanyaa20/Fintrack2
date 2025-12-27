import { GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  return (
    <footer className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="bg-green-500 text-white h-8 w-8 rounded flex items-center justify-center">
                <GalleryVerticalEnd className="size-5" />
              </div>
              <span className="font-semibold text-lg text-slate-900">
                Fintrack
              </span>
            </Link>
            <p className="text-sm text-slate-600">
              Financial tracking designed for clarity and control.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#privacy"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-600 text-center">
            © {new Date().getFullYear()} FinTrak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
