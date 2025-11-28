import { Search } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { searchStocks } from '../../APICalls'
import StockView from '../singlestock/StockView'


function StocksGrid() {

    const [stocks, setStocks] = useState([])

    const [query, setQuery] = useState("")

    const fetchStocks = async () => {
        try {
            const res = await searchStocks(query);
            setStocks(res.length > 0 ? res : []);
        } catch (error) {
            setStocks([]);
            console.log("Error fetching stocks:", error);
        }
    }

    function debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        }
    }

 

    useEffect(() => {
        debounce(fetchStocks, 300)();
    }, [query,  ]);


    return (
        <div>
            <div className='relative' >

                <svg className='absolute top-3 left-3' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#000" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
                </svg>
                <input value={query} onChange={(e) => setQuery(e.target.value)}
                    type="text" placeholder='Search Stocks'
                    className='border outline-0 shadow  p-2 rounded-md w-full mb-4 pl-10 ' />

            </div>

            <h2 className=' font-bold my-4'  > Your WatchList </h2>


            <div className='grid grid-cols-[repeat(auto-fill,300px)] gap-4' >
                {stocks.length > 0 ? ((stocks || []).map((stock) => (
                    <StockView key={stock.key} stock={stock} />
                ))

                ) : (
                    <p>No stocks found.</p>
                )}


            </div>
        </div>
    )
}

export default StocksGrid