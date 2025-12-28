import { BookOpen, HelpCircle, Video, Sparkles, FileText, Users, MessageCircle, Lightbulb, Mail } from "lucide-react";

const Resources = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:arjunbrt1303@gmail.com?subject=Fintrack Inquiry";
  };

  const resources = [
    {
      icon: BookOpen,
      title: "Help Documents",
      description: "Stuck at some point using Fintrack? Our detailed help documents will get you out of any sticky situation.",
      action: "View the help docs",
      onClick: () => window.location.href = '/resources/help-docs'
    },
    {
      icon: HelpCircle,
      title: "FAQs",
      description: "We strive to leave no question unanswered. Find answers to all the frequently asked questions about Fintrack.",
      action: "Check out the FAQs",
      onClick: () => window.location.href = '/resources/faqs'
    },
    {
      icon: Video,
      title: "Webinars",
      description: "Join our weekly webinars every Tuesday at 6 PM IST. See a walkthrough of the product and get your questions answered.",
      action: "Join next webinar",
      onClick: () => window.location.href = '/resources/webinars'
    },
    {
      icon: Sparkles,
      title: "What's New",
      description: "View a timeline of all the latest updates and new features added to Fintrack.",
      action: "See what's new",
      onClick: () => window.location.href = '/resources/whats-new'
    },
    {
      icon: FileText,
      title: "Blogs",
      description: "Keep up with the latest developments and features. Get useful tips and tricks to make your expense tracking better.",
      action: "Access blogs",
      onClick: () => window.location.href = '/resources/blogs'
    },
    {
      icon: Users,
      title: "Business Guides",
      description: "Get useful information on how you can manage your finances and control your spending with our complete business guides.",
      action: "View guides",
      onClick: () => window.location.href = '/resources/guides'
    },
    {
      icon: MessageCircle,
      title: "Forums",
      description: "Get in touch with the Fintrack community and participate in discussions about the product and its features.",
      action: "Access forums",
      onClick: () => window.location.href = '/resources/forums'
    },
    {
      icon: Lightbulb,
      title: "Request a feature",
      description: "We are constantly working on expanding Fintrack's capabilities. If you'd like to see a feature in our product, let us know.",
      action: "Request",
      onClick: () => { window.location.href = '#footer'; }
    },
    {
      icon: Mail,
      title: "Send us an email",
      description: "Write to us and we'll get back to you.",
      action: "Contact Us",
      onClick: handleEmailClick
    }
  ];

  return (
    <section id="resources" className="w-full py-20 px-6 sm:px-12 lg:px-20 bg-[#1a1e2a]">
      <div className="w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            All the resources you need
          </h2>
          <p className="text-lg text-gray-300">
            What are you looking for?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-[#0f1419] rounded-lg border border-gray-800 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer"
                onClick={resource.onClick}
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <Icon className="size-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {resource.description}
                </p>
                <button className="text-green-500 font-medium text-sm hover:text-green-400 transition-colors flex items-center gap-1">
                  {resource.action}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Resources;
