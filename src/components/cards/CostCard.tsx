import { useState } from 'react';
import { useCost } from '../../hooks/useCost';
import { CircleDollarSign } from 'lucide-react';

export default function CostCard({ chartData }: { chartData: number[] }) {
  const [tariff, setTariff] = useState<number | string>(7.20);
  const totalCost = useCost(chartData, tariff);
  const isInvalid = isNaN(Number(tariff)) || Number(tariff) <= 0;

  return (
    <section className="group col-span-12 md:col-span-6 bg-ev-card rounded-2xl p-6 h-40 flex flex-col shadow-lg hover:shadow-ev-accent/10 hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-ev-accent/30">
      <div className="flex justify-between items-start mb-auto">
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider group-hover:text-ev-accent transition-colors">Cost & Tariff</h2>
        <CircleDollarSign className="text-gray-500 group-hover:text-ev-accent transition-colors w-5 h-5" />
      </div>
      <div className="flex justify-between md:justify-start md:gap-12 items-end">
        <div>
          <div className="text-gray-500 text-xs uppercase font-bold mb-1">Total Cost</div>
          <div className="text-2xl font-bold text-gray-100 group-hover:text-ev-accent transition-colors">
            {totalCost.toFixed(2)} ₴
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-xs uppercase font-bold mb-1">Tariff ₴/kWh</div>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={tariff}
            onChange={(e) => setTariff(e.target.value)}
            className={`w-24 bg-ev-darker border ${isInvalid ? 'border-red-500' : 'border-white/10'} text-white font-bold text-lg rounded-lg px-3 py-1 focus:outline-none focus:border-ev-accent transition-colors tabular-nums`}
          />
        </div>
      </div>
    </section>
  );
}