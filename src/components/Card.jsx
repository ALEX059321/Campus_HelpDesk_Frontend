
  import React from 'react'
  import { Link } from 'react-router-dom'
  const Card = () => {
  return (
  <div>
    <Link to = "/Card"> 
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-[#fdfaf3]">
      <div className="flex flex-col items-center text-center p-10 bg-[#f4f0e6] border-b border-black transition-all hover:bg-[#ece7da]">
        <div className="mb-6 h-24 w-24 flex items-center justify-center">
          <img src="path-to-your-icon.png" alt="Product guides" className="h-full object-contain" />
        </div>
        <h3 className="font-serif text-3xl text-gray-900 mb-4">
          Product guides
        </h3>
        <p className="text-gray-700 leading-relaxed max-w-[260px]">
          Make the most of your Zendesk setup with our comprehensive documentation
        </p>
      </div>
    </div>
    </Link>
  </div>
  )
  }
  export default Card

