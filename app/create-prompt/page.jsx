'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

import React from 'react'
import { root } from 'postcss';

const CreatePrompt = () => {
    const router = useRouter()
    const {data: session} = useSession()
    const [submitting, setsubmitting] = useState(false)
    const [post, setpost] = useState({
        prompt:'',
        tag:'',
    })

    const createPrompt = async(e)=>{
        e.preventDefault();
        setsubmitting(true)

        try{
            const response = await fetch('/api/prompt/new',
                {
                    method:'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session?.user.id,
                        tag: post.tag
                    })
                })

                if(response.ok){
                    router.push('/')
                }
        } catch(error){
            console.log(error)
        } finally{
            setsubmitting(false)
        }
    }

  return (
    <Form
        type="Create"
        post={post}
        setpost={setpost}
        submitting={submitting}
        handlesubmit={createPrompt}
    />
  )
}

export default CreatePrompt
