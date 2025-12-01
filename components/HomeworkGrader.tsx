import React, { useState, useRef } from 'react';
import { Upload, Camera, Check, AlertCircle, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { Subject, AnalysisResult } from '../types';
import { analyzeHomework } from '../services/geminiService';

export const HomeworkGrader: React.FC = () => {
  const [grade, setGrade] = useState<number>(5);
  const [subject, setSubject] = useState<Subject>(Subject.MATH);
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Файл занадто великий. Максимум 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
        setResult(null); // Reset previous results
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Extract base64 data without prefix
      const base64Data = image.split(',')[1];
      const analysis = await analyzeHomework(base64Data, subject, grade);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Сталася невідома помилка");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pb-24 md:pb-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Sparkles className="text-accent-500 fill-current" />
          Розумна Перевірка
        </h2>
        <p className="text-slate-500 mt-1">Завантаж фото зошита та отримай миттєву оцінку від штучного інтелекту</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Input Controls */}
        <div className="space-y-6">
          
          {/* Settings Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-4 text-slate-700">Налаштування</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Обери клас</label>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`w-10 h-10 flex-shrink-0 rounded-lg font-bold transition-all ${
                        grade === g 
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-110' 
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Предмет</label>
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as Subject)}
                  className="w-full p-3 rounded-xl bg-slate-50 border-none text-slate-700 font-medium focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  {Object.values(Subject).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-3 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all group bg-white h-64"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary-500">
                <Camera size={32} />
              </div>
              <h4 className="font-bold text-lg text-slate-700 group-hover:text-primary-600">Завантажити фото</h4>
              <p className="text-sm text-slate-400 mt-1 max-w-xs">Натисни сюди або перетягни файл зошита</p>
            </div>
          ) : (
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white">
              <img src={image} alt="Homework" className="w-full h-auto object-cover max-h-96" />
              {!isAnalyzing && !result && (
                <button 
                  onClick={handleReset}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur text-red-500 p-2 rounded-full hover:bg-white shadow-md"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Action Button */}
          {image && !result && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${
                isAnalyzing 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-primary-500/25 hover:-translate-y-1'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin" /> Перевіряю...
                </>
              ) : (
                <>
                  <Sparkles size={20} /> Оцінити роботу
                </>
              )}
            </button>
          )}
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-100">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
        </div>

        {/* Right Column: Results */}
        <div className="space-y-6">
          {result ? (
            <div className="animate-fade-in space-y-6">
              {/* Score Card */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
                <div className="p-8 text-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Оцінка</span>
                  <div className="flex items-center justify-center my-4">
                    <span className={`text-7xl font-black ${
                      result.score >= 10 ? 'text-green-500' :
                      result.score >= 7 ? 'text-blue-500' : 'text-orange-500'
                    }`}>
                      {result.score}
                    </span>
                    <span className="text-3xl text-slate-300 font-bold ml-2">/ 12</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">"{result.summary}"</p>
                </div>
              </div>

              {/* Corrections List */}
              {result.corrections.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                    <AlertCircle className="text-orange-500" size={20} />
                    Знайдені помилки
                  </h3>
                  <div className="space-y-4">
                    {result.corrections.map((item, index) => (
                      <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-mono line-through opacity-80 decoration-2">
                            {item.original}
                          </span>
                          <ArrowRight size={16} className="text-slate-400 hidden sm:block" />
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-mono font-bold">
                            {item.correction}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2 pl-1 border-l-2 border-primary-200">
                          {item.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600">
                    <Check size={32} />
                  </div>
                  <h3 className="font-bold text-green-800 text-lg">Чудова робота!</h3>
                  <p className="text-green-600">Штучний інтелект не знайшов жодної помилки.</p>
                </div>
              )}

              <button 
                onClick={handleReset}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors"
              >
                Перевірити іншу роботу
              </button>
            </div>
          ) : (
            /* Placeholder State for Right Column */
            <div className="hidden md:flex h-full flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-3xl p-8 text-center bg-slate-50/50">
              <div className="w-32 h-32 rounded-full bg-white mb-6 flex items-center justify-center shadow-sm">
                <Sparkles size={48} className="opacity-30" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">Тут будуть результати</h3>
              <p className="max-w-xs">Обери клас, предмет та завантаж фото, щоб побачити магію ШІ в дії!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
