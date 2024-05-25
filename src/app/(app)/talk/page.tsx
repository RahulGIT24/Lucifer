import Chat from '@/components/Chat'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <Chat/>
    </div>
  )
}

export default page
