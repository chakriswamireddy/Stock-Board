// // StockChart.jsx
// import React, { useRef, useEffect, useState } from 'react';
// import { createChart, AreaSeries } from 'lightweight-charts';

// export default function StockChart({ dataByPeriod }) {
//   const containerRef = useRef(null);
//   const chartRef = useRef(null);
//   const seriesRef = useRef(null);

//   const [selectedPeriod, setSelectedPeriod] = useState("1D");

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const chart = createChart(containerRef.current, {
//       width: containerRef.current.clientWidth,
//       height: 360,
//       layout: {
//         background: { color: "transparent" },
//         textColor: "transparent",          // hide Y labels
//       },
//       grid: {
//         vertLines: { color: "transparent" },
//         horzLines: { color: "transparent" },
//       },
//       rightPriceScale: {
//         visible: false,                    // hide Y scale
//       },
//       timeScale: {
//         visible: false,                    // hide X scale
//       },
//       watermark: {
//         visible: false,                    // hide TV logo
//       },
//     });
//     chartRef.current = chart;

//     const series = chart.addSeries(AreaSeries, {
//       topColor: "rgba(33, 150, 243, 0.6)",
//       bottomColor: "rgba(33, 150, 243, 0.05)",
//       lineColor: "rgba(33, 150, 243, 1)",
//       lineWidth: 2,
//     });

//     seriesRef.current = series;

//     window.addEventListener("resize", handleResize);
//     function handleResize() {
//       chart.applyOptions({ width: containerRef.current.clientWidth });
//     }

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       chart.remove();
//     };
//   }, []);

//   // ------------------------
//   // Update data when changing period
//   // ------------------------
//   useEffect(() => {
//     const raw = dataByPeriod[selectedPeriod] || [];
//     const formatted = raw.map((value, i) => ({
//       time: i,
//       value,
//     }));

//     const series = seriesRef.current;
//     const chart = chartRef.current;

//     if (series) {
//       series.setData(formatted);

//       if (selectedPeriod === "MAX") {
//         chart.timeScale().fitContent();
//       } else {
//         chart.timeScale().fitContent();
//       }
//     }
//   }, [selectedPeriod, dataByPeriod]);

//   const periods = ["1D", "1M", "1Y", "MAX"];

//   return (
//     <div
//       style={{
//         background: "linear-gradient(180deg, #07274c 0%, #02122b 100%)",
//         borderRadius: "10px",
//         padding: "12px",
//       }}
//     >
//       {/* Range Buttons */}
//       <div style={{ marginBottom: 10 }}>
//         {periods.map((p) => (
//           <button
//             key={p}
//             onClick={() => setSelectedPeriod(p)}
//             style={{
//               marginRight: 8,
//               padding: "6px 10px",
//               fontSize: 13,
//               borderRadius: 6,
//               border: "none",
//               cursor: "pointer",
//               background: selectedPeriod === p ? "#2196F3" : "#2a3b55",
//               color: "white",
//             }}
//           >
//             {p}
//           </button>
//         ))}
//       </div>

//       <div
//         ref={containerRef}
//         style={{
//           width: "100%",
//           height: 360,
//           background: "transparent",
//         }}
//       />
//     </div>
//   );
// }

// StockLineChart.jsx
import React, { useRef, useEffect, useState } from "react";
import { createChart, LineSeries } from "lightweight-charts";
import { Plus, RefreshCcw, RotateCw } from "lucide-react";

export default function StockLineChart({ dataByPeriod }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  const [selected, setSelected] = useState("1D");

  // Convert raw values -> [{ time, value }]
  const formatData = (arr) => {
    return arr.map((value, i) => ({
      time: i + 1,
      value,
    }));
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 350,

      // Transparent so gradient shows
      layout: {
        background: { color: "transparent" },
        textColor: "transparent", // hides labels
      },

      // Hide grid lines
      grid: {
        vertLines: { color: "transparent" },
        horzLines: { color: "transparent" },
      },

      // Hide borders
      priceScale: {
        borderColor: "transparent",
      },
      timeScale: {
        borderColor: "transparent",
        visible: false, // hide x labels
      },

      watermark: {
        visible: false,
      },
    });

    chartRef.current = chart;

    const series = chart.addSeries(LineSeries, {
      color: "#2EB67D",
      lineWidth: 2,
    });

    seriesRef.current = series;

    // Resize handler
    const resize = () => {
      chart.applyOptions({
        width: containerRef.current.clientWidth,
      });
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
    };
  }, []);

  // update when selected range changes
  useEffect(() => {
    const series = seriesRef.current;
    const chart = chartRef.current;
    if (!series || !chart) return;

    const values = dataByPeriod[selected] ?? [];
    const formatted = formatData(values);

    series.setData(formatted);

    // Max range coverage
    chart.timeScale().setVisibleLogicalRange({
      from: 0,
      to: formatted.length + 10,
    });

    chart.timeScale().fitContent();
  }, [selected, dataByPeriod]);

  const ranges = ["1D", "5D", "1M", "6M", "1Y", "Max"];

  return (
    <div className="p-3 rounded-xl bg-white flex-1">
      <div className="flex  flex-col mb-2 md:flex-row items-start justify-between" >
      <div className="flex gap-3 p-1 bg-gray-200 mb-3 w-max">
        {ranges.map((p) => (
          <button
            key={p}
            onClick={() => setSelected(p)}
            className={`px-3 py-1 rounded-md 
              ${selected === p ? "text-blue-600 bg-white" : " text-gray-500"}
            `}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex gap-1 items-center justify-end " >
        <button className="bg-blue-600 text-white p-2 rounded flex font-medium" > <Plus /> Add to Watchlist </button>
        <button className="border border-gray-300  text-gray-500 font-medium p-2 rounded" > Remove </button>
        <button className="border border-gray-300  text-gray-500 font-medium  p-2 rounded" > <RotateCw  className="size-6" /> </button>

        
      </div>
        </div> 

      {/* Chart wrapper with gradient */}
      <div
        className="rounded-lg"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,50,70,1) 0%, rgba(1,18,35,1) 100%)",
        }}
      >
        <div ref={containerRef} className="w-full h-[350px] bg-transparent" />
      </div>
    </div>
  );
}
