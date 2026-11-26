import React from 'react';
import { Leaf, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'estimator', label: 'B2B Bag & Price Estimator', icon: '🧮' },
    { id: 'verifier', label: 'CIPET / PCB Batch Verifier', icon: '🔍' },
    { id: 'catalog', label: 'Product Catalog (7 Types)', icon: '📦' },
    { id: 'sustainability', label: 'Eco-Impact & ESG Calculator', icon: '🌱' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm no-print">
      {/* Top Bar for Certifications */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <Award className="w-3.5 h-3.5" /> {COMPANY_INFO.experience}
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> {COMPANY_INFO.cipetCert}
            </span>
            <span className="hidden lg:inline text-slate-400">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> {COMPANY_INFO.pcbApproval}
            </span>
          </div>
          <div className="text-slate-400 text-[11px] font-mono">
            Standard: <span className="text-white font-medium">IS/ISO 17088 Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo and Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Leaf className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900">REDEEM</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                INDUSTRY
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {COMPANY_INFO.tagline}
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
