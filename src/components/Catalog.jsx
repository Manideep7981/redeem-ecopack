import React from 'react';
import { PRODUCTS, COMPANY_INFO } from '../data/products';
import { Package, ShieldCheck, Check, Sparkles, Layers } from 'lucide-react';

export default function Catalog({ onSelectProductForQuote }) {
  return (
    <div className="space-y-6">
      {/* Catalog Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Package className="w-3.5 h-3.5 text-emerald-600" />
            Complete Product Portfolio
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Certified Biodegradable Packaging Solutions
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl mt-1">
            Engineered using cutting-edge compostable polymers that break down naturally without leaving microplastics or toxic residues. All product lines are tested and certified by CIPET and approved by Telangana State PCB.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs text-slate-700 flex-shrink-0">
          <div className="font-bold text-slate-900 text-sm">7 Product Lines</div>
          <div className="text-[11px] text-emerald-700 font-medium">Custom Sizes & Microns Available</div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  {prod.category}
                </span>
                <span className="text-slate-400 font-mono">
                  {prod.minMicron}µm - {prod.maxMicron}µm
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-slate-900 tracking-tight">{prod.name}</h3>
              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {prod.description}
              </p>

              {/* Standard Dimensions */}
              <div className="my-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Standard Size:</span>
                  <span className="font-semibold text-slate-800">
                    {prod.defaultWidth}" × {prod.defaultLength}" (+{prod.defaultGusset}" gusset)
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Base Rate:</span>
                  <span className="font-semibold text-emerald-700">₹{prod.baseRatePerKg} / kg</span>
                </div>
              </div>

              {/* Applications */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Best Suited For
                </span>
                <div className="flex flex-wrap gap-1">
                  {prod.applications.map((app) => (
                    <span
                      key={app}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-1 text-[11px] text-slate-600">
                {prod.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onSelectProductForQuote(prod.id)}
              className="mt-5 w-full bg-slate-900 hover:bg-emerald-600 text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Calculate Price & Quote</span>
              <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
