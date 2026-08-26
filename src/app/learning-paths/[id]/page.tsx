'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ScrollAnimator, { StaggerContainer } from '@/components/ScrollAnimator';
import {
  ChevronLeft, Clock, Users, BarChart3, BookOpen, CheckCircle2,
  Lock, PlayCircle, FileText, Download, GraduationCap, ArrowLeft,
  Brain, Crown, Heart, Bot, Mountain, Trophy, Briefcase, Lightbulb,
  Shield, Layers, Zap, Star, ExternalLink, CircleCheckBig
} from 'lucide-react';

type StepType = 'article' | 'video' | 'exam' | 'download' | 'course';
type StepStatus = 'completed' | 'current' | 'locked';

interface Step {
  id: string;
  type: StepType;
  title: string;
  description: string;
  time: string;
  status: StepStatus;
  link: string;
}

interface PathData {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  description: string;
  progress: number;
  totalSteps: number;
  estimatedHours: string;
  enrolledUsers: string;
  difficulty: string;
  difficultyColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  steps: Step[];
}

const pathDataMap: Record<string, PathData> = {
  'mind-talent': {
    id: 'mind-talent',
    title: 'مسیر ذهن و استعداد',
    category: 'منابع انسانی',
    categoryColor: 'bg-blue-100 text-blue-700',
    description: 'در این مسیر یادگیری، شما با مفاهیم پایه و پیشرفته شناخت استعداد و توانمندی‌های ذهنی آشنا خواهید شد. از تئوری‌های هوش چندگانه گرفته تا روش‌های سنجش استعداد در محیط کار، همه آنچه برای شناسایی و پرورش استعدادها نیاز دارید در اختیارتان قرار می‌گیرد.',
    progress: 65,
    totalSteps: 10,
    estimatedHours: '۲۴ ساعت',
    enrolledUsers: '۳,۲۴۰',
    difficulty: 'متوسط',
    difficultyColor: 'bg-amber-100 text-amber-700',
    icon: Brain,
    steps: [
      { id: 's1', type: 'article', title: 'مطالعه مقاله: هوش چندگانه گاردنر', description: 'آشنایی با نظریه هوش چندگانه و کاربرد آن در محیط کار', time: '۲۰ دقیقه', status: 'completed', link: '/articles/1' },
      { id: 's2', type: 'video', title: 'تماشای ویدئو: شناخت استعدادهای پنهان', description: 'آموزش تکنیک‌های کشف استعدادهای نهفته کارکنان', time: '۳۵ دقیقه', status: 'completed', link: '/videos/1' },
      { id: 's3', type: 'exam', title: 'گذراندن آزمون: ارزیابی شناختی', description: 'آزمون کوتاه برای سنجش درک شما از مفاهیم هوش چندگانه', time: '۱۵ دقیقه', status: 'completed', link: '/exams/1' },
      { id: 's4', type: 'article', title: 'مطالعه مقاله: مدل استعدادیابی ۹ صندوق', description: 'بررسی مدل نوین استعدادیابی و تفکیک استعداد از عملکرد', time: '۲۵ دقیقه', status: 'completed', link: '/articles/2' },
      { id: 's5', type: 'download', title: 'دانلود فرم: فرم ارزیابی استعداد', description: 'دریافت فرم استاندارد ارزیابی استعداد برای استفاده در سازمان', time: '۵ دقیقه', status: 'completed', link: '/master-list/1' },
      { id: 's6', type: 'video', title: 'تماشای ویدئو: مصاحبه رفتارشناسی', description: 'تکنیک‌های مصاحبه رفتاری برای شناسایی استعدادها', time: '۴۰ دقیقه', status: 'current', link: '/videos/2' },
      { id: 's7', type: 'exam', title: 'گذراندن آزمون: مهارت‌های مصاحبه', description: 'آزمون جامع ارزیابی مهارت‌های مصاحبه رفتاری', time: '۲۰ دقیقه', status: 'locked', link: '/exams/2' },
      { id: 's8', type: 'article', title: 'مطالعه مقاله: استعداد در سازمان‌های چابک', description: 'نقش استعدادیابی در سازمان‌های چابک و نوآور', time: '۲۰ دقیقه', status: 'locked', link: '/articles/3' },
      { id: 's9', type: 'course', title: 'شرکت در دوره: استعدادیابی حرفه‌ای', description: 'دوره جامع آموزش استعدادیابی با گواهینامه معتبر', time: '۲ ساعت', status: 'locked', link: '/agents/1' },
      { id: 's10', type: 'exam', title: 'آزمون نهایی: مسیر ذهن و استعداد', description: 'آزمون پایانی برای دریافت گواهینامه اتمام مسیر', time: '۳۰ دقیقه', status: 'locked', link: '/exams/3' },
    ],
  },
  'management-flow': {
    id: 'management-flow',
    title: 'جریان مدیریتی',
    category: 'مدیریت و رهبری',
    categoryColor: 'bg-purple-100 text-purple-700',
    description: 'مسیر جریان مدیریتی شما را با اصول بنیادین مدیریت، فرآیند تصمیم‌گیری استراتژیک و تکنیک‌های رهبری آشنا می‌کند. این مسیر برای مدیران میانی و ارشد طراحی شده و شامل مطالعات موردی واقعی از سازمان‌های موفق ایرانی است.',
    progress: 70,
    totalSteps: 10,
    estimatedHours: '۳۰ ساعت',
    enrolledUsers: '۲,۸۵۰',
    difficulty: 'پیشرفته',
    difficultyColor: 'bg-red-100 text-red-700',
    icon: Crown,
    steps: [
      { id: 's1', type: 'article', title: 'مطالعه مقاله: اصول مدیریت استراتژیک', description: 'مبانی و اصول کلیدی مدیریت استراتژیک سازمان', time: '۲۵ دقیقه', status: 'completed', link: '/articles/4' },
      { id: 's2', type: 'video', title: 'تماشای ویدئو: تصمیم‌گیری مدیران', description: 'مدل‌های تصمیم‌گیری و کاربرد آنها در شرایط پیچیده', time: '۴۵ دقیقه', status: 'completed', link: '/videos/3' },
      { id: 's3', type: 'exam', title: 'گذراندن آزمون: تفکر استراتژیک', description: 'سنجش توانایی تحلیل استراتژیک مسائل سازمانی', time: '۲۰ دقیقه', status: 'completed', link: '/exams/4' },
      { id: 's4', type: 'download', title: 'دانلود ابزار: ماتریس SWOT', description: 'قالب آماده ماتریس SWOT برای تحلیل سازمانی', time: '۵ دقیقه', status: 'completed', link: '/master-list/2' },
      { id: 's5', type: 'article', title: 'مطالعه مقاله: مدیریت تغییر', description: 'مدل ۸ مرحله‌ای کاتر برای مدیریت تغییر سازمانی', time: '۳۰ دقیقه', status: 'completed', link: '/articles/5' },
      { id: 's6', type: 'course', title: 'شرکت در دوره: رهبری عملی', description: 'دوره عملی رهبری با شبیه‌سازی سناریوهای واقعی', time: '۳ ساعت', status: 'current', link: '/agents/2' },
      { id: 's7', type: 'video', title: 'تماشای ویدئو: مدیریت بحران', description: 'راهنمای عملی مدیریت بحران در سازمان', time: '۳۵ دقیقه', status: 'locked', link: '/videos/4' },
      { id: 's8', type: 'exam', title: 'گذراندن آزمون: مدیریت منابع', description: 'ارزیابی دانش شما در زمینه مدیریت منابع سازمانی', time: '۲۵ دقیقه', status: 'locked', link: '/exams/5' },
      { id: 's9', type: 'download', title: 'دانلود فرم: برنامهریزی استراتژیک', description: 'فرم جامع برنامه‌ریزی استراتژیک سالانه', time: '۱۰ دقیقه', status: 'locked', link: '/master-list/3' },
      { id: 's10', type: 'exam', title: 'آزمون نهایی: جریان مدیریتی', description: 'آزمون پایانی برای دریافت گواهینامه مدیریت', time: '۴۰ دقیقه', status: 'locked', link: '/exams/6' },
    ],
  },
};

const relatedPaths = [
  { id: 'management-flow', title: 'جریان مدیریتی', category: 'مدیریت و رهبری', progress: 70, icon: Crown },
  { id: 'personal-dev', title: 'مسیر توسعه فردی', category: 'توسعه فردی', progress: 45, icon: Heart },
  { id: 'smart-tools', title: 'کار با ابزارهای هوشمند', category: 'فناوری اطلاعات', progress: 30, icon: Bot },
  { id: 'leadership-goals', title: 'رهبری تیز به اهداف', category: 'مدیریت و رهبری', progress: 60, icon: Mountain },
];

const stepTypeConfig: Record<StepType, { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; color: string; bgColor: string }> = {
  article: { icon: FileText, label: 'مقاله', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  video: { icon: PlayCircle, label: 'ویدئو', color: 'text-rose-600', bgColor: 'bg-rose-50' },
  exam: { icon: BarChart3, label: 'آزمون', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  download: { icon: Download, label: 'دانلود', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  course: { icon: GraduationCap, label: 'دوره', color: 'text-purple-600', bgColor: 'bg-purple-50' },
};

function AnimatedProgressBar({ progress }: { progress: number }) {
  const [animated, setAnimated] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const p = Math.min(elapsed / 1200, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setAnimated(eased * progress);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [progress]);

  return (
    <div ref={ref} className="w-full">
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${animated}%`,
            background: 'linear-gradient(to left, #F97316, #FB923C)',
            transition: 'width 0.1s ease-out',
          }}
        />
      </div>
    </div>
  );
}

export default function LearningPathDetailPage() {
  const params = useParams();
  const pathId = params.id as string;

  // Use pathDataMap if available, otherwise create a default
  const pathData: PathData = pathDataMap[pathId] || {
    id: pathId,
    title: 'مسیر یادگیری',
    category: 'منابع انسانی',
    categoryColor: 'bg-blue-100 text-blue-700',
    description: 'مسیر یادگیری جامع برای ارتقای دانش و مهارت‌های حرفه‌ای شما. این مسیر شامل مقالات تخصصی، ویدئوهای آموزشی، آزمون‌ها و ابزارهای کاربردی است.',
    progress: 0,
    totalSteps: 8,
    estimatedHours: '۲۰ ساعت',
    enrolledUsers: '۱,۵۰۰',
    difficulty: 'متوسط',
    difficultyColor: 'bg-amber-100 text-amber-700',
    icon: BookOpen,
    steps: [
      { id: 's1', type: 'article', title: 'مطالعه مقاله: مقدمه بر موضوع', description: 'آشنایی با مفاهیم پایه و اصول اولیه', time: '۲۰ دقیقه', status: 'current', link: '/articles/1' },
      { id: 's2', type: 'video', title: 'تماشای ویدئو: آموزش عملی', description: 'نمایش عملی مفاهیم کلیدی', time: '۳۰ دقیقه', status: 'locked', link: '/videos/1' },
      { id: 's3', type: 'exam', title: 'گذراندن آزمون: ارزیابی دانش', description: 'سنجش میزان درک شما از مطالب', time: '۱۵ دقیقه', status: 'locked', link: '/exams/1' },
      { id: 's4', type: 'download', title: 'دانلود فرم و ابزار', description: 'دریافت ابزارهای کاربردی مرتبط', time: '۵ دقیقه', status: 'locked', link: '/master-list/1' },
      { id: 's5', type: 'article', title: 'مطالعه مقاله: مباحث پیشرفته', description: 'تعمیق دانش در موضوعات تخصصی', time: '۲۵ دقیقه', status: 'locked', link: '/articles/2' },
      { id: 's6', type: 'video', title: 'تماشای ویدئو: مطالعه موردی', description: 'بررسی موردی از سازمان‌های موفق', time: '۴۰ دقیقه', status: 'locked', link: '/videos/2' },
      { id: 's7', type: 'course', title: 'شرکت در دوره آموزشی', description: 'دوره جامع با گواهینامه معتبر', time: '۲ ساعت', status: 'locked', link: '/agents/1' },
      { id: 's8', type: 'exam', title: 'آزمون نهایی', description: 'آزمون پایانی برای دریافت گواهینامه', time: '۳۰ دقیقه', status: 'locked', link: '/exams/2' },
    ],
  };

  const PathIcon = pathData.icon;
  const completedSteps = pathData.steps.filter(s => s.status === 'completed').length;
  const currentStep = pathData.steps.find(s => s.status === 'current');
  const filteredRelated = relatedPaths.filter(rp => rp.id !== pathId).slice(0, 3);

  return (
    <SharedPageLayout>
      {/* Breadcrumb & Header */
      }
      <section className="bg-gradient-to-bl from-[#0B1E35] via-[#122B45] to-[#0B1E35] text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollAnimator animation="fade-up">
            <div className="flex items-center gap-2 mb-5 text-sm">
              <Link href="/" className="text-orange-300 hover:text-white transition-colors">
                صفحه اصلی
              </Link>
              <ChevronLeft size={14} className="text-orange-300" />
              <Link href="/learning-paths" className="text-orange-300 hover:text-white transition-colors">
                مسیرهای یادگیری
              </Link>
              <ChevronLeft size={14} className="text-orange-300" />
              <span className="text-orange-200">{pathData.title}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
                  <PathIcon size={30} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${pathData.categoryColor}`}>
                      {pathData.category}
                    </span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${pathData.difficultyColor}`}>
                      {pathData.difficulty}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black mb-2">{pathData.title}</h1>
                  <p className="text-gray-300 text-sm leading-7 max-w-2xl">{pathData.description}</p>
                </div>
              </div>
            </div>
          </ScrollAnimator>

          {/* Overall Progress */
          }
          <ScrollAnimator animation="fade-up" delay={100}>
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-300">پیشرفت کلی مسیر</span>
                <span className="text-sm font-bold text-orange-400">{pathData.progress}%</span>
              </div>
              <AnimatedProgressBar progress={pathData.progress} />
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-gray-400">
                  {completedSteps} از {pathData.steps.length} مرحله تکمیل شده
                </span>
              </div>
            </div>
          </ScrollAnimator>

          {/* Stats Row */
          }
          <ScrollAnimator animation="fade-up" delay={150}>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <BarChart3 size={22} className="mx-auto mb-2 text-orange-400" />
                <p className="text-lg font-bold text-white">{pathData.totalSteps}</p>
                <p className="text-xs text-gray-400">مرحله</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <Clock size={22} className="mx-auto mb-2 text-orange-400" />
                <p className="text-lg font-bold text-white">{pathData.estimatedHours}</p>
                <p className="text-xs text-gray-400">ساعت تخمینی</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <Users size={22} className="mx-auto mb-2 text-orange-400" />
                <p className="text-lg font-bold text-white">{pathData.enrolledUsers}</p>
                <p className="text-xs text-gray-400">کاربر ثبت‌نام کرده</p>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Main Content */
      }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Steps Timeline - Main Content */
          }
          <div className="flex-1">
            <ScrollAnimator animation="fade-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen size={20} className="text-orange-500" />
                  مراحل مسیر یادگیری
                </h2>
                <span className="text-sm text-gray-400">
                  {completedSteps}/{pathData.steps.length} تکمیل
                </span>
              </div>
            </ScrollAnimator>

            <div className="relative">
              {/* Timeline connecting line */
              }
              <div className="absolute top-0 bottom-0 right-[23px] w-0.5 bg-gray-200 hidden sm:block" />

              <StaggerContainer className="space-y-4" staggerDelay={60}>
                {pathData.steps.map((step, index) => {
                  const typeConfig = stepTypeConfig[step.type];
                  const StepIcon = typeConfig.icon;
                  const isCompleted = step.status === 'completed';
                  const isCurrent = step.status === 'current';
                  const isLocked = step.status === 'locked';

                  return (
                    <div
                      key={step.id}
                      className={`relative flex gap-4 sm:gap-5 ${isLocked ? 'opacity-60' : ''}`}
                    >
                      {/* Timeline Node */
                      }
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                            isCompleted
                              ? 'bg-orange-500 border-orange-500 shadow-md shadow-orange-200'
                              : isCurrent
                              ? 'bg-white border-orange-400 shadow-md shadow-orange-100 ring-4 ring-orange-100'
                              : 'bg-white border-gray-200'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={22} className="text-white" />
                          ) : isLocked ? (
                            <Lock size={18} className="text-gray-300" />
                          ) : (
                            <StepIcon size={22} className={typeConfig.color} />
                          )}
                        </div>
                        {isCurrent && (
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
                        )}
                      </div>

                      {/* Step Card */
                      }
                      <div
                        className={`flex-1 rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                          isCurrent
                            ? 'border-orange-200 bg-orange-50/50 shadow-md shadow-orange-100/50'
                            : isCompleted
                            ? 'border-gray-100 bg-white hover:shadow-md'
                            : 'border-gray-100 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeConfig.bgColor} ${typeConfig.color}`}>
                                {typeConfig.label}
                              </span>
                              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                <Clock size={10} />
                                {step.time}
                              </span>
                              {isCompleted && (
                                <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                                  <CircleCheckBig size={10} />
                                  تکمیل شده
                                </span>
                              )}
                              {isCurrent && (
                                <span className="text-[10px] font-medium text-orange-600 flex items-center gap-1">
                                  <Star size={10} />
                                  مرحله فعلی
                                </span>
                              )}
                            </div>
                            <h3 className={`font-bold text-sm sm:text-[15px] mb-1 ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                              {step.title}
                            </h3>
                            <p className="text-xs text-gray-400 leading-6">{step.description}</p>
                          </div>

                          {/* Action Button */
                          }
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <Link
                                data-ripple
                                href={step.link}
                                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors bg-gray-50 rounded-lg px-3 py-2 hover:bg-orange-50"
                              >
                                <ExternalLink size={14} />
                                <span className="hidden sm:inline">مشاهده</span>
                              </Link>
                            ) : isCurrent ? (
                              <Link
                                data-ripple
                                data-magnetic
                                href={step.link}
                                className="flex items-center gap-1.5 text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg px-3 py-2 shadow-md shadow-orange-200 transition-all hover:shadow-lg"
                              >
                                <PlayCircle size={14} />
                                <span>شروع</span>
                              </Link>
                            ) : (
                              <div className="flex items-center gap-1.5 text-xs text-gray-300 bg-gray-50 rounded-lg px-3 py-2">
                                <Lock size={14} />
                                <span className="hidden sm:inline">قفل</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>

          {/* Sidebar */
          }
          <div className="w-full lg:w-80 flex-shrink-0">
            <ScrollAnimator animation="fade-left" delay={200}>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star size={18} className="text-orange-500" />
                  مسیرهای پیشنهادی
                </h3>
                <div className="space-y-3">
                  {filteredRelated.map((rp) => {
                    const RPIcon = rp.icon;
                    return (
                      <Link
                        key={rp.id}
                        href={`/learning-paths/${rp.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                          <RPIcon size={20} className="text-orange-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                            {rp.title}
                          </p>
                          <p className="text-[11px] text-gray-400">{rp.category}</p>
                        </div>
                        <div className="flex-shrink-0 text-left">
                          <span className="text-[11px] font-bold text-orange-500">{rp.progress}%</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Back to all paths */
                }
                <Link
                  data-ripple
                  href="/learning-paths"
                  className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <span>مشاهده همه مسیرها</span>
                  <ArrowLeft size={14} />
                </Link>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>
    </SharedPageLayout>
  );
}