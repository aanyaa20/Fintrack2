import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

const Blogs = () => {
  const posts = [
    {
      title: "10 Tips for Better Budget Management",
      date: "January 15, 2025",
      excerpt: "Learn practical strategies to take control of your finances and achieve your savings goals with these expert tips.",
      readTime: "5 min read"
    },
    {
      title: "How AI is Revolutionizing Personal Finance",
      date: "January 8, 2025",
      excerpt: "Discover how artificial intelligence is making expense tracking easier and providing valuable insights into your spending habits.",
      readTime: "7 min read"
    },
    {
      title: "The Psychology of Spending: Understanding Your Money Habits",
      date: "December 28, 2024",
      excerpt: "Explore the emotional and psychological factors that influence our spending decisions and how to make better choices.",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1e2a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-8">
          <ArrowLeft className="size-5" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <FileText className="size-10 text-cyan-500" />
          <h1 className="text-4xl font-bold">Fintrack Blog</h1>
        </div>

        <p className="text-gray-300 mb-8">
          Expert insights, tips, and strategies for better financial management. Learn from our team and community.
        </p>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <article key={index} className="bg-[#0f1419] p-6 rounded-lg border border-gray-800 hover:border-cyan-500 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3 hover:text-cyan-500 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <a href="#" className="text-cyan-500 hover:text-cyan-400 font-medium inline-flex items-center gap-1">
                Read more →
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Want to stay updated with our latest posts?</p>
          <button className="px-6 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
