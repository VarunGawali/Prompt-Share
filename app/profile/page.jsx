'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {useState, useEffect} from 'react'

import Profile from '@components/profile'

const MyProfile = () => {
  const router = useRouter()

    const {data: session} = useSession()

    const [posts, setposts] = useState([])

    useEffect(()=>{
        const fetchposts = async()=>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()
            setposts(data)
        }
        if(session?.user.id) fetchposts()
    },[])

    const handleedit = (post)=>{
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handledelete = async(post)=>{
      const hasconfirmed = confirm("Are you sure you want to delete this prompt")
      if(hasconfirmed){
        try{
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method: 'DELETE'
          })
          const filteredposts = posts.filter((p)=>p._id !== post._id)

          setposts(filteredposts)
          
        }catch(error){
          console.log(error)
        }
      }
    }
  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleedit={handleedit}
    handledelete={handledelete}
    />
  )
}

export default MyProfile
