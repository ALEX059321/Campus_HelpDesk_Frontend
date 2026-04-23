import React, { useState } from 'react';
import { Mail, Phone, MapPin, Search } from 'lucide-react';

const ContactSupport = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const administrators = [
    {
      name: "Dr. Robert Langdon",
      position: "Chief Campus Administrator",
      department: "Central Administration",
      email: "robert.l@campus.edu",
      phone: "+1 (555) 123-4567",
      office: "Main Block, Room 101",
      image: "https://i.pravatar.cc/150?img=11"
    },
    {
      name: "Sarah Jenkins",
      position: "Head of IT Support",
      department: "Information Technology",
      email: "s.jenkins@campus.edu",
      phone: "+1 (555) 987-6543",
      office: "Tech Center, Floor 2",
      image: "https://i.pravatar.cc/150?img=47"
    },
    {
      name: "Michael Chang",
      position: "Facilities & Maintenance Director",
      department: "Infrastructure",
      email: "m.chang@campus.edu",
      phone: "+1 (555) 456-7890",
      office: "Maintenance Wing, Block B",
      image: "https://i.pravatar.cc/150?img=33"
    },
    {
      name: "Dr. Emily Watson",
      position: "Student Welfare Officer",
      department: "Student Affairs",
      email: "emily.w@campus.edu",
      phone: "+1 (555) 789-0123",
      office: "Student Center, Room 204",
      image: "https://i.pravatar.cc/150?img=44"
    },
    {
      name: "David Miller",
      position: "Helpdesk Coordinator",
      department: "General Support",
      email: "helpdesk@campus.edu",
      phone: "+1 (555) 000-1111",
      office: "Library Ground Floor",
      image: "https://i.pravatar.cc/150?img=12"
    }
  ];

  const filteredAdmins = administrators.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    admin.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fdfaf3] py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-slate-900 mb-4">Contact Administration</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Need direct assistance? Reach out to our campus administrative heads and department directors.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-transparent focus:border-blue-500 shadow-md bg-white text-gray-900 focus:outline-none transition-all duration-300"
            placeholder="Search by name, department, or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Admin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-lg transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">{admin.name}</h2>
                      <p className="text-sm font-medium text-blue-600">{admin.position}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                        <MapPin size={16} className="text-slate-500" />
                      </div>
                      <span className="text-sm font-medium">{admin.department} - {admin.office}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-slate-600 group-hover:text-slate-900 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                        <Phone size={16} className="text-slate-500" />
                      </div>
                      <span className="text-sm font-medium">{admin.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-slate-600 group-hover:text-blue-600 transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                        <Mail size={16} className="text-slate-500" />
                      </div>
                      <span className="text-sm font-medium truncate">{admin.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No administrators found</h3>
              <p className="text-slate-500">Try adjusting your search terms.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactSupport;
