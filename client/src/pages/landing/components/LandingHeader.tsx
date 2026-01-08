import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GalleryVerticalEnd, Search, X } from "lucide-react";
import { LandingLanguageSelector } from "./LandingLanguageSelector";
import { useTranslation } from "react-i18next";

const LandingHeader = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Define searchable sections
  const sections = [
    { id: "features", keywords: ["features", "expense tracking", "ai insights", "analytics", "dashboard"] },
    { id: "how-it-works", keywords: ["how it works", "getting started", "account", "transactions", "ai receipt"] },
    { id: "partner", keywords: ["partner", "partnership", "become partner", "collaborate"] },
    { id: "resources", keywords: ["resources", "help", "faq", "blog", "webinar", "guide", "forum"] },
    { id: "footer", keywords: ["contact", "email", "support", "about"] }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (value.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const query = value.toLowerCase();
    const matches = sections.filter(section => 
      section.keywords.some(keyword => keyword.includes(query))
    ).map(section => section.id);

    setSearchResults(matches);
    setShowResults(true);
  };

  const handleResultClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSearchTerm("");
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

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
            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white h-8 w-8 rounded flex items-center justify-center">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="font-semibold text-base sm:text-lg text-white">
              FinEnsure
            </span>
          </Link>

          {/* Right Side - Search + Navigation + Language + CTA */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
                className="w-32 md:w-48 lg:w-64 px-4 py-1.5 bg-[#0f1419] border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <X className="size-4" />
                </button>
              )}
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
              
              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute top-full mt-2 w-full bg-[#0f1419] border border-gray-700 rounded-md shadow-lg max-h-64 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((result) => (
                        <button
                          key={result}
                          onClick={() => handleResultClick(result)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors capitalize"
                        >
                          {result.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
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

            <LandingLanguageSelector />
            
            <Link
              to="/sign-up"
              className="px-3 sm:px-5 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs sm:text-sm font-medium rounded-md hover:from-teal-600 hover:to-cyan-600 transition-colors whitespace-nowrap shadow-lg shadow-teal-500/20"
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
