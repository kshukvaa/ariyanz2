'use client';

import React from 'react';
import { ArrowLeft, FileText, Headphones, BookOpen, Building2, Briefcase, Bot, Gift, Star, ShoppingCart, Users, Settings, UserCheck, HelpCircle, ClipboardList, Scale, ShieldCheck, Search, GraduationCap, Map, Award, Target, Wrench, Clock, Edit, Download, Phone, MessageCircle, ChevronLeft, Lightbulb, BarChart3, TrendingUp, Zap, HeartHandshake, Globe, Laptop, BookMarked, FolderOpen, Table2, LayoutDashboard, CheckSquare, ListChecks, Shield, Lock, Headset, MessageSquare, Mail, Calendar, Bell, Video, FileCheck, PenTool, Archive, Layers, Package, BadgeDollarSign, CreditCard, Crown, Gem, Rocket, Sparkles, Brain, Cpu, Workflow, PieChart, Database } from 'lucide-react';

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

interface SubPageClientProps {
  parentIconName: string;
  title: string[];
  subtitle: string;
  keywords: string;
  accentColor: string;
  accentBg: string;
  heroVariant: string;
  stats: { value: string; label: string }[];
  columns: { header: string; items: string[] }[];
  label: string;
}

export default function SubPageClient({ parentIconName, title, subtitle, keywords, accentColor, accentBg, heroVariant, stats, columns, label }: SubPageClientProps) {
  const CreativeHero = require('@/components/CreativeHero').default;
  const Icon = resolveIcon(parentIconName);
  const subFeatures = columns.flatMap(col =>
    col.items.map((item) => ({
      label: item,
      desc: `محتوای تخصصی در حوزه ${col.header}`,
      iconName: 'FileText',
    })),
  );

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
        features={subFeatures.map(f => ({ ...f, icon: resolveIcon(f.iconName) }))}
        stats={stats}
      />
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">{label}</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">{subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {columns.map((col, ci) => (
              <div key={ci}>
                <h3 className="font-bold text-gray-900 mb-4 text-base" style={{ color: accentColor }}>{col.header}</h3>
                <div className="space-y-3">
                  {col.items.map((item, ii) => (
                    <a
                      key={ii}
                      href="#"
                      className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: accentBg }}
                      >
                        <FileText size={18} style={{ color: accentColor }} />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-800 group-hover:text-orange-600 transition-colors">{item}</span>
                      </div>
                      <ArrowLeft size={14} className="text-gray-400 group-hover:-translate-x-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}