import React from "react";
import { formatNumber } from "../../hooks/utils";

export default function HeroTypeBox({ field, val }) {
  
  // Convert safely to number for calculations
  const numericValue = Number(val);

  let displayValue = "";

  // Handle empty / invalid
  if (val === null || val === undefined || val === "" || isNaN(numericValue)) {
    displayValue = "";
  } 
  else {

 

 

    // P/E Ratio — do NOT add ₹
    if (field.toLowerCase().includes("Ratio".toLowerCase())) {
      displayValue = numericValue.toString();
    }

    // All other numeric values → ₹ + formatNumber
    else {
      displayValue = "₹ " + formatNumber(numericValue);
    }
  }

  return (
    <div className="bg-gray-200 p-2 flex flex-col items-start rounded">
      <p className="text-blue-800 font-normal">{field}</p>
      <p className="text-gray-700 font-bold text-lg">{displayValue}</p>
    </div>
  );
}
