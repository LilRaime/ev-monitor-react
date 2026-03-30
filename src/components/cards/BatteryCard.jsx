import { Link } from 'react-router-dom';
import { BatteryMedium } from 'lucide-react';

export default function BatteryCard({ batteryLevel }) {
  const levelStr = Math.round(batteryLevel);

  return (
    <Link to="/statistic" className="group col-span-12 sm:col-span-6 md:col-span-3 bg-ev-card rounded-2xl p-6 h-40 flex flex-col justify-between shadow-lg hover:shadow-ev-accent/20 hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-ev-accent/30">
      <div className="flex justify-between items-start">
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider group-hover:text-ev-accent transition-colors">Battery</h2>
        <div className="w-10 h-10 rounded-xl bg-ev-accent/10 flex items-center justify-center group-hover:bg-ev-accent/20 transition-all duration-300">
          <BatteryMedium className="text-ev-accent w-5 h-5 group-hover:animate-pulse" />
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-100 mb-2 group-hover:text-white transition-colors tabular-nums">{levelStr}%</div>
        <div className="w-full h-2 bg-ev-darker rounded-full overflow-hidden border border-white/5">
          <div 
            className="bg-ev-accent h-full rounded-full transition-all duration-1000 group-hover:brightness-125 group-hover:shadow-[0_0_10px_#84cc16]" 
            style={{ width: `${levelStr}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
}