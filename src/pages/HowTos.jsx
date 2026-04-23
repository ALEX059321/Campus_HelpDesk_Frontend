import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Info } from 'lucide-react';

const HowTos = () => {
  const [openArticle, setOpenArticle] = useState(0);

  const articles = [
    {
      title: "How to Create an Account",
      content: (
        <div className="space-y-4 text-slate-700">
          <p>Welcome to Campus Helpdesk! Setting up your account is fast and easy.</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Navigate to the homepage and click on the <strong>Register</strong> or <strong>Sign Up</strong> button in the navigation bar.</li>
            <li>Fill in your details including your Name, University Email, and create a secure password.</li>
            <li>Click submit. Your account is immediately created and you will be redirected to the login page.</li>
            <li>Use your new credentials to log in to your dashboard.</li>
          </ol>
        </div>
      )
    },
    {
      title: "How to Use This Site",
      content: (
        <div className="space-y-4 text-slate-700">
          <p>The Campus Helpdesk is designed to be your central hub for all campus-related queries.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Raise Ticket:</strong> Use this feature to report maintenance, IT, or administrative issues.</li>
            <li><strong>My Tickets:</strong> Track the status and progress of all your submitted issues here.</li>
            <li><strong>Anti-Ragging Cell:</strong> A highly confidential area to report sensitive incidents directly to higher administration.</li>
            <li><strong>Suggestions:</strong> Share your ideas on how to improve campus life.</li>
          </ul>
        </div>
      )
    },
    {
      title: "How to Raise a Ticket",
      content: (
        <div className="space-y-4 text-slate-700">
          <p>Encountered a broken projector or a WiFi issue? Here is how to let the administration know:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Ensure you are logged into your account.</li>
            <li>From the dashboard, click on the <strong>Raise Ticket</strong> card.</li>
            <li>Enter a brief, descriptive Title for your issue.</li>
            <li>Select the relevant Category (e.g., IT, Maintenance, Academics) so it reaches the right department.</li>
            <li>Provide detailed information in the Description box.</li>
            <li>Submit the ticket. You will receive an on-screen confirmation!</li>
          </ol>
        </div>
      )
    },
    {
      title: "How Requests are Resolved by Admins",
      content: (
        <div className="space-y-4 text-slate-700">
          <p>Once you submit a ticket, here is what happens behind the scenes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Status 'Pending':</strong> Your ticket is in the queue and waiting to be assigned to the relevant department staff.</li>
            <li><strong>Status 'In Progress':</strong> An admin has viewed your ticket and staff is actively working on resolving the issue.</li>
            <li><strong>Status 'Resolved':</strong> The issue has been fixed! Admins will close the ticket, but you can always view it in your <em>My Tickets</em> history.</li>
          </ul>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4 flex gap-3">
            <Info className="text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-800">Note: Resolution times vary depending on the category and urgency of the issue.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">How-To Guides & Articles</h1>
          <p className="text-lg text-slate-600">Everything you need to know about navigating the Campus Helpdesk.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          {articles.map((article, index) => (
            <div key={index} className="border-b border-stone-100 last:border-0">
              <button 
                onClick={() => setOpenArticle(openArticle === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-stone-50 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle className={`w-6 h-6 ${openArticle === index ? 'text-blue-600' : 'text-stone-400'}`} />
                  <h2 className={`text-xl font-bold ${openArticle === index ? 'text-blue-700' : 'text-slate-800'}`}>
                    {article.title}
                  </h2>
                </div>
                {openArticle === index ? (
                  <ChevronUp className="text-stone-500 w-6 h-6" />
                ) : (
                  <ChevronDown className="text-stone-400 w-6 h-6" />
                )}
              </button>
              
              {openArticle === index && (
                <div className="px-8 pb-8 pl-18 bg-stone-50/30">
                  <div className="pt-2 border-t border-stone-100 mt-4">
                    {article.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HowTos;
