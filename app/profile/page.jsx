'use client'

import {useState, useEffect} from 'react'
import { useSession  } from 'next-auth/react'
import {useRouter} from 'next/navigation'
import  Profile from "@components/Profile"

const MyProfile = () => {
  const {data: session} = useSession()
  const router = useRouter()

  const [posts, setPosts] = useState([])

   useEffect(() =>{
    const fetchPosts = async ()=>{
      if (!session?.user?.id)  return
      const response =await fetch (`/api/users/${session?.user.id}/posts`,)
      const data = await response.json()

      if(session?.user.id)setPosts(data)
    }
   
    fetchPosts(); 
  },[session])

  const handleEdit = (post)=>{
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) =>{
    const hasConfirmed = confirm("Are you sure you want to delete this Prompt")

    try{
      const hasConfirmed = await fetch(`/api/prompt/${post._id.toString()}`,{
        method: 'DELETE'
      })
      const  filteredPosts =osts.filter((p)=> p._id !== post._id)
      setPosts(filteredPosts)
    }
    
    catch(err){
      console.log(err)
    }
  }

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
    
  )
}

export default MyProfile