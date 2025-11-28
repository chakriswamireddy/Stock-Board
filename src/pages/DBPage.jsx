import React from 'react'
import HeroStock from '../components/dashboard/HeroStock'
import StocksGrid from '../components/dashboard/StocksGrid'

function DBPage() {
    return (
        <div className='mt-6' >
            <h1 className="text-2xl font-bold  "> Your Primary Investment </h1>
            <HeroStock />

            <StocksGrid />

        </div>
    )
}

export default DBPage