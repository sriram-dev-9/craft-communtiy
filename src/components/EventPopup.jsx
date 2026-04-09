import React, { useState } from 'react'

const EventPopup = () => {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative text-center">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>

        <div className="text-4xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-green-700 mb-2">Upcoming Event!</h2>
        <p className="text-gray-700 text-lg font-semibold mb-1">Homestead Server Launch</p>
        <p className="text-gray-500 mb-5">The new event starts <span className="font-bold text-green-600">tomorrow</span>. Don't miss it!</p>

        <button
          onClick={() => setIsOpen(false)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}

export default EventPopup
