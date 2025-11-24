
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, Info } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950" dir="rtl">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative z-10">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <span className="text-white font-bold text-2xl">ب</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">منصة بيان</h2>
              <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">ISTA TATA</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">مرحباً بك مجدداً</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">سجل دخولك للمتابعة إلى فضائك التعليمي.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pr-10 pl-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="name@ista.ma"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                كلمة المرور
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pr-10 pl-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-start gap-3">
                <div className="p-1 bg-red-100 dark:bg-red-900/50 rounded-full text-red-600 dark:text-red-400 mt-0.5">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-sm text-red-600 dark:text-red-300 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-600/20 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5"
            >
              تسجيل الدخول <ArrowLeft className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              <Info className="w-4 h-4" />
              العودة لمعلومات المنصة
            </Link>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-slate-950 text-slate-500">بيانات تجريبية</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 mb-1">المدير</p>
                <code className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">omar.aitloutou@ista.ma</code>
                <br />
                <code className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">admin</code>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 mb-1">المتدرب</p>
                <code className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">student@ista.ma</code>
                <br />
                <code className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 relative bg-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-slate-900/90"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="relative z-10 flex flex-col justify-between p-20 text-white w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-indigo-100 mb-6">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              <span>بوابة التعليم الرقمي</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              اصقل مهاراتك في<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-cyan-200">التواصل المهني</span>
            </h1>
            <p className="text-lg text-indigo-100/80 max-w-md leading-relaxed">
              منصة "بيان" تمنحك الأدوات والموارد اللازمة لتطوير لغتك العربية ومهارات الإلقاء، لتكون مستعداً لسوق العمل بثقة واقتدار.
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <p className="text-sm text-indigo-200/60">© 2025 ISTA TATA</p>
            <div className="flex items-center gap-2 text-sm text-indigo-200/80">
              <span>تطوير:</span>
              <span className="font-bold text-white">عمر أيت لوتو</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
