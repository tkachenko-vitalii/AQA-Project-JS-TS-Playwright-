export function sortPrices(prices: number[], ascending: boolean): number[] {
    return [...prices].sort((a, b) => ascending ? a - b : b - a);
  }
  
  export function sortNames(names: string[], ascending: boolean): string[] {
    return [...names].sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a));
  }