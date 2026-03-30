import { useTheme } from '../hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';
import {
  Car,
  X,
  PieChart,
  LineChart,
  Sun,
  Moon,
  Settings
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const isDashboard = location.pathname === '/';
  const isStatistic = location.pathname === '/statistic';

  return (
    <aside className={`fixed inset-y-0 left-0 w-64 bg-ev-sidebar flex flex-col z-50 shadow-2xl transition-transform duration-300 md:relative md:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      
      <div className="h-20 flex items-center px-6 gap-3">
        <div className="w-10 h-10 bg-ev-accent rounded-xl flex items-center justify-center">
          <Car className="text-ev-sidebar w-5 h-5" />
        </div>

        <span className="font-bold text-base tracking-wide text-gray-100"> EV Monitor </span>

        <button onClick={onClose} className="md:hidden ml-auto text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 mt-4 space-y-1">
        
        <Link 
          to="/" 
          className={`flex items-center px-6 py-4 relative group transition-all ${
            isDashboard
              ? 'text-white bg-white/5'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {isDashboard && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-ev-accent"></div>
          )}

          <PieChart className={`mr-4 w-5 h-5 ${isDashboard ? 'text-ev-accent' : ''}`} /> Dashboard
        </Link>
        
        <Link 
          to="/statistic" 
          className={`flex items-center px-6 py-4 relative group transition-all ${
            isStatistic
              ? 'text-white bg-white/5'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {isStatistic && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-ev-accent"></div>
          )}

          <LineChart className={`mr-4 w-5 h-5 ${isStatistic ? 'text-ev-accent' : ''}`} /> Statistic
        </Link>

        <div onClick={toggleTheme} className="flex items-center px-6 py-4 text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
          {isDark ? (
            <Sun className="mr-4 w-5 h-5" />
          ) : (
            <Moon className="mr-4 w-5 h-5" />
          )}

          <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
        </div>
        
        <a href="#" className="flex items-center px-6 py-4 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings className="mr-4 w-5 h-5" /> Settings
        </a>
      </nav>
    </aside>
  );
}