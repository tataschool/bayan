
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Moon, Sun, LogOut, Menu, X, Shield, User as UserIcon, Info, LogIn, BookOpen, Download, Upload } from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout, allUsers, importUsers } = useAuth();
  const { lessons, importLessons } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') !== 'light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleExport = () => {
    const data = {
      users: allUsers,
      lessons: lessons,
      metadata: {
        version: "1.0",
        exportDate: new Date().toISOString(),
        exportedBy: user?.email
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bayan_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (data.users && Array.isArray(data.users)) {
        await importUsers(data.users);
      }
      
      if (data.lessons && Array.isArray(data.lessons)) {
        await importLessons(data.lessons);
      }

      alert('تم استيراد البيانات بنجاح!');
      // Refresh page to ensure everything is synced visually if needed, though context updates should handle it.
      // navigate(0); 
    } catch (error) {
      console.error("Import error:", error);
      alert('حدث خطأ أثناء استيراد الملف. تأكد من صحة الملف.');
    } finally {
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm py-2' 
          : 'bg-transparent border-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-sm bg-indigo-600 p-2 flex items-center justify-center">
                <span className="text-white font-bold text-xl">ب</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-xl tracking-tight leading-none transition-colors ${scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white md:text-white'}`}>
                  منصة بيان
                </span>
                <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${scrolled ? 'text-indigo-600 dark:text-indigo-400' : 'text-indigo-600 dark:text-indigo-400 md:text-indigo-200'}`}>
                  ISTA TATA
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-colors ${
                  scrolled 
                    ? 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800' 
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {user && (
                <div className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border backdrop-blur-sm ${
                  scrolled 
                    ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700' 
                    : 'bg-white/10 text-white border-white/20'
                }`}>
                  <UserIcon className="h-4 w-4" />
                  <span className="font-medium">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full mr-1 shadow-sm">
                      مدير
                    </span>
                  )}
                </div>
              )}

              <Link 
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md ${
                  location.pathname === '/'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : scrolled ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Info className="h-4 w-4" />
                عن المنصة
              </Link>

              {user && (
                <Link 
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md ${
                    location.pathname.includes('/dashboard') || location.pathname.includes('/lesson')
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : scrolled ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  الدروس
                </Link>
              )}

              {user?.role === 'admin' && (
                <>
                  <Link 
                    to={location.pathname.includes('/admin') ? '/dashboard' : '/admin'}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md ${
                      location.pathname.includes('/admin')
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : scrolled ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    {location.pathname.includes('/admin') ? 'العودة للدروس' : 'لوحة التحكم'}
                  </Link>
                  
                  {/* Admin Data Controls */}
                  <div className={`flex items-center border-r border-l ${scrolled ? 'border-slate-200 dark:border-slate-700' : 'border-white/20'} px-2 mx-1`}>
                    <button 
                      onClick={handleImportClick}
                      className={`p-2 rounded-full transition-colors ${
                        scrolled 
                          ? 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800' 
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                      title="استيراد البيانات"
                    >
                      <Upload className="h-5 w-5" />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="application/json"
                    />
                    <button 
                      onClick={handleExport}
                      className={`p-2 rounded-full transition-colors ${
                        scrolled 
                          ? 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800' 
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                      title="تصدير البيانات"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </>
              )}

              {user ? (
                <button 
                  onClick={handleLogout}
                  className={`p-2 rounded-full transition-colors ${
                    scrolled 
                      ? 'text-slate-400 hover:text-red-600 hover:bg-red-50' 
                      : 'text-slate-300 hover:text-red-400 hover:bg-white/10'
                  }`}
                  title="تسجيل الخروج"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md ${
                    scrolled ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20' : 'bg-white text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  دخول الأعضاء
                </Link>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-4 shadow-lg animate-fade-in">
            <div className="flex flex-col gap-4">
              {user && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>
                </div>
              )}
              
              <Link 
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
              >
                <Info className="h-5 w-5" />
                عن المنصة
              </Link>

              {user && (
                <Link 
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
                >
                  <BookOpen className="h-5 w-5" />
                  الدروس
                </Link>
              )}

              {user?.role === 'admin' && (
                <>
                  <Link 
                    to={location.pathname.includes('/admin') ? '/dashboard' : '/admin'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium"
                  >
                    <Shield className="h-5 w-5" />
                    {location.pathname.includes('/admin') ? 'الواجهة الرئيسية' : 'لوحة التحكم'}
                  </Link>
                  <div className="flex gap-2">
                     <button 
                        onClick={handleImportClick}
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        <Upload className="h-5 w-5" /> استيراد
                      </button>
                      <button 
                        onClick={handleExport}
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        <Download className="h-5 w-5" /> تصدير
                      </button>
                  </div>
                </>
              )}

              {user ? (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  تسجيل الخروج
                </button>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-medium"
                >
                  <LogIn className="h-5 w-5" />
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-right">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">© 2025 المعهد المتخصص للتكنولوجيا التطبيقية طاطا (ISTA TATA)</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">جميع الحقوق محفوظة لمنصة بيان التعليمية.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">تطوير وإنجاز:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                عمر أيت لوتو
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
