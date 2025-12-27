const Features = () => {
  const features = [
    {
      title: "Structured Transaction Records",
      description:
        "Maintain organized financial records with categorized income and expenses. Clear data structure for easy reference.",
      image: "/assets/landing/feature-transactions.png",
      imageAlt: "Transaction recording interface",
    },
    {
      title: "Spending Pattern Analysis",
      description:
        "Understand where your money goes with visual breakdowns and category-based analytics. Identify trends over time.",
      image: "/assets/landing/feature-analytics.png",
      imageAlt: "Analytics dashboard showing spending patterns",
    },
    {
      title: "Financial Reports",
      description:
        "Generate clear monthly and custom reports. Export data for record-keeping or share with financial advisors.",
      image: "/assets/landing/feature-reports.png",
      imageAlt: "Financial report generation",
    },
    {
      title: "AI Receipt Scanning",
      description:
        "Upload receipts and extract transaction details automatically. Save time on manual data entry.",
      image: "/assets/landing/feature-receipt.png",
      imageAlt: "Receipt scanning feature",
    },
  ];

  return (
    <section id="features" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3 sm:mb-4">
            Core Capabilities
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Essential tools for managing your financial data with precision and
            clarity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-16 sm:space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text Content */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Feature Image */}
              <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                <div className="relative rounded-lg border border-slate-200 overflow-hidden shadow-md bg-white">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                    <img
                      src={feature.image}
                      alt={feature.imageAlt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter, system-ui' font-size='16' fill='%2364748b'%3E${feature.imageAlt}%3C/text%3E%3C/svg%3E`;
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

export default Features;
