const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Sign up in seconds. Set your preferred currency and financial tracking preferences.",
      image: "/assets/landing/step-signup.png",
    },
    {
      number: "02",
      title: "Record Transactions",
      description:
        "Add income and expenses manually or scan receipts. Categorize transactions for organized records.",
      image: "/assets/landing/step-record.png",
    },
    {
      number: "03",
      title: "Track and Analyze",
      description:
        "View spending breakdowns, track patterns, and generate reports. Make informed financial decisions.",
      image: "/assets/landing/step-analyze.png",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            How FinTrak Works
          </h2>
          <p className="text-lg text-slate-600">
            Start tracking your finances in three straightforward steps.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Step Number and Content */}
              <div>
                <div className="text-6xl font-bold text-slate-200 mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step Visual */}
              <div>
                <div className="relative rounded-lg border border-slate-200 overflow-hidden shadow-md bg-white">
                  <div className="aspect-[16/10] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                    <img
                      src={step.image}
                      alt={`Step ${step.number}: ${step.title}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='800' height='500' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter, system-ui' font-size='16' fill='%2364748b'%3EStep ${step.number}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
