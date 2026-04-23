import React from 'react'

const Footer = () => {
  return (
   
   <div>
      <footer className="bg-[#1a1711] text-[#fdf9f0] px-8 md:px-16 pt-20 pb-10 font-sans">
  <div className="max-w-7xl mx-auto">
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Common Topics</h3>
        <ul className="space-y-3 text-sm font-light">
          <li><a href="#" className="hover:underline">Getting started</a></li>
          <li><a href="#" className="hover:underline">Ticket guides</a></li>
          <li><a href="#" className="hover:underline">Best practices and how-tos</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Role-based Guides</h3>
        <ul className="space-y-3 text-sm font-light">
          <li><a href="#" className="hover:underline">Agent guide</a></li>
          <li><a href="#" className="hover:underline">Staff guides</a></li>
          <li><a href="#" className="hover:underline">Admin guide</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Additional Resources</h3>
        <ul className="space-y-3 text-sm font-light">
          <li><a href="#" className="hover:underline">Video</a></li>
          <li><a href="#" className="hover:underline">Campus overview</a></li>
          <li><a href="#" className="hover:underline">social media</a></li>
          <li><a href="#" className="hover:underline">Campus updates</a></li>
          <li><a href="#" className="hover:underline">Policies and programs</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-700/50 pt-8 pb-4">
      <h1 className="text-[15vw] md:text-[12vw] font-bold leading-none tracking-tighter text-center">
        HelpDesk
      </h1>
    </div>

    <div className="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-gray-400">
      <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
            <span>© campushelp 2026</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-white flex items-center justify-center rounded-sm">
           <span className="text-black font-bold text-[10px]">C</span>
        </div>
        <span className="hover:text-white cursor-default">Powered by Campus Helpdesk</span>
      </div>
    </div>

  </div>
</footer>
    </div>
  )
}

export default Footer
