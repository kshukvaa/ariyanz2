'use client';

import React from 'react';
import { FileText, Headphones, BookOpen, Building2, Briefcase, Bot, Gift, Star, ShoppingCart, Users, Settings, UserCheck, HelpCircle, ClipboardList, Scale, ShieldCheck, Search, GraduationCap, Map, Award, Target, Wrench, Clock, Edit, Download, Phone, MessageCircle, ChevronLeft, Lightbulb, BarChart3, TrendingUp, Zap, HeartHandshake, Globe, Laptop, BookMarked, FolderOpen, Table2, LayoutDashboard, CheckSquare, ListChecks, Shield, Lock, Headset, MessageSquare, Mail, Calendar, Bell, Video, FileCheck, PenTool, Archive, Layers, Package, BadgeDollarSign, CreditCard, Crown, Gem, Rocket, Sparkles, Brain, Cpu, Workflow, PieChart, Database } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Headphones, BookOpen, Building2, Briefcase, Bot, Gift,
  Star, ShoppingCart, FileText, Users, Settings, UserCheck,
  HelpCircle, ClipboardList, Scale, ShieldCheck, Search,
  GraduationCap, Map, Award, Target, Wrench, Clock, Edit,
  Download, Phone, MessageCircle, ChevronLeft, Lightbulb,
  BarChart3, TrendingUp, Zap, HeartHandshake, Globe,
  Laptop, BookMarked, FolderOpen, Table2, LayoutDashboard,
  CheckSquare, ListChecks, Shield, Lock, Headset, MessageSquare,
  Mail, Calendar, Bell, Video, FileCheck, PenTool, Archive,
  Layers, Package, BadgeDollarSign, CreditCard, Crown, Gem,
  Rocket, Sparkles, Brain, Cpu, Workflow, PieChart, Database,
};

function resolveIcon(name: string): React.ComponentType<any> {
  return iconMap[name] || FileText;
}

interface MainPageClientProps {
  iconName: string;
  title: string[];
  subtitle: string;
  keywords: string;
  accentColor: string;
  accentBg: string;
  heroVariant: string;
  features: { label: string; desc: string; iconName: string }[];
  stats: { value: string; label: string }[];
  label: string;
}

export default function MainPageClient({ iconName, title, subtitle, keywords, accentColor, accentBg, heroVariant, features, stats, label }: MainPageClientProps) {
  const CreativeHero = require('@/components/CreativeHero').default;
  const Icon = resolveIcon(iconName);

  return (
    <>
      <CreativeHero
        variant={heroVariant as any}
        title={title}
        subtitle={subtitle}
        keywords={keywords}
        accentColor={accentColor}
        accentBg={accentBg}
        icon={Icon}
        features={features.map(f => ({ ...f, icon: resolveIcon(f.iconName) }))}
        stats={stats}
      />
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">محتوای {label}</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">در این بخش می‌توانید محتوای تخصصی مرتبط با {label} را مشاهده کنید.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((f, i) => {
              const FIcon = resolveIcon(f.iconName);
              return (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: accentBg }}>
                    <FIcon size={22} style={{ color: accentColor }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.label}</h3>
                  <p className="text-sm text-gray-500 leading-7">{f.desc}</p>
                </div>
              );
            })}
          </div>
          {stats && (
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {stats.map((s, i) => (
                <div key={i} className="text-center py-6">
                  <p className="text-2xl font-black" style={{ color: accentColor }}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}