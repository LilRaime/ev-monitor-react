import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Statistic from './pages/Statistic';
import { useChart } from './hooks/useChart';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { chartData, batteryData, regenerate, regenerateBattery, isConnected } = useChart();

  return (
    <BrowserRouter>
      <div className="font-sans text-white flex h-screen w-full overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex flex-col relative min-w-0 min-h-0">
          {!isConnected && (
            <div className="bg-red-500/90 text-white text-sm font-medium py-1.5 px-4 text-center z-50 flex justify-center items-center gap-2 animate-in slide-in-from-top-2 duration-300">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              Connection Lost. Reconnecting to local server...
            </div>
          )}
          <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard chartData={chartData} batteryData={batteryData} />} />
              <Route path="/statistic" element={
                <Statistic 
                  chartData={chartData} 
                  batteryData={batteryData} 
                  regenerateChart={regenerate} 
                  regenerateBattery={regenerateBattery} 
                />
              } />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
