import { Link } from "react-router-dom";
import { ArrowLeft, Video, Calendar, Clock, Users, ExternalLink, Plus, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Webinar {
  id: number;
  title: string;
  description: string;
  speaker: string;
  date: Date;
  time: string;
  duration: string;
  meetLink: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  attendees: number;
  maxAttendees: number;
}

const Webinars = () => {
  const [isAdmin] = useState(true); // Set to true for admin access, false for regular users
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingWebinar, setEditingWebinar] = useState<Webinar | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    speaker: '',
    date: '',
    time: '',
    duration: '',
    meetLink: '',
    maxAttendees: 100
  });

  const [webinars, setWebinars] = useState<Webinar[]>([
    {
      id: 1,
      title: "Master Your Finances in 2024",
      description: "Learn advanced budgeting techniques and how to leverage AI-powered receipt scanning to streamline your expense tracking.",
      speaker: "Sarah Johnson - Financial Advisor",
      date: new Date('2024-02-15'),
      time: "2:00 PM EST",
      duration: "90 minutes",
      meetLink: "https://meet.google.com/abc-defg-hij",
      status: 'upcoming',
      attendees: 45,
      maxAttendees: 100
    },
    {
      id: 2,
      title: "Small Business Expense Management",
      description: "Discover strategies for separating business and personal expenses, tax preparation tips, and automation workflows.",
      speaker: "Michael Chen - CPA",
      date: new Date('2024-02-20'),
      time: "3:00 PM EST",
      duration: "60 minutes",
      meetLink: "https://meet.google.com/xyz-abcd-efg",
      status: 'upcoming',
      attendees: 32,
      maxAttendees: 75
    },
    {
      id: 3,
      title: "AI-Powered Receipt Scanning Deep Dive",
      description: "Explore how our Gemini AI integration works, best practices for capturing receipts, and troubleshooting common issues.",
      speaker: "Fintrack Team",
      date: new Date('2024-02-10'),
      time: "1:00 PM EST",
      duration: "45 minutes",
      meetLink: "https://meet.google.com/completed-webinar",
      status: 'completed',
      attendees: 89,
      maxAttendees: 100
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const webinarData: Webinar = {
      id: editingWebinar ? editingWebinar.id : webinars.length + 1,
      title: formData.title,
      description: formData.description,
      speaker: formData.speaker,
      date: new Date(formData.date),
      time: formData.time,
      duration: formData.duration,
      meetLink: formData.meetLink,
      status: 'upcoming',
      attendees: editingWebinar ? editingWebinar.attendees : 0,
      maxAttendees: formData.maxAttendees
    };

    if (editingWebinar) {
      setWebinars(webinars.map(w => w.id === editingWebinar.id ? webinarData : w));
      setEditingWebinar(null);
    } else {
      setWebinars([webinarData, ...webinars]);
    }

    setFormData({
      title: '',
      description: '',
      speaker: '',
      date: '',
      time: '',
      duration: '',
      meetLink: '',
      maxAttendees: 100
    });
    setShowAddForm(false);
  };

  const handleEdit = (webinar: Webinar) => {
    setEditingWebinar(webinar);
    setFormData({
      title: webinar.title,
      description: webinar.description,
      speaker: webinar.speaker,
      date: webinar.date.toISOString().split('T')[0],
      time: webinar.time,
      duration: webinar.duration,
      meetLink: webinar.meetLink,
      maxAttendees: webinar.maxAttendees
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this webinar?')) {
      setWebinars(webinars.filter(w => w.id !== id));
    }
  };

  const upcomingWebinars = webinars.filter(w => w.status === 'upcoming');
  const completedWebinars = webinars.filter(w => w.status === 'completed');

  return (
    <div className="min-h-screen bg-[#1a1e2a] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-8">
          <ArrowLeft className="size-5" />
          Back to Home
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Video className="size-10 text-green-500" />
            <h1 className="text-4xl font-bold">Webinars</h1>
          </div>
          
          {isAdmin && (
            <Button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingWebinar(null);
                setFormData({
                  title: '',
                  description: '',
                  speaker: '',
                  date: '',
                  time: '',
                  duration: '',
                  meetLink: '',
                  maxAttendees: 100
                });
              }}
              className="bg-green-500 hover:bg-green-400 text-gray-900 font-semibold"
            >
              <Plus className="size-5 mr-2" />
              Add Webinar
            </Button>
          )}
        </div>

        <p className="text-gray-300 mb-8">
          Join our live webinars to learn from experts, get tips and tricks, and connect with the Fintrack community.
        </p>

        {/* Add/Edit Webinar Form */}
        {isAdmin && showAddForm && (
          <div className="bg-[#0f1419] p-6 rounded-lg border border-gray-800 mb-8">
            <h3 className="text-xl font-semibold mb-4">
              {editingWebinar ? 'Edit Webinar' : 'Add New Webinar'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Speaker</label>
                  <input
                    type="text"
                    value={formData.speaker}
                    onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                    className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 2:00 PM EST"
                    className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 60 minutes"
                    className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Google Meet Link</label>
                  <input
                    type="url"
                    value={formData.meetLink}
                    onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                    placeholder="https://meet.google.com/..."
                    className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Attendees</label>
                  <input
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) => setFormData({ ...formData, maxAttendees: parseInt(e.target.value) })}
                    min="1"
                    className="w-full bg-[#1a1e2a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-green-500 hover:bg-green-400 text-gray-900 font-semibold">
                  {editingWebinar ? 'Update Webinar' : 'Create Webinar'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingWebinar(null);
                  }}
                  className="border border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Upcoming Webinars */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Webinars</h2>
          {upcomingWebinars.length === 0 ? (
            <div className="bg-[#0f1419] p-8 rounded-lg border border-gray-800 text-center">
              <p className="text-gray-400">No upcoming webinars scheduled. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingWebinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="bg-[#0f1419] p-6 rounded-lg border border-gray-800 hover:border-green-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">{webinar.title}</h3>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(webinar)}
                          className="text-blue-500 hover:text-blue-400 transition-colors"
                        >
                          <Edit className="size-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(webinar.id)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{webinar.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Video className="size-4 text-green-500" />
                      <span>{webinar.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="size-4 text-green-500" />
                      <span>{webinar.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock className="size-4 text-green-500" />
                      <span>{webinar.time} • {webinar.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="size-4 text-green-500" />
                      <span>{webinar.attendees}/{webinar.maxAttendees} registered</span>
                    </div>
                  </div>

                  <a
                    href={webinar.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-green-500 text-gray-900 font-semibold rounded-lg hover:bg-green-400 transition-colors"
                  >
                    <ExternalLink className="size-5" />
                    Join Webinar
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Webinars */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Past Webinars</h2>
          {completedWebinars.length === 0 ? (
            <div className="bg-[#0f1419] p-8 rounded-lg border border-gray-800 text-center">
              <p className="text-gray-400">No past webinars available.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {completedWebinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="bg-[#0f1419] p-6 rounded-lg border border-gray-800 opacity-75"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">{webinar.title}</h3>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(webinar.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{webinar.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Video className="size-4 text-gray-500" />
                      <span>{webinar.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="size-4 text-gray-500" />
                      <span>{webinar.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="size-4 text-gray-500" />
                      <span>{webinar.attendees} attended</span>
                    </div>
                  </div>

                  <span className="inline-block px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Webinars;
