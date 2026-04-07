import { useState, useEffect, useCallback } from 'react';

function generateBatteryCurve(): number[] {
  const data: number[] = [];
  const startLevel = 5 + Math.random() * 10; 
  const endLevel = startLevel + 40 + Math.random() * 40; 
  for (let i = 0; i < 12; i++) {
    const progress = i / 11;
    const base = startLevel + (endLevel - startLevel) * progress;
    const noise = (Math.random() - 0.3) * 2;
    data.push(parseFloat(Math.min(100, Math.max(0, base + noise)).toFixed(1)));
  }
  return data;
}

interface SensorState {
  powerData: number[];
  batteryData: number[];
  baseLastPower: number;
}

export function useChart() {
  const [sensorState, setSensorState] = useState<SensorState>(() => {
    const storedPower: number[] | null = JSON.parse(sessionStorage.getItem('ev_chart_data_v2') || 'null');
    const storedBattery: number[] | null = JSON.parse(sessionStorage.getItem('ev_battery_data_v1') || 'null');

    const initialPower = (storedPower && storedPower.length === 12) 
      ? storedPower 
      : Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 10);

    const initialBattery = (storedBattery && storedBattery.length === 12)
      ? storedBattery
      : generateBatteryCurve();

    return {
      powerData: initialPower,
      batteryData: initialBattery,
      baseLastPower: initialPower[initialPower.length - 1]
    };
  });

  useEffect(() => {
    sessionStorage.setItem('ev_chart_data_v2', JSON.stringify(sensorState.powerData));
    sessionStorage.setItem('ev_battery_data_v1', JSON.stringify(sensorState.batteryData));
  }, [sensorState]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSensorState(prev => {
        const fluctuation = prev.baseLastPower * 0.05;
        let currentPower = prev.baseLastPower + (Math.random() * 2 - 1) * fluctuation;
        
        currentPower = Math.min(120, Math.max(0, currentPower));

        const newPowerData = [...prev.powerData];
        newPowerData[newPowerData.length - 1] = currentPower;

        return { ...prev, powerData: newPowerData };
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [sensorState.baseLastPower]);

  const regenerate = useCallback(() => {
    const newData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 10);
    setSensorState(prev => ({
      ...prev,
      powerData: newData,
      baseLastPower: newData[newData.length - 1]
    }));
  }, []);

  const regenerateBattery = useCallback(() => {
    setSensorState(prev => ({
      ...prev,
      batteryData: generateBatteryCurve()
    }));
  }, []);

  return { 
    chartData: sensorState.powerData, 
    batteryData: sensorState.batteryData, 
    regenerate, 
    regenerateBattery 
  };
}