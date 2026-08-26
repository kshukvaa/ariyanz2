import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

const SYSTEM_PROMPT = `
تو دستیار هوشمند آریاز هستی، یک پلتفرم جامع توسعه منابع انسانی.

قوانین:
- به زبان فارسی پاسخ بده و مودب و حرفه‌ای باش
- پاسخ‌های کوتاه و کاربردی بده (حداکثر ۳-۴ جمله)
- اگر کاربر سوال خارج از حوزه آریاز پرسید، مودبانه بگو فقط در حوزه منابع انسانی می‌تونی کمک کنی

بخش‌های آریاز:
۱. دوره‌های آموزشی: دوره‌های تخصصی منابع انسانی، مدیریت، سنجش و ارزیابی
۲. ویدئوهای آموزشی رایگان: ویدئوهای ورودی، مدیریت و رهبری، مهارت‌های تخصصی
۳. مقالات: مقالات کاربردی HR با دسته‌بندی و صفحه‌بندی
۴. خدمات سازمانی: مشاوره تخصصی، طرح‌های HR، برون‌سپاری
۵. فرم و ابزار: فرم‌های کاربردی، اکسل‌های محاسباتی، چک‌لیست‌ها
۶. مستر لیست: لیست فرم‌ها و دستورالعمل‌های آماده دانلود با فیلتر رایگان
۷. ایجنت‌های هوشمند: ایجنت رهبری فرآیند، تحصیلی HR، عملکرد
۸. فروشگاه: محصولات تکی و بسته‌ای
۹. اشتراک: سه سطح پایه، اکثر و طلایی
۱۰. مسیرهای یادگیری: مسیر آموزشی مشخص برای رشد شغلی
۱۱. تقویم آموزشی: برنامه رویدادها و دوره‌های آینده
۱۲. پشتیبانی: تیکت، واتساپ، چت آنلاین
`.trim();

let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

function buildHistory(history: Array<{ role: string; content: string }>) {
  return history.map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content,
  }));
}

function generateSuggestions(message: string): string[] {
  const suggestions: string[] = [];
  if (message.includes('دوره') || message.includes('آموزش')) {
    suggestions.push('دوره‌های رایگان رو ببینم', 'مسیرهای یادگیری چیست؟', 'قیمت دوره‌ها چقدره؟');
  } else if (message.includes('ویدئو') || message.includes('ویدیو') || message.includes('رایگان')) {
    suggestions.push('ویدئوهای مدیریت رو ببینم', 'آیا فرم رایگان هم دارید؟', 'دوره‌های پولی چیه؟');
  } else if (message.includes('فرم') || message.includes('دانلود') || message.includes('ابزار')) {
    suggestions.push('لیست فرم‌ها رو ببینم', 'ابزارهای هوشمند چیست؟', 'مستر لیست دستورالعمل‌ها');
  } else if (message.includes('مشاوره') || message.includes('سازمان') || message.includes('خدمات')) {
    suggestions.push('مشاوره تخصصی HR', 'خدمات برون‌سپاری', 'طرح سنجش و ارزیابی');
  } else if (message.includes('عضو') || message.includes('اشتراک') || message.includes('خرید')) {
    suggestions.push('پلن‌های اشتراک', 'قیمت فروشگاه', 'محصولات رایگان');
  } else if (message.includes('ایجنت') || message.includes('هوشمند')) {
    suggestions.push('ایجنت‌های رهبری فرآیند', 'ایجنت‌های تحصیلی', 'ایجنت‌های عملکرد');
  } else {
    suggestions.push('ویدئوهای آموزشی رایگان', 'دوره‌های آموزشی', 'فرم‌ها و ابزارها');
  }
  return suggestions.slice(0, 3);
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ reply: 'لطفاً پیام خود را وارد کنید.' });
    }
    const zai = await getZAI();
    const chatHistory = buildHistory(history);
    const response = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...chatHistory,
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });
    const reply = response.choices?.[0]?.message?.content || 'متأسفانه خطایی رخ داد.';
    const suggestions = generateSuggestions(message);
    return NextResponse.json({ reply, suggestions });
  } catch (error) {
    console.error('Assistant API error:', error);
    return NextResponse.json(
      { reply: 'متأسفانه در حال حاضر نمی‌توانم پاسخ دهم. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    );
  }
}
