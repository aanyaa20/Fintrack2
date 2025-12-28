import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";
import { LanguageSelector } from "@/components/navbar/language-selector";

const LandingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-green-500 text-white h-8 w-8 rounded flex items-center justify-center">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="font-semibold text-lg text-white">
              Fintrack
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#product"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Product
            </a>
            <a
              href="#features"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a
              href="#security"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Security
            </a>
            <a
              href="#pricing"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
          </div>

          {/* Right Side - Language + CTA */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Link
              to="/sign-up"
              className="px-5 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default LandingHeader;
