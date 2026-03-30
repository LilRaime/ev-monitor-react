import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react';

export default function PowerCard({ currentPower }) {
  return (
    <section className="group col-span-12 sm:col-span-6 md:col-span-3 bg-ev-card rounded-2xl p-6 h-40 flex flex-col justify-between shadow-lg hover:shadow-ev-accent/20 hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-ev-accent/30">
      
      <div className="flex justify-between items-start">
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider group-hover:text-ev-accent transition-colors">
          Current Power
        </h2>
        
        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-all duration-300">
          <Zap className="text-yellow-500 w-5 h-5 group-hover:scale-125 transition-all duration-300" />
        </div>
      </div>
      
      <div className="text-3xl font-bold text-gray-100 group-hover:text-white transition-colors tabular-nums">
        {currentPower ? currentPower.toFixed(1) : '0.0'} kW
      </div>
      
    </section>
  );
}