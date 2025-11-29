import React, { useMemo } from 'react'
import { useUserStore } from '../../hooks/useZustand'
import { ArrowDown, ArrowUp } from 'lucide-react';
import HeroTypeBox from '../shared/HeroTypeBox';
import StockLineChart from '../singlestock/StockChart';
import HeroGraph from '../shared/HeroGraph';

function HeroStock() {

  const { allData } = useUserStore();
  const reliance = useMemo(() => {
    if (!allData || allData.length === 0) return null;
    return allData.find((item) => item.symbol === 'RELIANCE');
  }, [allData]);

  const typesObj = {
    marketCap: "Market Cap",
    peRatio: "P/E Ratio",
    fiftyTwoWeekHigh: "52 Week High",
    fiftyTwoWeekLow: "52 Week Low",

  }

  return (
    <div>

      {reliance &&
        <div className='my-4 p-4  rounded-md shadow  bg-white ' >

          <div className='flex flex-col md:flex-row   gap-6 ' >
            <div className='flex flex-col items-start md:min-w-96 gap-1' >
              <p className='text-gray-500 tracking-tight ' > {reliance.symbol}  </p>
              <p className='text-gray-700 font-bold text-lg mt-1 ' > Reliance Industries Limited  (RELIANCE) </p>

              <p className='text-3xl font-bold ' > ₹ {reliance.price} </p>
              <p className={`text font-bold  flex  ${reliance.changePercent < 0 ? "text-red-500" : "text-green-500 "} `} >
                {reliance.changePrice}
                <span className='ml-1 ' >  {reliance.changePercent < 0 ? '' : '+'} ({reliance.changePercent} %)   </span>
              </p>
            </div>

            <HeroGraph oneDayData={reliance.history?.['1D']} />

          </div>


          <div className='grid grid-cols-[repeat(auto-fill,200px)]  gap-4 mt-4 ' >


            {reliance &&
              Object.keys(typesObj).map((key) => (
                <HeroTypeBox
                  key={key}
                  field={typesObj[key]}
                  name={key}
                  val={reliance[key]}
                />
              ))}

          </div>
        </div>
      }


    </div>
  )
}

export default HeroStock