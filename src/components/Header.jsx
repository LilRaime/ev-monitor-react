import { useClock } from '../hooks/useClock';
import { useLocation } from 'react-router-dom';
import { Menu, CalendarCheck, User } from 'lucide-react';

export default function Header({ onOpenSidebar }) {
  const clockText = useClock();
  const location = useLocation();

  const pageTitle = location.pathname === '/statistic' 
    ? 'Detailed Statistic' 
    : 'Dashboard Overview';

  return (
    <header className="h-20 bg-ev-sidebar flex items-center justify-between px-4 md:px-8 z-30 shrink-0 border-b border-white/5">
      <div className="flex items-center gap-4 min-w-0">
        <button 
          onClick={onOpenSidebar} 
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight truncate">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-4 md:gap-8 shrink-0">
        
        <div className="hidden sm:flex items-center gap-3 text-gray-400">
          <CalendarCheck className="w-5 h-5 text-gray-500" />
          <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-tight">
            {clockText}
          </div>
        </div>

        <div className="w-10 h-10 rounded-full bg-ev-accent flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-[0_0_15px_rgba(132,204,22,0.3)]">
          <User className="w-6 h-6 text-ev-sidebar" />
        </div>
      </div>
    </header>
  );
}