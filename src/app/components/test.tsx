
import React from 'react'
import { IPost } from './types'

export default async function Test() {
    const response = await fetch(process.env.API_URL ?? '')
    const data = await response.json() as IPost[]

    return (
        <div className='max-h-96 overflow-scroll p-6'>
            {
                data.map((item) => <div key={item.id} className='b-2 border-blue-400'>
                    {JSON.stringify(item)}
                </div>)
            }
        </div>
    )
}
