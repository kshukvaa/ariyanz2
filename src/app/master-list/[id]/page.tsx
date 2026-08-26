'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import {
  ChevronLeft, Star, Download, ArrowLeft, FileText,
  GraduationCap, BookOpen, Wrench, ClipboardCheck,
  CheckCircle2, Lock, Calendar, User, Eye, Share2,
  FileSpreadsheet, Route
} from 'lucide-react';

/* ── Static data for demo ── */
const formData: Record<string, {
  title: string;
  type: 'form' | 'guideline' | 'checklist' | 'excel';
  category: string;
  isFree: boolean;
  downloads: string;
  date: string;
  author: string;
  fileSize: string;
  fileType: string;
  description: string;
  features: string[];
}> = {
  '1': {
    title: 'فرم ارزیابی عملکرد سالانه',
    type: 'form', category: 'منابع انسانی', isFree: true,
    downloads: '۱,۲۴۰', date: '۱۴۰۴/۰۴/۱۵', author: 'دکتر احمدی',
    fileSize: '245 KB', fileType: 'Word (.docx)',
    description: 'فرم جامع ارزیابی عملکرد سالانه کارکنان با شاخص‌های کلیدی عملکرد (KPI)، بخش ارزیابی خودکار، ارزیابی مدیر مستقیم و ارزیابی ۳۶۰ درجه. این فرم بر اساس استانداردهای نوین مدیریت منابع انسانی طراحی شده و قابلیت شخصی‌سازی برای سازمان‌های مختلف را دارد. فرم شامل بخش‌های هدف‌گذاری، شاخص‌های کمّی و کیفی، نمره‌دهی و برنامه بهبود فردی است.',
    features: ['ارزیابی ۳۶۰ درجه', 'شاخص‌های KPI', 'بخش هدف‌گذاری', 'برنامه بهبود فردی', 'قابل شخصی‌سازی'],
  },
  '2': {
    title: 'دستورالعمل فرآیند استخدام',
    type: 'guideline', category: 'منابع انسانی', isFree: true,
    downloads: '۹۸۰', date: '۱۴۰۴/۰۴/۱۰', author: 'مهندس رضایی',
    fileSize: '520 KB', fileType: 'PDF',
    description: 'دستورالعمل گام‌به‌گام فرآیند استخدام از تعریف شغل تا روز اول کاری. شامل مراحل جذب، مصاحبه، ارزیابی، پیشنهاد شغلی و فرآیند ورود (Onboarding). این دستورالعمل بر اساس بهترین شیوه‌های صنعت و تجربه بیش از ۱۰ سال تیم آریاز تدوین شده است.',
    features: ['فرآیند ۷ مرحله‌ای', 'چک‌لیست مصاحبه', 'فرم‌های پیوست', 'نمودار جریان کار', 'برگه ارزیابی'],
  },
  '3': {
    title: 'چک‌لیست جامع مصاحبه استخدامی',
    type: 'checklist', category: 'جذب و استخدام', isFree: true,
    downloads: '۲,۳۵۰', date: '۱۴۰۴/۰۴/۰۵', author: 'سارا محمدی',
    fileSize: '180 KB', fileType: 'Excel (.xlsx)',
    description: 'چک‌لیست کامل برای انجام مصاحبه استخدامی حرفه‌ای شامل سوالات رفتاری، فنی و شایستگی‌محور. هر بخش با نمره‌دهی استاندارد و بخش یادداشت مصاحبه‌کننده همراه است. مناسب برای مصاحبه‌های اولیه، تخصصی و نهایی.',
    features: ['۵۰+ سوال آماده', 'نمره‌دهی استاندارد', 'سوالات رفتاری STAR', 'بخش ارزیابی نهایی', 'قابل چاپ'],
  },
};

/* ── Related content tabs ── */
const tabs = [
  {
    id: 'courses' as const, label: 'دوره‌ها', icon: <GraduationCap size={14} />,
    data: [
      { id: '1', title: 'دوره جامع ارزیابی عملکرد', price: '۴۵۰,۰۰۰ تومان', rating: 4.8 },
      { id: '2', title: 'مدیریت منابع انسانی پیشرفته', price: '۵۲۰,۰۰۰ تومان', rating: 4.7 },
    ],
  },
  {
    id: 'paths' as const, label: 'مسیر یادگیری', icon: <Route size={14} />,
    data: [
      { id: '1', title: 'مسیر تخصصی منابع انسانی', level: 'پیشرفته', hours: 48 },
      { id: '2', title: 'مسیر مدیریت و رهبری', level: 'میانی', hours: 36 },
    ],
  },
  {
    id: 'forms' as const, label: 'فرم‌های مرتبط', icon: <FileText size={14} />,
    data: [
      { id: '2', title: 'دستورالعمل فرآیند استخدام' },
      { id: '6', title: 'دستورالعمل ارزیابی شایستگی' },
    ],
  },
  {
    id: 'exams' as const, label: 'آزمون‌ها', icon: <ClipboardCheck size={14} />,
    data: [
      { id: '1', title: 'آزمون سنجش دانش HR' },
      { id: '2', title: 'تست شایستگی مدیریتی' },
    ],
  },
  {
    id: 'tools' as const, label: 'ابزارها', icon: <Wrench size={14} />,
    data: [
      { id: '1', title: 'داشبورد ارزیابی عملکرد' },
      { id: '2', title: 'ماشین حساب حقوق و دستمزد' },
    ],
  },
];

const typeLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  form: { label: 'فرم', icon: <FileText size={14} />, color: 'bg-blue-100 text-blue-700' },
  guideline: { label: 'دستورالعمل', icon: <BookOpen size={14} />, color: 'bg-purple-100 text-purple-700' },
  checklist: { label: 'چک‌لیست', icon: <ClipboardCheck size={14} />, color: 'bg-emerald-100 text-emerald-700' },
  excel: { label: 'اکسل', icon: <FileSpreadsheet size={14} />, color: 'bg-orange-100 text-orange-700' },
};

export default function FormDetailPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'paths' | 'forms' | 'exams' | 'tools'>('courses');
  const [userRating, setUserRating] = useState(0);

  const form = formData['1'];
  if (!form) {
    return (
      <SharedPageLayout>
        <div className="text-center py-20">
          <FileText size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-600 font-bold mb-2">فرم یافت نشد</h3>
        </div>
      </SharedPageLayout>
    );
  }

  const typeInfo = typeLabels[form.type];
  const currentTab = tabs.find(t => t.id === activeTab)!;

  return (
    <SharedPageLayout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-orange-500 transition-colors">صفحه اصلی</Link>
          <ChevronLeft size={14} className="text-gray-400" />
          <Link href="/master-list" className="text-gray-500 hover:text-orange-500 transition-colors">مستر لیست</Link>
          <ChevronLeft size={14} className="text-gray-400" />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{form.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* File Header Card */}
            <div className="bg-gradient-to-l from-purple-50 to-violet-50 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${typeInfo.color}`}>
                  {typeInfo.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                    {form.isFree ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 size={12} /> رایگان
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                        <Lock size={12} /> ویژه
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-black text-gray-900 mb-2 leading-10">{form.title}</h1>
                  <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><User size={14} /> {form.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {form.date}</span>
                    <span className="flex items-center gap-1.5"><Eye size={14} /> {form.downloads} دانلود</span>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="mt-6 bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{form.title}.{form.fileType.includes('Word') ? 'docx' : form.fileType.includes('Excel') ? 'xlsx' : 'pdf'}</p>
                      <p className="text-xs text-gray-400">{form.fileType} · {form.fileSize}</p>
                    </div>
                  </div>
                  <button data-ripple data-magnetic className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    form.isFree
                      ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200'
                      : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200'
                  }`}>
                    <Download size={16} />
                    {form.isFree ? 'دانلود رایگان' : 'خرید و دانلود'}
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-3 text-lg">توضیحات</h2>
              <p className="text-sm text-gray-600 leading-8">{form.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">ویژگی‌ها</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {form.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <CheckCircle2 size={18} className="text-purple-500 shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h2 className="font-bold text-gray-900 mb-3">امتیاز شما به این فایل</h2>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button data-ripple key={star} onClick={() => setUserRating(star)} className="transition-transform hover:scale-125">
                    <Star size={28} className={star <= userRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  </button>
                ))}
                {userRating > 0 && <span className="text-sm text-gray-500 mr-2">{userRating} از ۵</span>}
              </div>
            </div>
          </div>

          {/* Sidebar - 5-tab Related Content */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden sticky top-28">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <ArrowLeft size={16} className="text-orange-500" />
                  محتوای مرتبط
                </h3>
              </div>

              {/* 5 Tabs */}
              <div className="flex flex-wrap border-b border-gray-100">
                {tabs.map(tab => (
                  <button
                    data-ripple
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[60px] py-3 text-[10px] font-medium flex flex-col items-center justify-center gap-1 transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? 'text-orange-500 border-orange-500'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4 space-y-3">
                {currentTab.data.map((item: any) => (
                  <div
                    data-tilt
                    key={item.id}
                    className="border border-gray-100 rounded-xl p-3 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer"
                  >
                    <h4 className="text-sm font-medium text-gray-800 mb-1">{item.title}</h4>
                    {item.price ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-orange-600 font-bold">{item.price}</span>
                        {item.rating && (
                          <span className="flex items-center gap-1 text-xs text-yellow-500">
                            <Star size={12} className="fill-yellow-400" /> {item.rating}
                          </span>
                        )}
                      </div>
                    ) : item.level ? (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>سطح: {item.level}</span>
                        <span>·</span>
                        <span>{item.hours} ساعت</span>
                      </div>
                    ) : (
                      <Link href={`/master-list/${item.id}`} className="text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-1">
                        مشاهده <ArrowLeft size={10} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
}