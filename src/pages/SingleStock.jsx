import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router';
import { useUserStore } from '../hooks/useZustand';
import { ArrowDown, ArrowUp } from 'lucide-react';
import StockChart from '../components/singlestock/StockChart';
import StockMetrics from '../components/singlestock/StockMetrics';

function SingleStock() {

  const { symbol } = useParams();

  const { allData } = useUserStore();

  const stock = useMemo(() => {
    if (!allData || allData.length === 0) return null;
    console.log(allData);
    return allData.find((item) => item.symbol === symbol);
  }, [allData, symbol]);




  return (
    <div className='mt-4' >
      {stock &&
        <>


          <div className='flex justify-between ' >
            <div className="text-2xl font-bold flex flex-col gap-1 ">
              <div className='flex gap-4 ' >
                <p className='text-lg sm:text-xl' >  {stock?.name} </p>
                <p className='bg-blue-200/40 text-blue-600 text-xs text-center place-content-center font-medium px-4 py-1.5 rounded ' > {stock?.exchange} </p>
              </div>
              <p className=" font-bold text-sm sm:text-[16px] text-gray-500 mb-1 " > {stock?.symbol} </p>
            </div>
            <div className='flex flex-col items-end gap-1 ' >
              <p className='text-xl sm:text-2xl font-bold ' >   ₹ {stock?.price}   </p>
              <p className={`text-sm sm:text font-bold  flex  ${stock.changePercent < 0 ? "text-red-500" : "text-green-500 "} `} >
                {stock?.changePercent < 0 ?
                  <ArrowDown /> : <ArrowUp />
                }  {stock.changePrice}
                <span className='ml-1 ' >  {stock?.changePercent < 0 ? '' : '+'} ({stock?.changePercent} %)   </span>
              </p>
            </div>
          </div>

          <div className='flex lg:flex-row flex-col justify-between mt-4  gap-4' > 


            <StockChart dataByPeriod={stock.history} />

            <StockMetrics metrics={stock} />
          </div>


        </>
      }
    </div>
  )
}

export default SingleStock