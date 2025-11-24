import { Lesson, User } from './types';

export const INITIAL_USERS: User[] = [
  { id: "admin-1", name: "عمر أيت لوتو", email: "omar.aitloutou@ista.ma", password: "admin", role: "admin" },
  { id: "trainee-1", name: "أحمد طالب", email: "student@ista.ma", password: "123", role: "trainee", specialization: "تطوير رقمي" }
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: "1",
    title: "تقنيات التواصل الشفهي",
    module: "M01 - التواصل",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
    resources: [
      {
        id: "r1",
        title: "مقدمة في التواصل",
        description: "تعريفات أساسية وسيناريوهات للتواصل الفعال.",
        type: "text",
        content: "التواصل هو عملية تبادل المعلومات والأفكار والمشاعر بين شخصين أو أكثر. يعتبر التواصل الفعال مهارة أساسية في الحياة المهنية والشخصية.",
        createdAt: "2023-10-01"
      },
      {
        id: "r2",
        title: "الإنصات الفعال",
        description: "ركائز الاستماع النشط وكيفية تطبيقه.",
        type: "skill",
        content: "الإنصات الفعال يتطلب التركيز الكامل وفهم لغة الجسد، وليس مجرد الاستماع للكلمات. يساعد على بناء الثقة وتقليل سوء الفهم.",
        createdAt: "2023-10-02"
      }
    ]
  },
  {
    id: "2",
    title: "التواصل الكتابي المهني",
    module: "M02 - الكتابة المهنية",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
    resources: [
      {
        id: "r3",
        title: "كتابة السيرة الذاتية",
        description: "دليل شامل لإنشاء سيرة ذاتية مؤثرة.",
        type: "presentation",
        content: "عرض تقديمي يوضح الخطوات العملية لكتابة سيرة ذاتية احترافية تجذب انتباه أصحاب العمل.",
        url: "#",
        createdAt: "2023-10-05"
      }
    ]
  },
  {
    id: "3",
    title: "مهارات العرض والتقديم",
    module: "M03 - الإلقاء",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
    resources: []
  }
];