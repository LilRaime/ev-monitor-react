import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function ChartCard({ chartData }: { chartData: number[] }) {
  const currentHour = new Date().getHours();
  
  const labels = useMemo(() => {
    const hours = [];
    for (let i = 7; i >= 0; i--) {
      let h = currentHour - i;
      if (h < 0) h += 24;
      hours.push(h + ':00');
    }
    return hours;
  }, [currentHour]);

  const pathD = useMemo(() => {
    const smallData = chartData.slice(-8);
    return smallData.map((val, i) => {
      const x = (i / 7) * 100;
      const y = 100 - val; 
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }, [chartData]);

  return (
    <Link to="/statistic" className="group col-span-12 lg:col-span-6 bg-ev-card rounded-2xl p-6 md:p-8 h-full min-h-[300px] flex flex-col shadow-lg hover:shadow-ev-accent/10 transition-all duration-500 border border-transparent hover:border-ev-accent/20">
      
      <div className="flex justify-between items-center mb-8 shrink-0">
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider group-hover:text-ev-accent transition-colors">Power by hours</h2>
        <div className="flex gap-2 items-center bg-ev-darker/50 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-ev-accent rounded-full animate-ping"></span>
          <span className="text-xs text-ev-accent font-bold uppercase tracking-widest">Live Flow</span>
        </div>
      </div>
      
      <div className="flex-1 flex min-h-0 group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
        <div className="w-12 flex flex-col justify-between pb-8 text-xs font-bold text-gray-500 italic shrink-0 z-10 bg-ev-card">
          <span>100 kW</span><span>50 kW</span><span>0 kW</span>
        </div>
        <div className="flex-1 overflow-x-auto overflow-y-hidden ml-2 pb-1 custom-scrollbar">
          <div className="relative h-full w-full min-w-[350px]">
            <div className="absolute inset-0 flex flex-col justify-between pb-8 opacity-20 pointer-events-none">
              <div className="border-t border-gray-400 border-dashed w-full"></div>
              <div className="border-t border-gray-400 border-dashed w-full"></div>
              <div className="border-t border-gray-400 w-full"></div>
            </div>
            
            <svg className="absolute inset-0 w-full h-[calc(100%-32px)] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path 
                className="group-hover:stroke-[3px] transition-all duration-500" 
                d={pathD} 
                stroke="#84cc16" 
                strokeWidth="2" 
                fill="none" 
                vectorEffect="non-scaling-stroke"
                style={{ transition: 'd 0.8s ease-in-out' }}
              />
            </svg>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs font-bold text-gray-500 italic pr-2">
              {labels.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>
            
          </div>
        </div>
        
      </div>
    </Link>
  );
}