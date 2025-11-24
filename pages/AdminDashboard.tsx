import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { ResourceType, Resource, User } from '../types';
import { Plus, Trash2, Edit2, FileText, Zap, Presentation, Users, Settings, BarChart, FolderPlus, ChevronLeft, Upload, X } from 'lucide-react';

export const AdminDashboard = () => {
  const { lessons, addLesson, deleteLesson, addResource, updateResource, deleteResource } = useData();
  const { allUsers, addUser, updateUser, deleteUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'content' | 'users' | 'statistics' | 'settings'>('content');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(lessons[0]?.id || null);
  const [view, setView] = useState<'list' | 'resource-form' | 'lesson-form' | 'user-form'>('list');
  
  // Resource Form State
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [resTitle, setResTitle] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resType, setResType] = useState<ResourceType>('text');
  const [resContent, setResContent] = useState('');
  const [resUrl, setResUrl] = useState('');

  // Lesson Form State
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonModule, setLessonModule] = useState('');
  const [lessonImage, setLessonImage] = useState('');

  // User Form State
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userSpec, setUserSpec] = useState('');

  useEffect(() => {
    if (!selectedLesson && lessons.length > 0) {
      setSelectedLesson(lessons[0].id);
    }
  }, [lessons, selectedLesson]);

  const activeLesson = lessons.find(l => l.id === selectedLesson);
  const trainees = allUsers.filter(u => u.role === 'trainee');

  // Stats
  const totalTrainees = trainees.length;
  const traineesBySpec = trainees.reduce((acc, curr) => {
    const spec = curr.specialization || 'غير محدد';
    acc[spec] = (acc[spec] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let totalResources = 0;
  const resourcesByType = { text: 0, skill: 0, presentation: 0 };
  lessons.forEach(l => {
    totalResources += l.resources.length;
    l.resources.forEach(r => {
      if (resourcesByType[r.type] !== undefined) resourcesByType[r.type]++;
    });
  });

  const resetForms = () => {
    setResTitle(''); setResDesc(''); setResType('text'); setResContent(''); setResUrl('');
    setLessonTitle(''); setLessonModule(''); setLessonImage('');
    setUserName(''); setUserEmail(''); setUserPass(''); setUserSpec('');
    setEditingResource(null); setEditingUser(null);
    setView('list');
  };

  const handleResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLesson) return;
    
    const resourceData = {
      title: resTitle,
      description: resDesc,
      type: resType,
      content: resContent,
      url: resType === 'presentation' ? resUrl : undefined
    };

    if (editingResource) {
      updateResource(selectedLesson, { ...editingResource, ...resourceData });
    } else {
      addResource(selectedLesson, resourceData);
    }
    resetForms();
  };

  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLesson({
      title: lessonTitle,
      module: lessonModule,
      image: lessonImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
    });
    resetForms();
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser({
        id: editingUser.id,
        name: userName,
        email: userEmail,
        password: userPass,
        role: editingUser.role,
        specialization: userSpec
      });
    } else {
      addUser({
        name: userName,
        email: userEmail,
        password: userPass,
        role: 'trainee',
        specialization: userSpec
      });
    }
    resetForms();
  };

  const startEditResource = (r: Resource) => {
    setEditingResource(r);
    setResTitle(r.title); setResDesc(r.description); setResType(r.type);
    setResContent(r.content); setResUrl(r.url || '');
    setView('resource-form');
  };

  const startEditUser = (u: User) => {
    setEditingUser(u);
    setUserName(u.name); setUserEmail(u.email); setUserPass(u.password || '');
    setUserSpec(u.specialization || '');
    setView('user-form');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">لوحة تحكم المدير</h1>
            <p className="text-gray-500 dark:text-gray-400">مرحباً، عمر أيت لوتو</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex overflow-x-auto max-w-full">
            <button onClick={() => { setActiveTab('content'); setView('list'); }} className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'content' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              <FolderPlus className="h-4 w-4" /> إدارة المحتوى
            </button>
            <button onClick={() => { setActiveTab('users'); setView('list'); }} className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'users' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              <Users className="h-4 w-4" /> إدارة المتدربين
            </button>
            <button onClick={() => { setActiveTab('statistics'); setView('list'); }} className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'statistics' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              <BarChart className="h-4 w-4" /> الإحصائيات
            </button>
          </div>
        </div>

        {activeTab === 'statistics' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">إجمالي المتدربين</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{totalTrainees}</h3>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full text-blue-600 dark:text-blue-400">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">الوحدات الدراسية</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{lessons.length}</h3>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-full text-purple-600 dark:text-purple-400">
                  <FolderPlus className="h-8 w-8" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">إجمالي الموارد</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{totalResources}</h3>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-full text-green-600 dark:text-green-400">
                  <FileText className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <BarChart className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">توزيع المتدربين حسب التخصص</h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(traineesBySpec).length > 0 ? Object.entries(traineesBySpec).map(([spec, count]) => (
                    <div key={spec} className="relative">
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{spec}</span>
                        <span className="text-gray-900 dark:text-gray-100">{count} متدرب</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(count / totalTrainees) * 100}%` }}></div>
                      </div>
                    </div>
                  )) : <p className="text-gray-500 dark:text-gray-400 text-center py-4">لا يوجد متدربين مسجلين بعد.</p>}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <BarChart className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">إحصائيات الموارد التعليمية</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 ml-4">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">النصوص والمقالات</p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{resourcesByType.text}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/30">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400 ml-4">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-100">المهارات العملية</p>
                      <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{resourcesByType.skill}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-900/30">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 ml-4">
                      <Presentation className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-900 dark:text-purple-100">العروض التقديمية</p>
                      <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{resourcesByType.presentation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">قائمة المتدربين</h2>
              {view === 'list' && (
                <button onClick={() => setView('user-form')} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
                  <Plus className="h-5 w-5" /> إضافة متدرب
                </button>
              )}
            </div>

            {view === 'user-form' ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{editingUser ? 'تعديل بيانات المتدرب' : 'تسجيل متدرب جديد'}</h3>
                  <button onClick={resetForms}><X className="h-5 w-5 text-gray-400" /></button>
                </div>
                <form onSubmit={handleUserSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">الاسم الكامل</label>
                    <input type="text" required value={userName} onChange={e => setUserName(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني</label>
                    <input type="email" required value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">كلمة المرور</label>
                    <input type="text" required value={userPass} onChange={e => setUserPass(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">التخصص</label>
                    <input type="text" required value={userSpec} onChange={e => setUserSpec(e.target.value)} placeholder="مثال: تطوير رقمي" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="pt-4 flex justify-end gap-2">
                    <button type="button" onClick={resetForms} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">إلغاء</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingUser ? 'حفظ التعديلات' : 'حفظ المتدرب'}</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الاسم</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">البريد الإلكتروني</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">التخصص</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الصلاحية</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {allUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.specialization ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">{user.specialization}</span> : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.role === 'admin' ? 'مدير' : 'متدرب'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {user.role !== 'admin' && (
                            <div className="flex gap-2">
                              <button onClick={() => startEditUser(user)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full" title="تعديل"><Edit2 className="h-4 w-4" /></button>
                              <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 p-2 rounded-full" title="حذف"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'content' && (
          <div className="grid lg:grid-cols-4 gap-8 animate-fade-in">
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-24">
                <div className="flex justify-between items-center mb-4 px-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">الوحدات الدراسية</h3>
                  <button onClick={() => setView('lesson-form')} className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-1.5 rounded-md transition-colors">
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {lessons.map(lesson => (
                    <div 
                      key={lesson.id}
                      className={`group flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm transition-all cursor-pointer ${selectedLesson === lesson.id ? 'bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-600 dark:border-blue-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                      onClick={() => { setSelectedLesson(lesson.id); setView('list'); }}
                    >
                      <span className={`font-medium truncate ${selectedLesson === lesson.id ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`}>{lesson.title}</span>
                      <button onClick={(e) => { e.stopPropagation(); deleteLesson(lesson.id); if (selectedLesson === lesson.id) setSelectedLesson(null); }} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {view === 'list' && (
                <div className="flex justify-end mb-4">
                  {selectedLesson && (
                    <button onClick={() => setView('resource-form')} className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm font-bold">
                      <Plus className="h-5 w-5" /> إضافة مورد
                    </button>
                  )}
                </div>
              )}

              {view === 'lesson-form' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">إضافة وحدة جديدة</h2>
                    <button onClick={resetForms}><X className="h-6 w-6 text-gray-400" /></button>
                  </div>
                  <form onSubmit={handleLessonSubmit} className="space-y-4">
                    <input type="text" required value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} placeholder="عنوان الوحدة" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5" />
                    <input type="text" required value={lessonModule} onChange={e => setLessonModule(e.target.value)} placeholder="الرمز (M01)" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5" />
                    <input type="url" value={lessonImage} onChange={e => setLessonImage(e.target.value)} placeholder="رابط الصورة (اختياري)" dir="ltr" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5 text-left" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">حفظ</button>
                  </form>
                </div>
              )}

              {view === 'resource-form' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingResource ? 'تعديل' : 'إضافة'} مورد</h2>
                    <button onClick={resetForms}><X className="h-6 w-6 text-gray-400" /></button>
                  </div>
                  <form onSubmit={handleResourceSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input type="text" required value={resTitle} onChange={e => setResTitle(e.target.value)} placeholder="العنوان" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5" />
                      <select value={resType} onChange={e => setResType(e.target.value as ResourceType)} className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5">
                        <option value="text">نص</option>
                        <option value="skill">مهارة</option>
                        <option value="presentation">عرض</option>
                      </select>
                    </div>
                    <input type="text" value={resDesc} onChange={e => setResDesc(e.target.value)} placeholder="وصف مختصر" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5" />
                    <textarea rows={5} required value={resContent} onChange={e => setResContent(e.target.value)} placeholder="المحتوى" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5" />
                    {resType === 'presentation' && (
                      <input type="url" value={resUrl} onChange={e => setResUrl(e.target.value)} placeholder="رابط الملف" dir="ltr" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2.5 text-left" />
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">حفظ</button>
                  </form>
                </div>
              )}

              {view === 'list' && activeLesson && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {activeLesson.resources.map(resource => (
                      <div key={resource.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-start justify-between group">
                        <div className="flex gap-4">
                          <div className={`p-3 rounded-lg h-fit mt-1 ${
                            resource.type === 'text' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                            resource.type === 'skill' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                            'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                          }`}>
                            {resource.type === 'text' && <FileText className="h-5 w-5" />}
                            {resource.type === 'skill' && <Zap className="h-5 w-5" />}
                            {resource.type === 'presentation' && <Presentation className="h-5 w-5" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{resource.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{resource.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => startEditResource(resource)} className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-full"><Edit2 className="h-5 w-5" /></button>
                          <button onClick={() => deleteResource(activeLesson.id, resource.id)} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full"><Trash2 className="h-5 w-5" /></button>
                        </div>
                      </div>
                    ))}
                    {activeLesson.resources.length === 0 && (
                      <div className="p-8 text-center text-gray-400">لا توجد موارد.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};