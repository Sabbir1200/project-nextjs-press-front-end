import { Navbar } from '@/components/shared/navbar'
import React from 'react'
import { getMe } from '../service/getMe'

const PublicGroupLayout = async(
    {
        children
    } : {
        children: React.ReactNode
    }
) => {
    const user = await getMe()
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar user={user}/>
    {children}
    </div>
  )
}

export default PublicGroupLayout