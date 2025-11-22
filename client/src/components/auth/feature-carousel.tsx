import { useState, useEffect } from "react";
import { Scan, Mail, Shield } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Multi-Platform Login",
    description: "Sign in seamlessly with Google, GitHub, or Microsoft. Your choice, your security.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Scan,
    title: "AI-Powered Receipt Scanning",
    description: "Snap a photo, let AI do the rest. Automatic expense tracking powered by Google Gemini Vision.",
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    icon: Mail,
    title: "Smart Email Reports",
    description: "Get personalized financial insights delivered weekly, bi-weekly, or monthly—straight to your inbox.",
    gradient: "from-green-500/20 to-cyan-500/20",
  },
];

export const FeatureCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const feature = features[currentSlide];
  const Icon = feature.icon;

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg w-full">
        <div
          className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-2xl p-8 border border-primary/20 transition-all duration-700 ease-in-out`}
          key={currentSlide}
        >
          <div className="mb-6 inline-block p-4 bg-primary/20 rounded-xl">
            <Icon className="w-12 h-12 text-primary" />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-4">
            {feature.title}
          </h3>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-8 justify-center">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
