const Philosophy = () => {
  const principles = [
    {
      title: "Clarity over complexity",
      description:
        "We focus on presenting your financial data in a way that's easy to understand. No confusing jargon or overwhelming interfaces.",
    },
    {
      title: "Practical insights over noisy dashboards",
      description:
        "Our analytics show you what matters: spending patterns, category breakdowns, and trends that help you make decisions.",
    },
    {
      title: "User control over automation",
      description:
        "You decide how to categorize and track your finances. FinTrak supports your workflow, not the other way around.",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            Product Philosophy
          </h2>
          <p className="text-lg text-slate-600">
            FinTrak is built on principles that prioritize your needs and
            respect your time.
          </p>
        </div>

        {/* Principles */}
        <div className="space-y-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="pb-8 border-b border-slate-200 last:border-0"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {principle.title}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
