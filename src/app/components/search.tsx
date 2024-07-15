'use client'

import React, { useEffect, useState } from 'react'
import { IResponse } from './types'
import { useDebounce } from "use-debounce";

export default function Search() {

    const LIMIT = 10

    const [search, setSearch] = useState('')
    const [offset, setOffset] = useState(0)
    const [data, setData] = useState<IResponse | null>()
    const [history, setHistory] = useState<string[]>([])
    const [debouncedValue] = useDebounce(search, 500);

    const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const clearHistory = async () => {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/history` ?? '')

        await fetch(url.toString(), {
            method: 'DELETE'
        })

        fetchHistory()
    }

    const next = () => {
        setOffset(offset => offset + 10)
    }

    const previous = () => {
        if (offset >= 10)
            setOffset(offset => offset - 10)
    }

    const fetchHistory = async () => {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/history` ?? '')

        const response = await fetch(url.toString())
        const data = await response.json() as string[]

        setHistory(data)
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    useEffect(() => {
        const updateData = async (search: string) => {
            const url = new URL(process.env.NEXT_PUBLIC_API_URL ?? '')

            url.searchParams.append('query', search)
            url.searchParams.append('limit', LIMIT.toString())
            url.searchParams.append('offset', offset.toString())

            const response = await fetch(url.toString())
            const data = await response.json() as IResponse

            setData(data)
        }

        if (debouncedValue) {
            updateData(debouncedValue).then(() => {
                fetchHistory()
            })
        }
        else setData(null)
    }, [debouncedValue, offset])


    return (
        <div className='flex flex-col gap-4 items-center'>
            <div>
                <input className='p-4 rounded-lg border-2 border-gray-200' placeholder={"Type to search..."} onChange={updateSearch} />
            </div>
            <div className='grid grid-cols-5 gap-4 h-96 p-6'>
                {data && data.data.length > 0 ? data.data.map(result => {
                    return <div key={result.id}>
                        <img className='max-h-20' src={result.images.preview_gif.url} alt={result.id} />
                    </div>
                }) : <div>
                    No results found
                </div>}
            </div>
            <div className='flex flex-col gap-2'>
                <p className='p-2'>History:</p>
                <ul className='h-20 overflow-scroll w-96 border-2 rounded-lg border-gray-200'>
                    {history.length > 0 ? history.map((item, index) => {
                        return <li className='px-4 hover:bg-slate-200' key={`history-item-${index}`}>
                            {item}
                        </li>
                    }) : <li className='px-4'>
                        No recent searches
                    </li>}
                </ul>
                <button className='p-2 rounded-lg bg-blue-600 text-white' onClick={clearHistory}>Clear</button>
            </div>
            <div className='flex gap-4'>
                <button className='p-4 rounded-lg bg-blue-600 text-white' onClick={previous}>Previous</button>
                <button className='p-4 rounded-lg bg-blue-600 text-white' onClick={next}>Next</button>
            </div>
        </div>
    )
}
