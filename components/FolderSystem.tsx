import React, { useState } from 'react';
import { Folder, Plus, FileText, MoreVertical, Calendar, FolderOpen } from 'lucide-react';
import { Folder as FolderType, Subject, HomeworkFile } from '../types';

export const FolderSystem: React.FC = () => {
  const [folders, setFolders] = useState<FolderType[]>([
    {
      id: '1',
      name: 'Математика',
      color: 'bg-blue-100 text-blue-600',
      icon: 'calculator',
      files: [
        { id: 'f1', title: 'Дроби та відсотки', subject: Subject.MATH, date: '2023-10-24', score: 10 },
        { id: 'f2', title: 'Контрольна робота №2', subject: Subject.MATH, date: '2023-10-20', score: 11 },
      ]
    },
    {
      id: '2',
      name: 'Українська мова',
      color: 'bg-yellow-100 text-yellow-600',
      icon: 'book',
      files: [
        { id: 'f3', title: 'Твір "Моя родина"', subject: Subject.UKR_LANG, date: '2023-10-22', score: 9 },
      ]
    },
    {
      id: '3',
      name: 'Англійська',
      color: 'bg-purple-100 text-purple-600',
      icon: 'globe',
      files: []
    }
  ]);

  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  const activeFolder = folders.find(f => f.id === activeFolderId);

  return (
    <div className="p-6 max-w-6xl mx-auto pb-24 md:pb-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Мої Папки</h2>
          <p className="text-slate-500">Організуй свої домашні завдання тут</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-md">
          <Plus size={20} />
          <span className="hidden sm:inline">Нова папка</span>
        </button>
      </header>

      {!activeFolder ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => setActiveFolderId(folder.id)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary-200 transition-all group text-left"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${folder.color}`}>
                <Folder size={24} className="fill-current opacity-80" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-primary-600 transition-colors">
                {folder.name}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {folder.files.length} {folder.files.length === 1 ? 'файл' : 'файлів'}
              </p>
            </button>
          ))}
          
          <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-primary-300 hover:text-primary-500 transition-all">
            <Plus size={32} className="mb-2" />
            <span className="font-medium">Додати предмет</span>
          </button>
        </div>
      ) : (
        <div className="animate-fade-in">
          <button 
            onClick={() => setActiveFolderId(null)}
            className="mb-6 text-slate-500 hover:text-primary-600 flex items-center gap-2 font-medium"
          >
            ← Назад до папок
          </button>
          
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className={`p-8 ${activeFolder.color} bg-opacity-30`}>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm ${activeFolder.color}`}>
                  <Folder size={32} className="fill-current" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">{activeFolder.name}</h2>
                  <p className="opacity-70 font-medium">Архів робіт</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {activeFolder.files.length > 0 ? (
                <div className="space-y-3">
                  {activeFolder.files.map(file => (
                    <div key={file.id} className="flex items-center p-4 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all group">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 mr-4 group-hover:text-primary-500">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">{file.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1"><Calendar size={12}/> {file.date}</span>
                          <span>•</span>
                          <span>{file.subject}</span>
                        </div>
                      </div>
                      {file.score && (
                        <div className={`px-3 py-1 rounded-full font-bold text-sm mr-4 ${
                          file.score >= 10 ? 'bg-green-100 text-green-700' : 
                          file.score >= 7 ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {file.score} / 12
                        </div>
                      )}
                      <button className="text-slate-300 hover:text-slate-600">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FolderOpen size={40} className="opacity-50" />
                  </div>
                  <p className="text-lg font-medium">Папка порожня</p>
                  <p className="text-sm">Завантаж сюди свої перші роботи через меню Перевірки!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};