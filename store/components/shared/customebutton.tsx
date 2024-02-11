"use client"
"use client"
import React from 'react'
import Button from '../ui/button'
import { useIdContext } from '@/providers/responce-provider'

const CustomeButton = () => {
    const { ids, setIds } = useIdContext();

    const getClient = () => {
        console.log(ids, "id")
    }

    return (
        <Button
            onClick={getClient}
        >
            button
        </Button>
    )
}

export default CustomeButton