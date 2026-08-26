import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" style={{ direction: 'rtl' }}>
      <div className="text-center px-4">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-4xl">۴۰۴</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">صفحه مورد نظر یافت نشد</h1>
        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto leading-7">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
