import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { title: "How to Create an Account", link: "/HowTos" },
    { title: "How to Use This Site", link: "/HowTos" },
    { title: "How to Raise a Ticket", link: "/HowTos" },
    { title: "How Requests are Resolved", link: "/HowTos" },
    { title: "Report Ragging", link: "/ReportIncident" },
    { title: "View My Tickets", link: "/MyTickets" }
  ];

  const filteredFaqs = faqs.filter(faq => 
    searchQuery && faq.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <div className='Container font-bold text-slate-900 py-20 bg-gray-200'>
        <div className="Hero text-center text-5xl font-bold text-slate-900 py-20 bg-gray-200">
          <h1>WELCOME TO THE CAMPUS HELP DESK</h1>
          <div className='text-2xl mt-4 text-gray-700'>Your one-stop solution for all campus-related queries and support.</div>
        </div>
 
  <div className='Search mx-auto mb-12 relative w-[90%] md:w-[650px]'> 
    <div className="form relative">
      <input 
        className="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none w-full focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md" 
        placeholder="Search frequently asked questions..." 
        type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button 
        type="button" 
        onClick={() => setSearchQuery('')}
        className={`absolute right-4 -translate-y-1/2 top-1/2 p-1 ${searchQuery ? 'block' : 'hidden'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    {/* Search Results Dropdown */}
    {searchQuery && (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
        {filteredFaqs.length > 0 ? (
          <ul className="py-2">
            {filteredFaqs.map((faq, index) => (
              <li key={index}>
                <Link 
                  to={faq.link} 
                  className="block px-6 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {faq.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-4 text-gray-500 text-center">
            No matching questions found.
          </div>
        )}
      </div>
    )}
  </div>
</div>
<div className='mt-16 px-6 md:px-0 md:max-w-7xl md:mx-auto'><p>ESSENTIALS</p></div>
<div className="list border-t border-black my-2 w-[90%] md:max-w-7xl m-auto">
</div>

<div className="bg-[#fdfaf3] py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 max-w-7xl mx-auto">
    
    {/* Card 1 */}
    <Link to="/Create_Ticket" className="flex"> 
      <div className="flex flex-col items-center text-center p-10 bg-[#f4f0e6] border-b border-black transition-all hover:bg-[#ece7da] w-full h-full">
        <div className="mb-6 h-40 flex items-center justify-center">
          <img src="/assets/image_1.png" alt="Product guides" className="h-full object-contain" />
        </div>
        <h3 className="font-serif text-3xl text-gray-900 mb-4">
          Raise Ticket
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Raise a concern/suggestion about your issue here!!
        </p>
      </div>
    </Link>

    {/* Card 2 */}
    <Link to="/MyTickets" className="flex">       
      <div className="flex flex-col items-center text-center p-10 bg-[#f4f0e6] border-b border-black transition-all hover:bg-[#ece7da] w-full h-full">
        <div className="mb-6 h-40 flex items-center justify-center">
          <img src="/assets/image_2.png" alt="Product guides" className="h-full object-contain" />
        </div>
        <h3 className="font-serif text-3xl text-gray-900 mb-4">
          My Tickets
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Track your existing registered issues/tickets here!!
        </p>
      </div>
    </Link>

    {/* Card 3 */}
    <Link to="/Knowledge" className="flex">
      <div className="flex flex-col items-center text-center p-10 bg-[#f4f0e6] border-b border-black transition-all hover:bg-[#ece7da] w-full h-full">
        <div className="mb-6 h-40 flex items-center justify-center">
          <img src="/assets/image_5.png" alt="Product guides" className="h-full object-contain" />
        </div>
        <h3 className="font-serif text-3xl text-gray-900 mb-4">
          Self-Service
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Search FAQs and "How-to" guides!!
        </p>
      </div>
    </Link>
   
    {/* Card 4 */}
    <Link to="/SuggestionForm" className="flex">
      <div className="flex flex-col items-center text-center p-10 bg-[#f4f0e6] border-b border-black transition-all hover:bg-[#ece7da] w-full h-full">
        <div className="mb-6 h-40 flex items-center justify-center">
          <img src="/assets/image_6.png" alt="Product guides" className="h-full object-contain" />
        </div>
        <h3 className="font-serif text-3xl text-gray-900 mb-4">
          Suggestions
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Share your feedback and suggestions!!
        </p>
      </div>
    </Link>
    
    {/* Card 5 */}
    <Link to="/ContactSupport" className="flex">
      <div className="flex flex-col items-center text-center p-10 bg-[#f4f0e6] border-b border-black transition-all hover:bg-[#ece7da] w-full h-full">
        <div className="mb-6 h-40 flex items-center justify-center">
          <img src="/assets/image_3.png" alt="Product guides" className="h-full object-contain" />
        </div>
        <h3 className="font-serif text-3xl text-gray-900 mb-4">
          Contact Support
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Direct Contact To The Administrations!!
        </p>
      </div>
    </Link>
    
    {/* Card 6 */}
    <div className="flex flex-col items-center text-center p-10 bg-[#f4f0e6] border-b border-black transition-all hover:bg-[#ece7da] w-full h-full">
      <div className="mb-6 h-40 flex items-center justify-center">
        <img src="/assets/image_7.png" alt="Product guides" className="h-full object-contain" />
      </div>
      <h3 className="font-serif text-3xl text-gray-900 mb-4">
        Anti-Ragging Cell
      </h3>
      <Link to="/ReportIncident" className="w-full">
        <div className="buttons border-2 border-black hover:bg-yellow-200 p-2 rounded-lg w-full mb-2">
          <button className="w-full">REPORT INCIDENT<i className="fa-solid fa-triangle-exclamation ml-2" /></button>
        </div>
      </Link>
      <Link to="/Contact_us" className="w-full">
        <div className="buttons border-2 border-black hover:bg-yellow-200 p-2 rounded-lg w-full">
          <button className="w-full">CONTACT US NOW<i className="fa-solid fa-phone ml-2" /></button>
        </div>
      </Link> 
      <p className="text-gray-700 leading-relaxed mt-4">
        Report Incident and 24/7 Support
      </p>
    </div>
  </div>
</div>
    </div>
  );
};

export default Hero;
