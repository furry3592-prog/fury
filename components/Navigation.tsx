import React from 'react';
import { LayoutDashboard, GraduationCap, FolderOpen, BookOpen } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Головна', icon: LayoutDashboard },
    { id: 'grader', label: 'Перевірка ШІ', icon: GraduationCap },
    { id: 'folder', label: 'Мої Папки', icon: FolderOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-2 md:relative md:w-64 md:h-screen md:border-t-0 md:border-r flex md:flex-col justify-around md:justify-start gap-2 z-50">
      <div className="hidden md:flex flex-col items-center p-6 mb-6">
        <div className="bg-primary-500 text-white p-3 rounded-2xl mb-3 shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
          <BookOpen size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Юний Ученик</h1>
        <p className="text-xs text-slate-500 mt-1">Автор: Артем Процко</p>
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id as ViewState)}
            className={`flex flex-col md:flex-row items-center md:px-6 md:py-4 rounded-xl transition-all duration-200 flex-1 md:flex-none
              ${isActive 
                ? 'text-primary-600 bg-primary-50 md:bg-white md:border-r-4 md:border-primary-500' 
                : 'text-slate-500 hover:text-primary-500 hover:bg-slate-50'
              }`}
          >
            <Icon size={24} className={`mb-1 md:mb-0 md:mr-3 ${isActive ? 'fill-current opacity-20' : ''}`} />
            <span className={`text-xs md:text-base font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
          </button>
        );
      })}
      
      <div className="hidden md:block mt-auto p-6">
        <div className="bg-gradient-to-br from-accent-400 to-accent-500 rounded-xl p-4 text-white shadow-lg">
          <p className="font-bold text-sm mb-1">Потрібна допомога?</p>
          <p className="text-xs opacity-90 mb-3">Завантажуй фото зошита для миттєвої оцінки!</p>
          <button 
            onClick={() => onChangeView('grader')}
            className="w-full bg-white text-accent-500 text-xs font-bold py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Почати
          </button>
        </div>
      </div>
    </nav>
  );
};