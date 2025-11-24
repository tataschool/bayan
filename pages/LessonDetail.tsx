
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { ArrowRight, FileText, Download, Presentation, Zap, BookOpen, Clock, ExternalLink } from 'lucide-react';
import { Resource } from '../types';
import AiTutor from '../components/AiTutor';

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const config = {
    text: { icon: FileText, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', label: 'قراءة' },
    skill: { icon: Zap, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400', label: 'تمرين عملي' },
    presentation: { icon: Presentation, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400', label: 'عرض تقديمي' },
  };

  const conf = config[resource.type];
  const Icon = conf.icon;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 transition-all duration-300 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900 group relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 ${conf.color.split(' ')[0].replace('bg-', 'bg-opacity-100 bg-')}`}></div>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${conf.color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2 py-1 rounded-md">
          {conf.label}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {resource.title}
      </h3>
      
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-5 line-clamp-2 leading-relaxed">
        {resource.description}
      </p>
      
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-5 border border-slate-100 dark:border-slate-700/50">
        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 italic">
          "{resource.content.length > 120 ? resource.content.substring(0, 120) + '...' : resource.content}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span>{resource.createdAt}</span>
        </div>
        
        {resource.url ? (
          <a href={resource.url} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 text-sm font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
            <Download className="h-4 w-4" />
            تحميل الملف
          </a>
        ) : (
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            قراءة المزيد <ExternalLink className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { lessons } = useData();
  const lesson = lessons.find(l => l.id === id);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">الدرس غير موجود</h2>
          <Link to="/dashboard" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">العودة للدروس</Link>
        </div>
      </div>
    );
  }

  // Context for the AI Tutor
  const lessonContext = `
    المتدرب يستعرض حالياً وحدة: ${lesson.title}.
    رمز الوحدة: ${lesson.module}.
    عدد الموارد في الوحدة: ${lesson.resources.length}.
    عناوين الموارد: ${lesson.resources.map(r => r.title).join(', ')}.
  `;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* AI Tutor Integration */}
      <AiTutor context={lessonContext} />

      <div className="relative h-[40vh] min-h-[300px] bg-slate-900 overflow-hidden">
        <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        
        <div className="absolute bottom-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <Link to="/dashboard" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors font-medium group backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full w-fit">
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              العودة للقائمة الرئيسية
            </Link>
            
            <div className="flex items-start gap-4 flex-col md:flex-row md:items-end justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-bold mb-3 backdrop-blur-md">
                  {lesson.module}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">{lesson.title}</h1>
                <p className="text-slate-300 max-w-2xl text-lg">استكشف الموارد التعليمية والتمارين المتاحة لهذه الوحدة.</p>
              </div>
              
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="text-center px-4 border-l border-white/10">
                  <span className="block text-2xl font-bold text-white">{lesson.resources.length}</span>
                  <span className="text-xs text-slate-400">موارد</span>
                </div>
                <div className="text-center px-2">
                  <BookOpen className="h-8 w-8 text-indigo-400 mx-auto mb-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-t-3xl shadow-xl border-x border-t border-slate-200 dark:border-slate-800 min-h-[500px] p-6 md:p-10">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">محتويات الوحدة</h2>
          </div>

          {lesson.resources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lesson.resources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-full mb-4">
                <BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">لا توجد موارد حالياً</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md">لم يتم إضافة أي محتوى لهذه الوحدة بعد. يرجى مراجعة المدير أو العودة لاحقاً.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
