
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { BookOpen, ArrowLeft, MessageSquare, Mic, Info } from 'lucide-react';

export const Home = () => {
  const { lessons } = useData();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="relative bg-slate-900 overflow-hidden pb-32 pt-40 lg:pt-48">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-900/50 to-slate-900"></div>
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-teal-600/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 animate-fade-in backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            منصة تعليمية تفاعلية
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            ارتقِ بمهارات <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">التواصل</span>
            <br />
            <span className="text-slate-400 text-2xl md:text-4xl font-medium mt-4 block">بلغة الضاد والاحترافية المهنية</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            مساحتك الخاصة في ISTA TATA لتطوير قدراتك في الكتابة الوظيفية، الإلقاء، وفنون الحوار المهني.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#courses" className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transform hover:-translate-y-1 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              تصفح الدروس
            </a>
            <Link to="/" className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-all cursor-default flex items-center gap-2">
              <Info className="h-5 w-5 text-indigo-400" />
              التقنيات المستخدمة
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-20 -mt-16 mb-20">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-100 dark:divide-slate-700">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 mb-3">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{lessons.length}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">وحدة دراسية متكاملة</span>
          </div>
          <div className="flex flex-col items-center text-center pt-8 md:pt-0">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-full text-indigo-600 dark:text-indigo-400 mb-3">
              <MessageSquare className="h-6 w-6" />
            </div>
            <span className="text-3xl font-bold text-slate-900 dark:text-white">100%</span>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">محتوى عربي متخصص</span>
          </div>
          <div className="flex flex-col items-center text-center pt-8 md:pt-0">
            <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-full text-teal-600 dark:text-teal-400 mb-3">
              <Mic className="h-6 w-6" />
            </div>
            <span className="text-3xl font-bold text-slate-900 dark:text-white">عملي</span>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">تمارين تفاعلية</span>
          </div>
        </div>
      </div>

      <div id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">المسارات التعليمية</h2>
            <p className="text-slate-500 dark:text-slate-400">اختر الوحدة التي تناسب احتياجاتك التدريبية</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <Link 
              key={lesson.id} 
              to={`/lesson/${lesson.id}`}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col h-full transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                <img 
                  src={lesson.image} 
                  alt={lesson.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm border border-white/20">
                    {lesson.module}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {lesson.title}
                </h3>
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <BookOpen className="h-4 w-4" />
                    <span>{lesson.resources.length} دروس</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-[-4px] transition-transform">
                    تصفح المحتوى <ArrowLeft className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
