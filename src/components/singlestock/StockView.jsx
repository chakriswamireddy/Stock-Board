import React from 'react'
import { TrendingDown } from 'lucide-react';

function StockView({ stock }) {

    const { symbol, name, price, changePercent } = stock;

    const isFalling = changePercent < 0;
    
    return (
        <div className="w-auto min-w-60 h-max bg-white rounded-lg shadow-sm border border-gray-200 p-4">


            <div>
                
                <div className="mb-4 flex justify-between items-center  ">
                    <div className='flex  flex-col max-w-40' >
                        <div className="text-xs font-bold text-gray-500 mb-1"> {symbol}  </div>
                        <div className=" font-bold text-gray-900 mb-1 "> {name} </div>

                    </div>
                    <div className="flex  flex-col  items-end gap-1">
                        <span className="text-lg font-semibold text-gray-900">₹ {price}</span>
                        <span className={`text font-medium ${isFalling ? "text-red-600" : "text-green-600"}  flex items-center gap-0.5`}>
                            {isFalling ? '' : '+'}
                            
                            {changePercent + '%'}
                        </span>

                    </div>
                </div>
            </div>

            {/* Chart Placeholder */}
            <div className=" bg-linear-180 from-gray-50 via-gray-200 to-gray-300  rounded border border-gray-200 h-60 flex items-center justify-center">
                <svg
                    className="w-12 h-12 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </div>
        </div>




    )
}

export default StockView