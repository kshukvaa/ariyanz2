'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import {
  Download, FileText, Search, Filter, ChevronDown,
  ChevronLeft, CheckCircle2, Lock, ArrowLeft, Eye,
  FileSpreadsheet, ClipboardList, BookOpen
} from 'lucide-react';

interface MasterItem {
  id: string;
  title: string;
  category: string;
  type: 'form' | 'guideline' | 'checklist' | 'excel';
  isFree: boolean;
  downloads: string;
}

const allItems: MasterItem[] = [
  { id: '1', title: 'فرم ارزیابی عملکرد سالانه', category: 'منابع انسانی', type: 'form', isFree: true, downloads: '۱,۲۴۰' },
  { id: '2', title: 'دستورالعمل فرآیند استخدام', category: 'منابع انسانی', type: 'guideline', isFree: true, downloads: '۹۸۰' },
  { id: '3', title: 'چک‌لیست جامع مصاحبه استخدامی', category: 'جذب و استخدام', type: 'checklist', isFree: true, downloads: '۲,۳۵۰' },
  { id: '4', title: 'فرم تسویه حساب کارگر', category: 'حقوق و دستمزد', type: 'form', isFree: false, downloads: '۷۵۰' },
  { id: '5', title: 'اکسل محاسبه حقوق و مزایا', category: 'حقوق و دستمزد', type: 'excel', isFree: false, downloads: '۱,۵۶۰' },
  { id: '6', title: 'دستورالعمل ارزیابی شایستگی', category: 'منابع انسانی', type: 'guideline', isFree: true, downloads: '۱,۱۲۰' },
  { id: '7', title: 'فرم طرح ریزی جانشین‌پروری', category: 'مدیریت', type: 'form', isFree: false, downloads: '۶۲۰' },
  { id: '8', title: 'چک‌لیست انطباق قانون کار', category: 'قوانین کار', type: 'checklist', isFree: true, downloads: '۱,۸۹۰' },
  { id: '9', title: 'اکسل داشبورد عملکرد', category: 'مدیریت', type: 'excel', isFree: false, downloads: '۱,۳۴۰' },
  { id: '10', title: 'فرم درخواست مرخصی', category: 'منابع انسانی', type: 'form', isFree: true, downloads: '۳,۴۵۰' },
  { id: '11', title: 'دستورالعمل رویboarding نوین', category: 'جذب و استخدام', type: 'guideline', isFree: true, downloads: '۱,۰۸۰' },
  { id: '12', title: 'چک‌لیست خروج کارمند', category: 'منابع انسانی', type: 'checklist', isFree: true, downloads: '۸۹۰' },
];

const typeLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  form: { label: 'فرم', icon: <FileText size={14} />, color: 'bg-blue-100 text-blue-700' },
  guideline: { label: 'دستورالعمل', icon: <BookOpen size={14} />, color: 'bg-purple-100 text-purple-700' },
  checklist: { label: 'چک‌لیست', icon: <ClipboardList size={14} />, color: 'bg-emerald-100 text-emerald-700' },
  excel: { label: 'اکسل', icon: <FileSpreadsheet size={14} />, color: 'bg-orange-100 text-orange-700' },
};

export default function MasterListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFree, setFilterFree] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...new Set(allItems.map(i => i.category))];
  const types = ['all', ...new Set(allItems.map(i => i.type))];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = !searchQuery || item.title.includes(searchQuery);
    const matchesFree = !filterFree || item.isFree;
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesFree && matchesType && matchesCat;
  });

  return (
    <SharedPageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-l from-[#0B1E35] to-[#1a365d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-orange-300 hover:text-white text-sm transition-colors">صفحه اصلی</Link>
            <ChevronLeft size={14} className="text-orange-300" />
            <span className="text-sm text-orange-200">مستر لیست</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">مستر لیست فرم‌ها و دستورالعمل‌ها</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-8">
            مجموعه کاملی از فرم‌ها، دستورالعمل‌ها و ابزارهای آماده برای دانلود و استفاده در سازمان شما
          </p>
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-gray-300">
              <FileText size={18} />
              <span className="text-sm font-medium">{allItems.length} آیتم</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle2 size={18} />
              <span className="text-sm font-medium">{allItems.filter(i => i.isFree).length} رایگان</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در لیست..."
              className="w-full border border-gray-200 rounded-xl py-3 px-4 pr-11 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          <div className="flex items-center gap-3">
            {/* Free Toggle */}
            <button
              data-ripple
              onClick={() => setFilterFree(!filterFree)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                filterFree
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <CheckCircle2 size={16} />
              فقط رایگان
            </button>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-400 bg-white appearance-none cursor-pointer"
            >
              <option value="all">همه انواع</option>
              <option value="form">فرم</option>
              <option value="guideline">دستورالعمل</option>
              <option value="checklist">چک‌لیست</option>
              <option value="excel">اکسل</option>
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-400 bg-white appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'همه دسته‌بندی‌ها' : cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-bold text-gray-900">{filteredItems.length}</span> آیتم یافت شد
        </p>

        {/* Items List */}
        {filteredItems.length > 0 ? (
          <div className="space-y-3">
            {filteredItems.map(item => {
              const typeInfo = typeLabels[item.type];
              return (
                <Link
                  data-tilt
                  key={item.id}
                  href={`/master-list/${item.id}`}
                  className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-orange-200 hover:shadow-md transition-all group block"
                >
                  <div className="flex items-center gap-4">
                    {/* Type Badge */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${typeInfo.color}`}>
                      {typeInfo.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{item.category}</span>
                        <span>·</span>
                        <span>{item.downloads} دانلود</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {item.isFree ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          <CheckCircle2 size={12} /> رایگان
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                          <Lock size={12} /> ویژه
                        </span>
                      )}
                      <button
                        data-ripple
                        data-magnetic
                        className={`p-2.5 rounded-xl transition-all ${
                          item.isFree
                            ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-600 font-bold mb-2">آیتمی یافت نشد</h3>
            <p className="text-gray-400 text-sm">فیلترهای خود را تغییر دهید</p>
          </div>
        )}
      </section>
    </SharedPageLayout>
  );
}
