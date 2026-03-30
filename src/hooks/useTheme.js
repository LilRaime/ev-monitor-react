import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === null) 
      return true; 
    
    return savedTheme === 'dark';
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('no-transition');
    
    if (isDark) {
      html.classList.add('dark-bg');
      html.classList.remove('light-bg');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.add('light-bg');
      html.classList.remove('dark-bg');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return { isDark, toggleTheme };
}