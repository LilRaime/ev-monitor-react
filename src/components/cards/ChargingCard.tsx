import { Leaf, PlugZap } from 'lucide-react';

interface ChargingCardProps {
  currentPower: number;
  batteryLevel: number;
}

export default function ChargingCard({ currentPower, batteryLevel }: ChargingCardProps) {
  const batteryCapacityKWh = 75;
  const remainingKwh = (batteryCapacityKWh * batteryLevel) / 100;
  const neededKwh = batteryCapacityKWh - remainingKwh;
  const powerToUse = currentPower > 0 ? currentPower : 1; 
  const timeLeftMins = Math.round((neededKwh / powerToUse) * 60);
  const circleProgress = 100 - batteryLevel;

  return (
  <section className="group col-span-12 lg:col-span-6 bg-ev-card rounded-2xl p-6 md:p-8 h-full min-h-[300px] flex flex-col md:flex-row items-center gap-8 shadow-lg hover:shadow-ev-accent/10 transition-all duration-500 border border-transparent hover:border-ev-accent/20"> 
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
        <h2 className="text-gray-400 text-xs font-semibold uppercase mb-8 group-hover:text-ev-accent transition-colors">Full Charging</h2>
        
        <div 
          className="relative w-40 h-40 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500"
          style={{ background: `conic-gradient(#84cc16 ${batteryLevel}%, #181a25 0)` }}
        >
          <div className="w-32 h-32 bg-ev-card rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-4xl font-bold text-white group-hover:text-ev-accent transition-colors">{timeLeftMins}</span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">min left</span>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex justify-around md:flex-col md:gap-10">
        <div className="group/item cursor-default">
          <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter mb-1">Efficiency</div>
          <div className="text-xl text-white font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
            <Leaf className="text-ev-accent w-5 h-5 animate-bounce" /> 94.2%
          </div>
        </div>
        <div className="group/item cursor-default">
          <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter mb-1">Remaining</div>
          <div className="text-xl text-white font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
            <PlugZap className="text-ev-accent w-5 h-5 group-hover:rotate-12 transition-transform" /> 
            {remainingKwh.toFixed(1)} kWh
          </div>
        </div>
      </div>
    </section>
  );
}