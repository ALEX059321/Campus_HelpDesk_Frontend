import React from 'react';
import { Phone, Mail, ShieldAlert, MapPin, User, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact_us = () => {
  const committeeMembers = [
    { name: "Dr. Aman Sharma", role: "Chairperson", phone: "+91 98765-43210", email: "chairperson.arc@campus.edu" },
    { name: "Prof. Sunita Verma", role: "Nodal Officer", phone: "+91 98765-43211", email: "nodal.officer@campus.edu" },
    { name: "Mr. Rajesh Kumar", role: "Chief Warden", phone: "+91 98765-43212", email: "warden.hostel@campus.edu" },
    { name: "Ms. Preeti Kaur", role: "Member Secretary", phone: "+91 98765-43213", email: "preeti.k@campus.edu" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-full mb-4">
          <ShieldAlert size={32} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Anti-Ragging Cell</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Our campus maintains a zero-tolerance policy towards ragging. If you or someone you know is in distress, reach out immediately.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Emergency Helplines */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg border border-red-700">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Clock className="mr-2" size={20} /> 24/7 Emergency
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-red-100 text-sm">National Helpline (Toll-Free)</p>
                <p className="text-2xl font-black tracking-wider">1800-180-5522</p>
              </div>
              <hr className="border-red-500" />
              <div>
                <p className="text-red-100 text-sm">Campus Security Desk</p>
                <p className="text-2xl font-black tracking-wider">01672-278528</p>
                <p className="text-2xl font-black tracking-wider">bggi.admission@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2 text-blue-600" size={18} /> Office Location
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
             Bhai Gurdas Group of Institutions, Main Patiala Road, Sangrur, Pin 148001
            </p>
          </div>
        </div>

        {/* Right Column: Committee Contacts */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Committee Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {committeeMembers.map((member, index) => (
              <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{member.name}</h4>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{member.role}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Phone size={16} className="mr-3 text-gray-400" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Mail size={16} className="mr-3 text-gray-400" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>

              
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Contact_us;