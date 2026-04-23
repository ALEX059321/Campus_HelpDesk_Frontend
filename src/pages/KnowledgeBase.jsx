import React, { useState } from 'react';
import { Search, BookOpen, Wifi, Coffee, GraduationCap, ShieldCheck, ChevronDown, ChevronUp, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';

const KnowledgeBase = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { title: "Academics", icon: <GraduationCap size={24} />, count: "12 Articles", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Hostel Life", icon: <Coffee size={24} />, count: "8 Articles", color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Wi-Fi & IT", icon: <Wifi size={24} />, count: "5 Articles", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Safety & Rules", icon: <ShieldCheck size={24} />, count: "10 Articles", color: "text-green-600", bg: "bg-green-50" },
  ];

  const faqs = [
    { 
      q: "How do I reset my student portal password?", 
      a: "Go to the login page, click 'Forgot Password,' and enter your university email. A reset link will be sent to you within 5 minutes." 
    },
    { 
      q: "What is the procedure for reporting ragging?", 
      a: "You can use the 'Anti-Ragging Cell' contact page or click the 'Report Anonymously' button. Your identity will be protected." 
    },
    { 
      q: "How can I apply for a hostel leave?", 
      a: "Log into the Campus App, go to the 'Hostel' section, and fill out the 'Out-Pass' form at least 24 hours before your departure." 
    },
    { 
      q: "Where can I find the semester exam timetable?", 
      a: "Timetables are posted under the 'Downloads' section of the Academic tab 15 days before exams begin." 
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Search Section */}
      <div className=" bg-gray-200 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">How can we help you today?</h1>
        <p className="text-blue-100 mb-8">Search for articles, guides, and campus protocols</p>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for 'Wi-Fi setup', 'Library hours'..." 
            className="w-full py-4 pl-12 pr-4 rounded-xl text-gray-900 focus:outline-none shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 -mt-12">
          {categories.map((cat, index) => (
            <Link to="/HowTos" key={index}>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:scale-105 transition-transform cursor-pointer group h-full">
                <div className={`w-12 h-12 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg">{cat.title}</h3>
                <p className="text-gray-500 text-sm">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <BookOpen className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.filter(faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase())).map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                >
                  <span className="font-semibold text-gray-700">{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === index && (
                  <div className="p-5 pt-0 text-gray-600 border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
            {faqs.filter(faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
              <div className="text-center text-gray-500 py-8 bg-white border border-gray-200 rounded-xl">
                No results found for "{searchQuery}". Try a different keyword!
              </div>
            )}
          </div>
        </div>

        {/* Support CTA */}
        <div className="mt-16 bg-white p-10 rounded-3xl border border-dashed border-gray-300 text-center">
          <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LifeBuoy size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Still can't find an answer?</h2>
          <p className="text-gray-500 mb-6">Our support team is online from 9:00 AM to 5:00 PM.</p>
          <Link to="/Create_Ticket">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
              Raise a Ticket
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;