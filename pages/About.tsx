
import React from 'react';
import { 
  Cpu, 
  Code2, 
  Globe, 
  Database, 
  Zap, 
  Layout, 
  ShieldCheck, 
  Rocket, 
  BrainCircuit,
  Layers,
  Palette,
  Smartphone,
  Lock,
  Key,
  Server,
  FileKey,
  Shield
} from 'lucide-react';

export const About = () => {
  const techStack = [
    {
      icon: Code2,
      title: "React 19 & TypeScript",
      desc: "مبنية على أحدث إصدارات React مع ضمان الأمان النوعي (Type Safety) لأداء مستقر وقابلية صيانة عالية.",
      color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Palette,
      title: "Tailwind CSS",
      desc: "نظام تصميم عصري وسريع الاستجابة، يدعم الوضع الليلي (Dark Mode) واللغة العربية (RTL) بشكل أصلي.",
      color: "text-teal-500 bg-teal-50 dark:bg-teal-900/20"
    },
    {
      icon: BrainCircuit,
      title: "Gemini 3 Pro AI",
      desc: "دمج نموذج Google Gemini 3 Pro مع نمط التفكير العميق (Thinking Mode) لتقديم مساعد تعليمي فائق الذكاء.",
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
      icon: Globe,
      title: "React Router v7",
      desc: "تنقل سلس وسريع بين الصفحات (SPA) لتجربة مستخدم تشبه التطبيقات الأصلية.",
      color: "text-red-500 bg-red-50 dark:bg-red-900/20"
    },
    {
      icon: Database,
      title: "LocalStorage Persistence",
      desc: "نظام حفظ بيانات محلي فعال (بدون Backend حالياً) لسهولة النشر والتجربة الفورية، قابل للترقية لقواعد بيانات سحابية.",
      color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20"
    },
    {
      icon: Layers,
      title: "Context API",
      desc: "إدارة حالة التطبيق (State Management) مركزية وسلسة للبيانات والمستخدمين.",
      color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  const securityFeatures = [
    {
      icon: Key,
      title: "دورة حياة المصادقة (Authentication)",
      desc: "عند تسجيل الدخول، يتم إصدار رمز JWT موقع رقمياً (Signed Token) لضمان هوية المستخدم، ويستخدم هذا الرمز في جميع الطلبات اللاحقة للوصول للموارد المحمية."
    },
    {
      icon: Shield,
      title: "التخزين الآمن (Secure Storage)",
      desc: "نعتمد معايير تخزين الرموز في HttpOnly Cookies بدلاً من التخزين المحلي (Local Storage) في بيئة الإنتاج، للحماية الفعالة من هجمات XSS و CSRF."
    },
    {
      icon: Server,
      title: "التحقق والمصداقية (Verification)",
      desc: "يقوم الخادم بالتحقق من صحة توقيع الرمز في كل طلب باستخدام مفاتيح تشفير قوية (مثل RS256) لضمان عدم التلاعب بالبيانات وسلامة الجلسة."
    },
    {
      icon: Lock,
      title: "التشفير والاتصال (HTTPS)",
      desc: "يتم تأمين جميع الاتصالات عبر بروتوكول HTTPS المشفر، مما يمنع هجمات اعتراض البيانات (Man-in-the-middle) ويضمن سرية المعلومات الحساسة."
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "أداء فائق السرعة",
      desc: "تحميل فوري للصفحات بفضل تقنيات الـ Bundling الحديثة (Vite) وتحسين الأصول."
    },
    {
      icon: Smartphone,
      title: "تصميم متجاوب كلياً",
      desc: "تجربة استخدام مثالية على الهواتف، الأجهزة اللوحية، والحواسيب المكتبية."
    },
    {
      icon: ShieldCheck,
      title: "نظام صلاحيات متكامل",
      desc: "لوحات تحكم منفصلة للمدير والمتدرب مع حماية المسارات (Protected Routes)."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300" dir="rtl">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-900/80 to-slate-900"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <Rocket className="w-4 h-4" />
            منصة الجيل القادم التعليمية
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            نظرة تقنية على منصة <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">بيان</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            وثيقة تعريفية شاملة للمستثمرين، المطورين، وشركاء النجاح. نستعرض هنا البنية التحتية، الأدوات المستخدمة، والرؤية المستقبلية للمشروع.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        
        {/* Overview Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Layout className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            نبذة عن المشروع
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            منصة "بيان" ليست مجرد موقع تعليمي، بل هي نظام إدارة تعلم (LMS) مصغر مبني بمعايير هندسة البرمجيات الحديثة. 
            تهدف المنصة إلى سد الفجوة في المحتوى العربي المتخصص في مهارات التواصل المهني، مع توظيف الذكاء الاصطناعي 
            كمساعد شخصي للمتدرب. تم تصميم المنصة لتكون قابلة للتوسع (Scalable)، سهلة الصيانة (Maintainable)، 
            وسريعة الأداء (High Performance).
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            البنية التقنية والأدوات (Tech Stack)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${tech.color}`}>
                  <tech.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{tech.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Architecture Section */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 rounded-lg bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-sm font-bold mb-4">
                ميزة تنافسية
              </div>
              <h2 className="text-3xl font-bold mb-4">الذكاء الاصطناعي المتقدم</h2>
              <p className="text-indigo-100/80 leading-relaxed mb-6 text-lg">
                تتميز المنصة بدمج نموذج <strong>Gemini 3 Pro Preview</strong> مع تفعيل وضع التفكير (Thinking Config) بميزانية تصل إلى <strong>32k tokens</strong>. 
                هذا يسمح للمساعد الذكي "بيان" بفهم سياق الدروس بعمق، وتحليل استفسارات الطلاب المعقدة، وتقديم شروحات دقيقة لغوياً وعلمياً، بدلاً من الردود السطحية.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-indigo-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  سياق متصل بمحتوى الدرس الحالي.
                </li>
                <li className="flex items-center gap-2 text-sm text-indigo-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  دعم كامل للغة العربية الفصحى واللهجات.
                </li>
                <li className="flex items-center gap-2 text-sm text-indigo-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  واجهة محادثة عائمة (Floating UI) لا تقاطع التصفح.
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <Cpu className="w-16 h-16 text-indigo-400 mb-4" />
              <div className="h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-indigo-500 w-[85%] animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
                <div className="h-3 bg-white/10 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Architecture Section - NEW */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center gap-2">
            <ShieldCheck className="w-8 h-8 text-green-600" />
            معايير الأمان والتوثيق (Security Architecture)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {securityFeatures.map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 transition-all hover:border-green-200 dark:hover:border-green-900/30">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-green-600 dark:text-green-400 shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Value & Scalability */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              القيمة الاستثمارية وقابلية التوسع
            </h2>
            <div className="space-y-6">
              {features.map((feat, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{feat.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">جاهزية التحول (Future Proof)</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              تم بناء الكود بنظام (Components) و (Hooks) معزولة، مما يجعل عملية نقل البيانات من LocalStorage إلى قاعدة بيانات سحابية (مثل Firebase أو Supabase) أو ربطها بـ Backend (Node.js/Python) عملية سهلة جداً لا تتطلب إعادة كتابة الواجهات.
            </p>
            <div className="flex gap-3">
              <span className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 font-mono">Docker Ready</span>
              <span className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 font-mono">PWA Compatible</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
