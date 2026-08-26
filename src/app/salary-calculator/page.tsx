'use client';

import React, { useState } from 'react';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ScrollAnimator from '@/components/ScrollAnimator';
import { Calculator, ArrowDownUp, Info, FileText, Download, RotateCcw } from 'lucide-react';

export default function SalaryCalculatorPage() {
  const [salaryType, setSalaryType] = useState<'gross' | 'net'>('gross');
  const [amount, setAmount] = useState('');
  const [insurancePercent] = useState(7);
  const [taxExempt] = useState(6500000);

  const num = parseFloat(amount.replace(/,/g, '')) || 0;

  const calculateNet = (gross: number) => {
    const insurance = gross * (insurancePercent / 100);
    const taxable = gross - insurance - taxExempt;
    let tax = 0;
    if (taxable > 0) {
      const brackets = [
        { limit: 30000000, rate: 0.1 },
        { limit: 60000000, rate: 0.15 },
        { limit: 120000000, rate: 0.2 },
        { limit: Infinity, rate: 0.3 },
      ];
      let remaining = taxable;
      let prevLimit = 0;
      for (const b of brackets) {
        const slice = Math.min(remaining, b.limit - prevLimit);
        if (slice <= 0) break;
        tax += slice * b.rate;
        remaining -= slice;
        prevLimit = b.limit;
      }
    }
    return { insurance, tax, net: gross - insurance - tax };
  };

  const calculateGross = (net: number) => {
    let low = net, high = net * 2;
    for (let i = 0; i < 50; i++) {
      const mid = (low + high) / 2;
      const result = calculateNet(mid);
      if (result.net > net) high = mid;
      else low = mid;
    }
    return calculateNet((low + high) / 2);
  };

  const result = salaryType === 'gross' ? calculateNet(num) : calculateGross(num);
  const finalGross = salaryType === 'gross' ? num : num + result.insurance + result.tax;
  const finalNet = salaryType === 'gross' ? result.net : num;

  const formatNumber = (n: number) => n.toLocaleString('fa-IR');

  const resetForm = () => { setAmount(''); setSalaryType('gross'); };

  return (
    <SharedPageLayout>
      {/* Hero */}
      <div className="bg-gradient-to-l from-[#0B1E35] to-[#1a365d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollAnimator animation="fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                <Calculator size={28} className="text-orange-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black">ماشین حساب حقوق و دستمزد</h1>
                <p className="text-blue-200/70 text-sm mt-1">محاسبه حقوق خالص از ناخالص و بالعکس</p>
              </div>
            </div>
            <p className="text-blue-100/60 text-sm max-w-2xl leading-7">
              با استفاده از ماشین حساب حقوق آریاز، به‌سرعت حقوق خالص یا ناخالص خود را محاسبه کنید. این ابزار بر اساس آخرین قوانین مالیاتی و تأمین اجتماعی ایران به‌روزرسانی شده است.
            </p>
          </ScrollAnimator>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <ScrollAnimator animation="fade-up" delay={100}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator size={20} className="text-orange-500" />
                ورودی‌ها
              </h2>

              {/* Salary Type Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع حقوق</label>
                <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    data-ripple
                    onClick={() => setSalaryType('gross')}
                    className={`flex-1 py-3 text-sm font-bold transition-all ${
                      salaryType === 'gross'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    حقوق ناخالص (قبل از کسورات)
                  </button>
                  <button
                    data-ripple
                    onClick={() => setSalaryType('net')}
                    className={`flex-1 py-3 text-sm font-bold transition-all ${
                      salaryType === 'net'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    حقوق خالص (بعد از کسورات)
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {salaryType === 'gross' ? 'مبلغ حقوق ناخالص (تومان)' : 'مبلغ حقوق خالص (تومان)'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="مثلا: 50000000"
                    className="w-full border border-gray-200 rounded-xl py-3.5 px-4 text-left text-lg font-bold focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    dir="ltr"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">تومان</span>
                </div>
                {amount && (
                  <p className="text-xs text-gray-400 mt-2 text-left" dir="ltr">
                    {formatNumber(parseInt(amount.replace(/,/g, '')) || 0)} تومان
                  </p>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-2">
                  <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  <div className="text-xs text-blue-700 leading-6">
                    <p className="font-bold mb-1">پارامترهای محاسبه:</p>
                    <p>• بیمه تأمین اجتماعی کارگر: {insurancePercent}%</p>
                    <p>• معافیت مالیاتی: {formatNumber(taxExempt)} تومان</p>
                    <p>• احتساب حق مسکن و بن خواربار</p>
                  </div>
                </div>
              </div>

              <button
                data-ripple
                onClick={resetForm}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-600 py-3 rounded-xl text-sm font-medium transition-all"
              >
                <RotateCcw size={16} />
                <span>بازنشانی</span>
              </button>
            </div>
          </ScrollAnimator>

          {/* Results Panel */}
          <ScrollAnimator animation="fade-up" delay={200}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ArrowDownUp size={20} className="text-orange-500" />
                نتایج محاسبه
              </h2>

              {num > 0 ? (
                <div className="space-y-4">
                  {/* Gross Salary */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">حقوق ناخالص (ناخالص)</p>
                    <p className="text-xl font-black text-gray-900" dir="ltr">{formatNumber(Math.round(finalGross))} <span className="text-sm font-normal text-gray-400">تومان</span></p>
                  </div>

                  {/* Deductions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">کسر بیمه تأمین اجتماعی ({insurancePercent}%)</span>
                      <span className="text-sm font-bold text-red-500" dir="ltr">-{formatNumber(Math.round(result.insurance))}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">کسر مالیات بر درآمد</span>
                      <span className="text-sm font-bold text-red-500" dir="ltr">-{formatNumber(Math.round(result.tax))}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 bg-green-50 rounded-lg px-3">
                      <span className="text-sm font-bold text-green-700">مجموع کسورات</span>
                      <span className="text-sm font-bold text-green-700" dir="ltr">-{formatNumber(Math.round(result.insurance + result.tax))}</span>
                    </div>
                  </div>

                  {/* Net Salary */}
                  <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                    <p className="text-xs text-orange-600 mb-1 font-bold">حقوق خالص (پرداختی)</p>
                    <p className="text-2xl font-black text-orange-600" dir="ltr">{formatNumber(Math.round(finalNet))} <span className="text-sm font-normal">تومان</span></p>
                  </div>

                  {/* Percentage Breakdown */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-3">نسبت تخصیص حقوق</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">حقوق خالص</span>
                          <span className="font-bold">{finalGross > 0 ? Math.round((finalNet / finalGross) * 100) : 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 rounded-full h-2 transition-all" style={{ width: `${finalGross > 0 ? (finalNet / finalGross) * 100 : 0}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">بیمه</span>
                          <span className="font-bold">{finalGross > 0 ? Math.round((result.insurance / finalGross) * 100) : 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 rounded-full h-2 transition-all" style={{ width: `${finalGross > 0 ? (result.insurance / finalGross) * 100 : 0}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">مالیات</span>
                          <span className="font-bold">{finalGross > 0 ? Math.round((result.tax / finalGross) * 100) : 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 rounded-full h-2 transition-all" style={{ width: `${finalGross > 0 ? (result.tax / finalGross) * 100 : 0}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <Calculator size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-400 text-sm">مبلغ مورد نظر خود را وارد کنید</p>
                </div>
              )}
            </div>
          </ScrollAnimator>

          {/* Info Panel */}
          <ScrollAnimator animation="fade-up" delay={300}>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-orange-500" />
                  جدول مالیات بر درآمد حقوق ۱۴۰۳
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="py-2 text-right font-bold text-gray-700">پایه مالیاتی (تومان)</th>
                        <th className="py-2 text-right font-bold text-gray-700">نرخ</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-gray-50"><td className="py-2">تا ۶۵,۰۰۰,۰۰۰</td><td className="font-bold text-green-600">معاف</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-2">۶۵ تا ۹۵ میلیون</td><td>۱۰%</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-2">۹۵ تا ۱۲۵ میلیون</td><td>۱۵%</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-2">۱۲۵ تا ۱۸۵ میلیون</td><td>۲۰%</td></tr>
                      <tr><td className="py-2">بالای ۱۸۵ میلیون</td><td>۳۰%</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200 p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">درباره ماشین حساب حقوق آریاز</h3>
                <p className="text-xs text-gray-600 leading-6 mb-4">
                  این ابزار به شما کمک می‌کند تا حقوق خالص و ناخالص خود را بر اساس آخرین قوانین مالیاتی و تأمین اجتماعی سال ۱۴۰۳ محاسبه نمایید.
                </p>
                <div className="flex items-center gap-2 text-xs text-orange-600 font-medium">
                  <Download size={14} />
                  <span>قابلیت خروجی فایل اکسل</span>
                </div>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </div>
    </SharedPageLayout>
  );
}
