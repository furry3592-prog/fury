import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomeworkGrader } from './components/HomeworkGrader';
import { FolderSystem } from './components/FolderSystem';
import { ViewState } from './types';
import { GraduationCap } from 'lucide-react';

const Dashboard: React.FC<{ onViewChange: (v: ViewState) => void }> = ({ onViewChange }) => {
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto pb-24 md:pb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
          <GraduationCap size={40} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Юний Ученик</h1>
          <p className="text-lg text-slate-500 font-medium">Твій персональний помічник у навчанні</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div 
          onClick={() => onViewChange('grader')}
          className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 text-white shadow-xl shadow-primary-500/20 cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Перевірити ДЗ</h2>
            <p className="opacity-90 mb-6 text-lg max-w-xs">Миттєва оцінка та виправлення помилок за допомогою ШІ.</p>
            <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-bold shadow-sm group-hover:shadow-md transition-all">
              Почати
            </button>
          </div>
        </div>

        <div 
          onClick={() => onViewChange('folder')}
          className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm cursor-pointer hover:border-primary-300 hover:shadow-md transition-all group"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Мої Папки</h2>
          <p className="text-slate-500 mb-6 text-lg">Зберігай та організовуй свої роботи з математики, мови та інших предметів.</p>
          <div className="flex gap-3">
             <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><span className="font-bold">М</span></div>
             <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600"><span className="font-bold">У</span></div>
             <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><span className="font-bold">І</span></div>
             <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-bold">+</div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-slate-100 rounded-2xl p-6 text-center text-slate-400 text-sm">
        <p>© 2024 Юний Ученик. Створено Артемом Процком для полегшення навчання.</p>
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Navigation currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto h-screen">
        {currentView === 'dashboard' && <Dashboard onViewChange={setCurrentView} />}
        {currentView === 'grader' && <HomeworkGrader />}
        {currentView === 'folder' && <FolderSystem />}
      </main>
    </div>
  );
}
