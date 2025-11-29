import React from 'react';

const StockMetrics = ({ metrics = {} }) => {
 
  const defaultMetrics = {
    dayHigh: 2965.00,
    dayLow: 2902.30,
    marketCap: '19.96T',
    todayVolume: '7.82M',
    fiftyTwoWeekHigh: 3024.90,
    fiftyTwoWeekLow: 2220.30,
    peRatio: 28.45,
    dividendYield: 0.31
  };

  const data = Object.keys(metrics).length > 0 ? metrics : defaultMetrics;

  const MetricItem = ({ label, value, isLeft = true }) => (
    <div className={`${isLeft ? 'pr-4' : 'pl-4'}`}>
      <div className="text-gray-500 text-sm mb-1">{label}</div>
      <div className="text-gray-900 text-xl font-semibold">{value}</div>
    </div>
  );

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Metrics</h2>
      
      <div className="space-y-6">
        {/* Day High / Day Low */}
        <div className="grid grid-cols-2 gap-4">
          <MetricItem 
            label="Day High" 
            value={`₹${data.dayHigh.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            isLeft={true}
          />
          <MetricItem 
            label="Day Low" 
            value={`₹${data.dayLow.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            isLeft={false}
          />
        </div>

        {/* Market Cap / Today's Volume */}
        <div className="grid grid-cols-2 gap-4">
          <MetricItem 
            label="Market Cap" 
            value={`₹${data.marketCap}`}
            isLeft={true}
          />
          <MetricItem 
            label="Today's Volume" 
            value={data.todayVolume}
            isLeft={false}
          />
        </div>

        {/* 52 Week High / 52 Week Low */}
        <div className="grid grid-cols-2 gap-4">
          <MetricItem 
            label="52 Week High" 
            value={`₹${data.fiftyTwoWeekHigh.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            isLeft={true}
          />
          <MetricItem 
            label="52 Week Low" 
            value={`₹${data.fiftyTwoWeekLow.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            isLeft={false}
          />
        </div>

        {/* P/E Ratio / Dividend Yield */}
        <div className="grid grid-cols-2 gap-4">
          <MetricItem 
            label="P/E Ratio" 
            value={data.peRatio.toFixed(2)}
            isLeft={true}
          />
          <MetricItem 
            label="Dividend Yield" 
            value={`${data.dividendYield.toFixed(2)}%`}
            isLeft={false}
          />
        </div>
      </div>
    </div>
  );
};

export default StockMetrics;