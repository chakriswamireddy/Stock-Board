import React, { useRef, useEffect } from "react";
import { createChart, LineSeries } from "lightweight-charts";

export default function HeroGraph({ oneDayData = [] }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const priceLinesRef = useRef([]);

  const formatData = (arr) =>
    arr.map((value, i) => ({
      time: i + 1,
      value,
    }));

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 300,

      layout: {
        background: { color: "#ffffff" },
        textColor: "#ffffff00", // transparent
      },

      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },

      // HIDE PRICE SCALE COMPLETELY
      priceScale: {
        visible: false,
        borderColor: "transparent",
      },

      // HIDE TIME SCALE
      timeScale: {
        visible: false,
      },
    });

    chartRef.current = chart;
    

    const series = chart.addSeries(LineSeries, {
      color: "#007bff",
      lineWidth: 2,
      priceLineVisible: false, 
    });

    series.priceScale().applyOptions({
      borderColor: "transparent",   // hides the Y axis line
      ticksVisible: false,          // hides all ticks
    });
    

    seriesRef.current = series;

    return () => chart.remove();
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;
    

    // Remove previous lines
    priceLinesRef.current.forEach((pl) => {
      try {
        seriesRef.current.removePriceLine(pl);
      } catch {}
    });
    priceLinesRef.current = [];

    const formatted = formatData(oneDayData);
    if (!formatted.length) return;

    seriesRef.current.setData(formatted);
    chartRef.current.timeScale().fitContent();

    const values = formatted.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Middle values
    const mid1 = min + (max - min) * 0.33;
    const mid2 = min + (max - min) * 0.66;

    // THESE TWO WILL SHOW LABELS (Ticks)
    const midLine1 = seriesRef.current.createPriceLine({
      price: mid1,
      color: "#e6e6e6",
      lineWidth: 1,
      axisLabelVisible: true,           // SHOW ONLY THESE TWO
      axisLabelTextColor: "#8c8c8c",
      axisLabelBackgroundColor: "#ffffff",
    });

    const midLine2 = seriesRef.current.createPriceLine({
      price: mid2,
      color: "#e6e6e6",
      lineWidth: 1,
      axisLabelVisible: true,
      axisLabelTextColor: "#8c8c8c",
      axisLabelBackgroundColor: "#ffffff",
    });

    priceLinesRef.current.push(midLine1, midLine2);
  }, [oneDayData]);

  return (
    <div className=" chart-container p-3 w-full flex-1  ">
      <div ref={containerRef} className="w-full h-[300px]" />
    </div>
  );
}
