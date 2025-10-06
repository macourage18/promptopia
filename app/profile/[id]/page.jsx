'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Profile from '@components/Profile'
import {useSession} from 'next-auth/react'

export default function OtherProfile() {
  const { id } = useParams() 
  const router = useRouter()
  const {data:session} = useSession()
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)



  useEffect(()=>{
     if (session?.user.id === id){ 
      router.push('/profile')
      return
    }
  })
    
  useEffect(()=>{

    if(!id || session?.user.id === id) return

    const fetchUserPosts = async ()=>{

      try{
        const res = await fetch(`/api/users/${id}/posts`)
        const data  = await res.json()
        setUserPosts(data)
      }
    catch (err){
      console.error(err)
    }finally{
      setLoading(false)
    }
  }
  fetchUserPosts()
  },[id,session])
    
  if (loading) return <p className='text-center mt-10'>Loading profile...</p>

  const username = userPosts[0]?.creator.username

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s profile page. Explore their creative prompts below.`}
      data={userPosts}
    />
  )
}
