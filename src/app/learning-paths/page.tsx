'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ScrollAnimator, { StaggerContainer } from '@/components/ScrollAnimator';
import {
  Search, ChevronLeft, Clock, BarChart3, BookOpen,
  Trophy, Crown, Heart, Bot, Mountain, Brain,
  Briefcase, Lightbulb, Target, GraduationCap, Shield,
  Layers, Zap, ArrowLeft
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'همه' },
  { id: 'hr', label: 'منابع انسانی' },
  { id: 'management', label: 'مدیریت و رهبری' },
  { id: 'personal', label: 'توسعه فردی' },
  { id: 'it', label: 'فناوری اطلاعات' },
];

const difficultyMap: Record<string, { label: string; color: string }> = {
  beginner: { label: 'مبتدی', color: 'bg-emerald-100 text-emerald-700' },
  intermediate: { label: 'متوسط', color: 'bg-amber-100 text-amber-700' },
  advanced: { label: 'پیشرفته', color: 'bg-red-100 text-red-700' },
};

const categoryColorMap: Record<string, string> = {
  hr: 'bg-blue-100 text-blue-700',
  management: 'bg-purple-100 text-purple-700',
  personal: 'bg-pink-100 text-pink-700',
  it: 'bg-cyan-100 text-cyan-700',
};

const categoryLabelMap: Record<string, string> = {
  hr: 'منابع انسانی',
  management: 'مدیریت و رهبری',
  personal: 'توسعه فردی',
  it: 'فناوری اطلاعات',
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain,
  Crown,
  Target,
  Bot,
  Mountain,
  Trophy,
  Briefcase,
  Lightbulb,
  GraduationCap,
  Shield,
  Layers,
  Zap,
  Heart,
  BookOpen,
};

const learningPaths = [
  { id: 'mind-talent', title: 'مسیر ذهن و استعداد', category: 'hr', steps: 12, progress: 65, difficulty: 'intermediate', duration: '۲۴ ساعت', icon: 'Brain', description: 'شناخت استعدادها و توانمندی‌های ذهنی در محیط کار' },
  { id: 'management-flow', title: 'جریان مدیریتی', category: 'management', steps: 10, progress: 70, difficulty: 'advanced', duration: '۳۰ ساعت', icon: 'Crown', description: 'یادگیری اصول جریان مدیریتی و تصمیم‌گیری استراتژیک' },
  { id: 'personal-dev', title: 'مسیر توسعه فردی', category: 'personal', steps: 8, progress: 45, difficulty: 'beginner', duration: '۱۸ ساعت', icon: 'Heart', description: 'ارتقای مهارت‌های فردی و شخصیتی حرفه‌ای' },
  { id: 'smart-tools', title: 'کار با ابزارهای هوشمند', category: 'it', steps: 9, progress: 30, difficulty: 'intermediate', duration: '۲۲ ساعت', icon: 'Bot', description: 'آشنایی با ابزارهای هوشمند و فناوری‌های نوین' },
  { id: 'leadership-goals', title: 'رهبری تیز به اهداف', category: 'management', steps: 11, progress: 60, difficulty: 'advanced', duration: '۲۸ ساعت', icon: 'Mountain', description: 'تکنیک‌های رهبری و رسیدن به اهداف سازمانی' },
  { id: 'recruitment-master', title: 'استاد جذب و استخدام', category: 'hr', steps: 10, progress: 20, difficulty: 'intermediate', duration: '۲۶ ساعت', icon: 'Trophy', description: 'تسلط بر فرآیند جذب، مصاحبه و استخدام حرفه‌ای' },
  { id: 'business-analysis', title: 'تحلیل کسب‌وکار', category: 'management', steps: 7, progress: 0, difficulty: 'advanced', duration: '۲۰ ساعت', icon: 'Briefcase', description: 'تحلیل داده‌های کسب‌وکار و تصمیم‌گیری مبتنی بر شواهد' },
  { id: 'creativity-innovation', title: 'خلاقیت و نوآوری', category: 'personal', steps: 8, progress: 15, difficulty: 'beginner', duration: '۱۶ ساعت', icon: 'Lightbulb', description: 'تقویت تفکر خلاق و نوآوری در محیط کار' },
  { id: 'hr-tech-digital', title: 'تحول دیجیتال منابع انسانی', category: 'hr', steps: 9, progress: 0, difficulty: 'intermediate', duration: '۲۴ ساعت', icon: 'GraduationCap', description: 'فناوری‌های دیجیتال در حوزه منابع انسانی' },
  { id: 'labor-law', title: 'قوانین کار و تامین اجتماعی', category: 'hr', steps: 11, progress: 50, difficulty: 'intermediate', duration: '۲۲ ساعت', icon: 'Shield', description: 'آشنایی کامل با قوانین کار، بیمه و تامین اجتماعی' },
  { id: 'team-building', title: 'ساخت تیم‌های موفق', category: 'management', steps: 8, progress: 35, difficulty: 'beginner', duration: '۱۸ ساعت', icon: 'Layers', description: 'مهارت‌های تشکیل و مدیریت تیم‌های کارآمد' },
  { id: 'agile-hr', title: 'منابع انسانی چابک', category: 'hr', steps: 7, progress: 10, difficulty: 'advanced', duration: '۲۰ ساعت', icon: 'Zap', description: 'اجرای متدولوژی چابک در واحد منابع انسانی' },
];

export default function LearningPathsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPaths = learningPaths.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchQuery || p.title.includes(searchQuery) || p.description.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <SharedPageLayout>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-bl from-[#0B1E35] via-[#122B45] to-[#0B1E35] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-orange-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-20 w-60 h-60 bg-orange-400 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollAnimator animation="fade-up">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-orange-300 hover:text-white text-sm transition-colors">
                صفحه اصلی
              </Link>
              <ChevronLeft size={14} className="text-orange-300" />
              <span className="text-sm text-orange-200">مسیرهای یادگیری</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">
              مسیرهای یادگیری <span className="text-orange-400">آریاز</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-8">
              مسیرهای ساختاریافته یادگیری که توسط متخصصان طراحی شده تا شما را از مبتدی تا حرفه‌ای هدایت کند. هر مسیر شامل مقالات، ویدئوها، آزمون‌ها و ابزارهای کاربردی است.
            </p>
          </ScrollAnimator>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        <ScrollAnimator animation="fade-up" delay={100}>
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو در مسیرهای یادگیری..."
                  className="w-full border border-gray-200 rounded-xl py-3 px-4 pr-11 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-gray-50"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    data-ripple
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'bg-[#0B1E35] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </section>

      {/* Learning Path Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <ScrollAnimator animation="fade-up" delay={150}>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              <span className="font-bold text-gray-900">{filteredPaths.length}</span> مسیر یادگیری یافت شد
            </p>
          </div>
        </ScrollAnimator>

        {filteredPaths.length === 0 ? (
          <ScrollAnimator animation="scale-in">
            <div className="text-center py-20">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400 text-lg">مسیر یادگیری‌ای یافت نشد</p>
              <p className="text-gray-300 text-sm mt-1">لطفاً فیلتر یا عبارت جستجو را تغییر دهید</p>
            </div>
          </ScrollAnimator>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" staggerDelay={80}>
            {filteredPaths.map((path) => {
              const Icon = iconMap[path.icon] || BookOpen;
              const diff = difficultyMap[path.difficulty];
              const catColor = categoryColorMap[path.category] || 'bg-gray-100 text-gray-700';
              const catLabel = categoryLabelMap[path.category] || path.category;

              return (
                <Link
                  data-tilt
                  key={path.id}
                  href={`/learning-paths/${path.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-orange-100/40 transition-all duration-500 hover:-translate-y-1 flex flex-col"
                >
                  {/* Card Header with Icon */}
                  <div className="p-5 pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${catColor}`}>
                        {catLabel}
                      </span>
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${diff.color}`}>
                        {diff.label}
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={26} className="text-orange-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors leading-7 text-[15px]">
                      {path.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-6 mb-3 line-clamp-2">
                      {path.description}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="px-5 pb-5 mt-auto">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <BarChart3 size={14} className="text-gray-300" />
                        {path.steps} مرحله
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-gray-300" />
                        {path.duration}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-gray-400">پیشرفت</span>
                        <span className="text-[11px] font-bold text-gray-700">{path.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${path.progress}%`,
                            background: path.progress > 0
                              ? 'linear-gradient(to left, #F97316, #FB923C)'
                              : '#E5E7EB'
                          }}
                        />
                      </div>
                    </div>

                    {/* Button */}
                    <button data-ripple data-magnetic className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      path.progress > 0
                        ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-200 group-hover:shadow-lg group-hover:shadow-orange-200'
                        : 'bg-[#0B1E35] text-white hover:bg-[#162d4a] shadow-md shadow-gray-300 group-hover:shadow-lg group-hover:shadow-gray-300'
                    }`}>
                      {path.progress > 0 ? (
                        <>
                          <span>ادامه مسیر</span>
                          <ArrowLeft size={14} />
                        </>
                      ) : (
                        <>
                          <Zap size={14} />
                          <span>شروع مسیر</span>
                        </>
                      )}
                    </button>
                  </div>
                </Link>
              );
            })}
          </StaggerContainer>
        )}
      </section>

      {/* Bottom Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <ScrollAnimator animation="fade-up" delay={200}>
          <div className="bg-gradient-to-bl from-[#0B1E35] to-[#122B45] rounded-3xl p-8 sm:p-10 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-3xl font-black text-orange-400 mb-1">+۸۵,۰۰۰</p>
                <p className="text-sm text-gray-300">کاربر فعال</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-orange-400 mb-1">+۱,۲۰۰</p>
                <p className="text-sm text-gray-300">محتوای آموزشی</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-orange-400 mb-1">+۵۰</p>
                <p className="text-sm text-gray-300">مسیر یادگیری</p>
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </section>
    </SharedPageLayout>
  );
}