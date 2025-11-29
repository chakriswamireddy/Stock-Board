export function formatNumber(num) {
    if (num === null || num === undefined) return "";

    console.log(num)
  
    const n = Number(num);      // <-- FIX: ensure it's a real number
    if (isNaN(n)) return "";    // safest fallback
  
    if (n >= 1000000000000) {
      return (n / 1000000000000).toFixed(2) + " T";
    }
    if (n >= 1000000000) {
      return (n / 1000000000).toFixed(2) + " B";
    }
    if (n >= 1000000) {
      return (n / 1000000).toFixed(2) + " M";
    }
    if (n >= 1000) {
      return (n / 1000).toFixed(2) + " K";
    }
  
    return n.toString();
  }
  