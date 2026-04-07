import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { RefreshCw } from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function Statistic({ chartData, batteryData, regenerateChart, regenerateBattery }: { chartData: number[]; batteryData: number[]; regenerateChart: () => void; regenerateBattery: () => void; }) {
  const currentHour = new Date().getHours();

  const labels = useMemo(() => {
    const hours = [];
    for (let i = 11; i >= 0; i--) {
      let h = currentHour - i;
      if (h < 0) h += 24;
      hours.push(h + ':00');
    }
    return hours;
  }, [currentHour]);

  const powerPathD = useMemo(() => {
    return chartData.map((val, i) => {
      const x = (i / 11) * 100;
      const y = 100 - ((val / 120) * 100);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }, [chartData]);
  const powerAreaD = `${powerPathD} L 100,100 L 0,100 Z`;

  const batteryChartData = useMemo(() => {
    return {
      labels,
      datasets: [{
        label: 'Battery %',
        data: batteryData,
        borderColor: '#84cc16',
        backgroundColor: 'rgba(132, 204, 22, 0.1)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#84cc16',
        fill: true,
        tension: 0.4,
      }]
    };
  }, [labels, batteryData]);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10">
      <div className="bg-ev-card rounded-2xl p-6 shadow-lg border border-white/5 flex flex-col">
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h2 className="text-gray-400 text-xs font-semibold uppercase">Power Consumption</h2>
          <button 
            onClick={regenerateChart}
            className="text-xs font-bold text-ev-accent bg-ev-accent/10 hover:bg-ev-accent/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 active:scale-95 shrink-0"
          >
            <RefreshCw className="w-4 h-4" /> New Chart
          </button>
        </div>
          <div className="w-full h-[350px] flex relative">
            
            <div className="w-16 flex flex-col justify-between pb-8 text-[10px] md:text-xs font-bold text-gray-500 italic shrink-0 z-10 bg-ev-card">
              {[120, 90, 60, 30, 0].map(val => (
                <span key={val} className="text-right pr-2">{val} kW</span>
              ))}
            </div>
            
            <div className="flex-1 overflow-x-auto overflow-y-hidden ml-2 pb-2 custom-scrollbar">
              <div className="relative h-full w-full min-w-[700px]">
                
                <div className="absolute inset-0 flex flex-col justify-between pb-8 opacity-10 pointer-events-none">
                  {[120, 90, 60, 30, 0].map((val, i) => (
                    <div 
                      key={val} 
                      className={`w-full ${i === 4 ? 'border-t-2 border-gray-400' : 'border-t border-gray-500 border-dashed'}`}
                    ></div>
                  ))}
                </div>

                <svg className="absolute inset-0 w-full h-[calc(100%-32px)] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d={powerAreaD} fill="rgba(132, 204, 22, 0.05)" style={{ transition: 'd 0.8s' }} />
                  <path d={powerPathD} stroke="#84cc16" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" style={{ transition: 'd 0.8s' }} />
                </svg>

                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] md:text-xs font-bold text-gray-500 italic">
                  {labels.map((lbl, i) => <span key={i}>{lbl}</span>)}
                </div>
              </div>
            </div>
          </div>
      </div>
      
      <div className="bg-ev-card rounded-2xl p-6 shadow-lg border border-white/5 flex flex-col">
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h2 className="text-gray-400 text-xs font-semibold uppercase">Battery Level</h2>
          <button 
            onClick={regenerateBattery}
            className="text-xs font-bold text-ev-accent bg-ev-accent/10 hover:bg-ev-accent/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 active:scale-95 shrink-0">
            <RefreshCw className="w-4 h-4" /> New Chart
          </button>
        </div>
        
        <div className="w-full overflow-x-auto overflow-y-hidden pb-2 custom-scrollbar">
        <div className="h-[300px] w-full min-w-[600px]">
            <Line 
              data={batteryChartData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                animation: {
                  duration: 800,
                  easing: 'easeOutQuart'
                },
                scales: { 
                  y: { 
                    min: 0, 
                    max: 100, 
                    grid: { color: 'rgba(255,255,255,0.05)' }, 
                    ticks: { 
                      color: '#6b7280', 
                      font: {
                        size: 12,    
                        weight: 'bold',
                        style: 'italic',
                        family: 'Inter, sans-serif'
                      }
                    } 
                  },
                  x: { 
                    grid: { color: 'rgba(255,255,255,0.05)' }, 
                    ticks: { 
                      color: '#6b7280', 
                      font: {
                        size: 12,
                        weight: 'bold',
                        style: 'italic',
                        family: 'Inter, sans-serif'
                      }
                    } 
                  }
                }
              }} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}