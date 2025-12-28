import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GalleryVerticalEnd, Search } from "lucide-react";
import { LanguageSelector } from "@/components/navbar/language-selector";
import { useTranslation } from "react-i18next";

const LandingHeader = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1a1e2a]/95 backdrop-blur-sm shadow-sm"
          : "bg-[#1a1e2a]"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-20">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-green-500 text-white h-8 w-8 rounded flex items-center justify-center">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="font-semibold text-base sm:text-lg text-white">
              Fintrack
            </span>
          </Link>

          {/* Right Side - Search + Navigation + Language + CTA */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-32 md:w-48 lg:w-64 px-4 py-1.5 bg-[#0f1419] border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            </div>

            {/* Mobile Search Icon */}
            <button className="sm:hidden p-2 text-gray-300 hover:text-white">
              <Search className="size-5" />
            </button>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <a
                href="#features"
                className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
              >
                {t('landing.header.features')}
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
              >
                {t('landing.header.how_it_works')}
              </a>
              <a
                href="#partner"
                className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
              >
                Partner
              </a>
              <a
                href="#resources"
                className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
              >
                Resources
              </a>
            </div>

            <LanguageSelector />
            
            <Link
              to="/sign-up"
              className="px-3 sm:px-5 py-2 bg-green-500 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-green-600 transition-colors whitespace-nowrap"
            >
              {t('landing.header.get_started')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default LandingHeader;
