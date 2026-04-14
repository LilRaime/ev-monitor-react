import { useState, useEffect, useCallback } from 'react';

interface SensorState {
  powerData: number[];
  batteryData: number[];
  baseLastPower: number;
}

export function useChart() {
  const [sensorState, setSensorState] = useState<SensorState>({
    powerData: Array.from({ length: 12 }, () => 0),
    batteryData: Array.from({ length: 12 }, () => 0),
    baseLastPower: 0
  });

  const [isConnected, setIsConnected] = useState<boolean>(true);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/status');
      if (!response.ok)
        throw new Error('Network error');

      const data = await response.json();
      setSensorState({
        powerData: data.powerData,
        batteryData: data.batteryData,
        baseLastPower: data.powerData[data.powerData.length - 1]
      });
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to fetch status from backend:', error);
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const timer = setInterval(fetchStatus, 2000);
    return () => clearInterval(timer);
  }, [fetchStatus]);

  const updateSettings = useCallback(async (newSettings: any) => {
    try {
      await fetch('http://localhost:3000/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      console.log('Settings successfully sent to backend');
    } catch (error) {
      console.error('Failed to post settings:', error);
    }
  }, []);

  const regenerate = useCallback(async () => {
    await updateSettings({ randomizeChart: true });
    fetchStatus();
  }, [fetchStatus, updateSettings]);

  const regenerateBattery = useCallback(async () => {
    await updateSettings({ randomizeBattery: true });
    fetchStatus();
  }, [fetchStatus, updateSettings]);

  return {
    chartData: sensorState.powerData,
    batteryData: sensorState.batteryData,
    regenerate,
    regenerateBattery,
    isConnected,
    updateSettings
  };
}