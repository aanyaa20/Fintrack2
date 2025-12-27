import { Shield, Lock, CheckCircle2 } from "lucide-react";

const TrustSection = () => {
  const trustPoints = [
    {
      icon: Shield,
      title: "Privacy-first by design",
      description: "Your financial data stays yours. No third-party tracking.",
    },
    {
      icon: Lock,
      title: "Built with secure architecture",
      description: "Bank-grade encryption and secure data storage practices.",
    },
    {
      icon: CheckCircle2,
      title: "Designed for reliability",
      description: "Consistent performance and accurate financial tracking.",
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className="flex flex-col items-start">
                <div className="mb-4 p-2.5 bg-slate-900 rounded-md">
                  <Icon className="size-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
