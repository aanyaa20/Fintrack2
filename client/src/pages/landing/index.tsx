import LandingHeader from "./components/LandingHeader";
import Hero from "./components/Hero";
import TrustSection from "./components/TrustSection";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Philosophy from "./components/Philosophy";
import FinalCTA from "./components/FinalCTA";
import LandingFooter from "./components/LandingFooter";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <LandingHeader />
      <main className="w-full">
        <Hero />
        <TrustSection />
        <Features />
        <HowItWorks />
        <Philosophy />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
