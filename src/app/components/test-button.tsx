'use client'

import React, { useState } from 'react'
import { IPost } from './types'

export default function TestButton() {

    const [post, setPost] = useState<IPost | null>()

    const action = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${Math.trunc(Math.random() * 100 + 1)}` ?? '')

        const data = await response.json() as IPost

        setPost(data)
    }

    return (
        <button onClick={action} className='text-white bg-blue-700 rounded-md p-6'>
            {post ? `Random post: ${post.title}` : `Click for random post`}
        </button>
    )
}
