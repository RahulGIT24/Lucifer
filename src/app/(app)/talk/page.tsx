'use client'

import Chat from '@/components/Chat'
import Sidebar from '@/components/Sidebar'
import { setShowSidebar } from '@/lib/store/features/sidebar/sidebarSlice'
import { useAppDispatch } from '@/lib/store/hooks'
import React from 'react'

const page = () => {
  const dispatch = useAppDispatch();
  return (
    <div className='flex relative' onClick={()=>{
      dispatch(setShowSidebar(false))
    }}>
      <Sidebar/>
      <Chat/>
    </div>
  )
}

export default page
