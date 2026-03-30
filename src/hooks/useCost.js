import { useMemo } from 'react';

export function useCost(chartData, tariff) {
  return useMemo(() => {
    const parsedTariff = parseFloat(tariff);
    if (isNaN(parsedTariff) || parsedTariff <= 0) return 0;
    
    const avgPower = chartData.reduce((sum, v) => sum + v, 0) / chartData.length;
    const energyKwh = (avgPower * chartData.length) / 60; 
    return energyKwh * parsedTariff;
  }, [chartData, tariff]);
}