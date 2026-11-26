import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/products';
import { Sparkles, Award, Trees, Droplets, Globe, Download, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SustainabilityHub() {
  const [annualUnits, setAnnualUnits] = useState(100000);
  const [businessName, setBusinessName] = useState('Green Grocers Supermarket');

  // Multipliers based on life cycle analysis
  // Average retail bag is ~12g
  const totalWeightKg = (annualUnits * 12) / 1000;
  const fossilFuelAvoidedKg = totalWeightKg.toFixed(0);
  const co2AvoidedKg = (totalWeightKg * 2.5).toFixed(0);
  const barrelsOilSaved = (totalWeightKg * 0.007).toFixed(1);
  const treesEquivalent = Math.round(Number(co2AvoidedKg) / 21); // 1 tree absorbs ~21 kg CO2/year

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-br from-emerald-800 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-sm border border-emerald-500/30">
            <Globe className="w-3.5 h-3.5" />
            Corporate Plastic Offset & ESG Reporting
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Measure Your Brand's Environmental Footprint
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            By switching from conventional single-use plastics to Redeem Industry's CIPET-certified biodegradable packaging, businesses directly prevent petroleum depletion, reduce greenhouse emissions, and eliminate toxic landfill pollution.
          </p>
        </div>
      </div>

      {/* Interactive Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            ESG Impact Simulation
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Your Business / Brand Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-700">Estimated Annual Bag Usage:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-sm">
                {annualUnits.toLocaleString('en-IN')} covers
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="2000000"
              step="10000"
              value={annualUnits}
              onChange={(e) => setAnnualUnits(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10k / year</span>
              <span>100k</span>
              <span>1M</span>
              <span>2 Million+</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select Preset Industry Volume
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAnnualUnits(50000)}
                className="p-2 border border-slate-200 rounded-lg text-center text-xs hover:border-emerald-500 hover:bg-emerald-50"
              >
                <div className="font-bold text-slate-800">50,000</div>
                <div className="text-[10px] text-slate-500">Kirana Store</div>
              </button>
              <button
                type="button"
                onClick={() => setAnnualUnits(250000)}
                className="p-2 border border-slate-200 rounded-lg text-center text-xs hover:border-emerald-500 hover:bg-emerald-50"
              >
                <div className="font-bold text-slate-800">2,50,000</div>
                <div className="text-[10px] text-slate-500">Supermarket</div>
              </button>
              <button
                type="button"
                onClick={() => setAnnualUnits(1000000)}
                className="p-2 border border-slate-200 rounded-lg text-center text-xs hover:border-emerald-500 hover:bg-emerald-50"
              >
                <div className="font-bold text-slate-800">10,00,000</div>
                <div className="text-[10px] text-slate-500">Mall Chain</div>
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600">
            <span className="font-semibold text-slate-900 block mb-1">Government Compliance Benefit:</span>
            Using Redeem certified compostable covers guarantees 100% compliance with Telangana State Pollution Control Board guidelines & the Central Plastic Waste Management Rules.
          </div>
        </div>

        {/* Certificate / Impact Display (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border-2 border-emerald-500/30 shadow-md flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-2 py-0.5 rounded-full">
                  OFFICIAL SUSTAINABILITY ESTIMATE
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  {businessName}
                </h4>
              </div>
              <Award className="w-8 h-8 text-amber-500" />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
                <span className="text-xs text-emerald-800 font-semibold block uppercase">
                  Fossil Plastic Eliminated
                </span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">
                  {Number(fossilFuelAvoidedKg).toLocaleString('en-IN')} <span className="text-xs font-normal">kg</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Replaced with plant starch & bio-polymers.
                </p>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
                <span className="text-xs text-emerald-800 font-semibold block uppercase">
                  CO₂ Footprint Reduced
                </span>
                <div className="text-2xl font-extrabold text-emerald-700 mt-1">
                  {Number(co2AvoidedKg).toLocaleString('en-IN')} <span className="text-xs font-normal">kg CO₂e</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Significant emissions abatement.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-600 font-semibold block uppercase flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-emerald-600" /> Forest Equivalent
                </span>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  ~{treesEquivalent} Mature Trees
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Carbon absorption equivalent per year.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-600 font-semibold block uppercase flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-600" /> Crude Oil Saved
                </span>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  {barrelsOilSaved} Barrels
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Petrochemical extraction avoided.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic">
              *Certified test metrics as per Central Institute of Petrochemicals Engineering & Technology (CIPET) and Telangana State Pollution Control Board guidelines.
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleCelebrate}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4" /> Celebrate Impact
            </button>

            <button
              onClick={() => window.print()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print ESG Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
