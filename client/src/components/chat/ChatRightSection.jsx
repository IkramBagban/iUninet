import React from 'react';

const ChatRightSection = () => {

  return (
    <div className="flex flex-col h-full">
      {/* CHAT WINDOW HEADER */}
      <div className="flex items-center p-3 bg-gray-200">
        <div className="w-10 h-10 rounded-full border border-gray-300 bg-gray-400"></div>
        <div className="flex-grow ml-3">
          <h3 className="font-semibold">Ikram Bagban</h3>
          <p className="text-sm text-gray-600">ikrambagban</p>
        </div>
        <div className="text-gray-600 cursor-pointer">...</div>
      </div>

      {/* CHAT WINDOW */}
      <div className="flex-grow p-3 overflow-auto">
        <div className='flex flex-end'>Conversation</div>
      </div>

      {/* MESSAGE INPUT */}
      <div className="p-3 bg-gray-100">
        <div className="flex items-center space-x-2">
          <input type="text" className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a message..." />
          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatRightSection;
