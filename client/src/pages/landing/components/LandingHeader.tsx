import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";

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
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-slate-900 text-white h-8 w-8 rounded flex items-center justify-center">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="font-semibold text-lg text-slate-900">
              FinTrak
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#product"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Product
            </a>
            <a
              href="#features"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#security"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Security
            </a>
            <a
              href="#pricing"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Pricing
            </a>
          </div>

          {/* CTA Button */}
          <Link
            to="/sign-up"
            className="px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LandingHeader;
