import React from 'react'
import ChatSidebar from './ChatSidebar'
import ChatRightSection from './ChatRightSection'

const ChatSection = () => {
  return (
    <div className='bg-white h-[100%] w-[100%] text-black flex'>
      <div className='w-[40%] h-[100%] border'>
        <ChatSidebar />
      </div>

      <div className='w-[100%] h-auto border'>
        <ChatRightSection />
      </div>
    </div>
  )
}

export default ChatSection