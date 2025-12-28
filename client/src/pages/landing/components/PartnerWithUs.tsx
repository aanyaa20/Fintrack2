import { Handshake, Building2, TrendingUp, Globe, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const PartnerWithUs = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Building2,
      title: "Small Enterprises Welcome",
      description: "We're open to partnering with small enterprises building web services in finance"
    },
    {
      icon: TrendingUp,
      title: "Revenue Streams",
      description: "Create additional revenue streams by integrating our powerful finance tracking solution"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Join a partner program trusted in over 150 countries worldwide"
    }
  ];

  return (
    <section id="partner" className="w-full py-20 px-6 sm:px-12 lg:px-20 bg-[#0f1419]">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full mb-6">
              <Handshake className="size-5 text-green-500" />
              <span className="text-green-500 font-medium">Partner Program</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Partner with Fintrack
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Sell powerful, intuitive expense management software trusted by businesses worldwide. 
              Add value to your services, create additional revenue streams, and expand your clientele 
              by joining our dedicated partner program.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-[#1a1e2a] rounded-lg border border-gray-800">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-gray-400 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors">
                Become a partner
                <ArrowRight className="ml-2 size-4" />
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-md hover:bg-gray-800 transition-colors">
                Contact us
              </button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 p-8 lg:p-12 border border-green-500/30">
              <div className="h-full flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Handshake className="size-10 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Who can partner with us?</h3>
                  <p className="text-gray-300">
                    Fintrack is designed to solve diversified use cases across industries, 
                    irrespective of business size. Professionals in sectors ranging from 
                    accounting and finance to IT and travel can partner with Fintrack.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="p-4 bg-[#0f1419]/50 rounded-lg border border-gray-700">
                    <p className="text-green-500 font-semibold">Finance</p>
                  </div>
                  <div className="p-4 bg-[#0f1419]/50 rounded-lg border border-gray-700">
                    <p className="text-green-500 font-semibold">IT Services</p>
                  </div>
                  <div className="p-4 bg-[#0f1419]/50 rounded-lg border border-gray-700">
                    <p className="text-green-500 font-semibold">Accounting</p>
                  </div>
                  <div className="p-4 bg-[#0f1419]/50 rounded-lg border border-gray-700">
                    <p className="text-green-500 font-semibold">Travel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerWithUs;
