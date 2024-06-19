'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

import React from 'react'
import { root } from 'postcss';

const EditPrompt = () => {
    const router = useRouter()
    const searchparams = useSearchParams()
    const promptId = searchparams.get('id')

    const [submitting, setsubmitting] = useState(false)
    const [post, setpost] = useState({
        prompt:"",
        tag:"",
    })

    useEffect(()=>{
        const getpromptdetails = async()=>{
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            setpost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if(promptId) getpromptdetails()
    },[promptId])

    const updatePrompt = async(e)=>{
        e.preventDefault();
        setsubmitting(true)

        if(!promptId) return alert("No prompt ID")

        try{
            const response = await fetch(`/api/prompt/${promptId}`,
                {
                    method:'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
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
        type="Edit"
        post={post}
        setpost={setpost}
        submitting={submitting}
        handlesubmit={updatePrompt}
    />
  )
}

export default EditPrompt