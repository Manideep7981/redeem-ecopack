import React, { useState, useMemo } from 'react';
import { PRODUCTS, COMPANY_INFO } from '../data/products';
import { Calculator, Sparkles, FileText, Check, AlertCircle, ArrowRight, ShieldCheck, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Estimator({ onGenerateQuote }) {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Inputs
  const [width, setWidth] = useState(selectedProduct.defaultWidth);
  const [length, setLength] = useState(selectedProduct.defaultLength);
  const [gusset, setGusset] = useState(selectedProduct.defaultGusset);
  const [micron, setMicron] = useState(selectedProduct.defaultMicron);
  const [handleType, setHandleType] = useState(selectedProduct.handleTypes[0]);
  const [printingType, setPrintingType] = useState('1-color'); // plain, 1-color, multi-color
  const [quantity, setQuantity] = useState(10000);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // When product changes, reset defaults
  const handleProductChange = (prodId) => {
    const prod = PRODUCTS.find((p) => p.id === prodId);
    if (prod) {
      setSelectedProductId(prodId);
      setWidth(prod.defaultWidth);
      setLength(prod.defaultLength);
      setGusset(prod.defaultGusset);
      setMicron(prod.defaultMicron);
      setHandleType(prod.handleTypes[0]);
    }
  };

  // Calculations
  const calculations = useMemo(() => {
    // Bio polymer density (PLA/PBAT blend) ~ 1.25 g/cm³
    const DENSITY = 1.25;
    
    // Total flat width including gusset (inches)
    const effectiveWidth = Number(width) + Number(gusset || 0);
    const effectiveLength = Number(length);
    
    // Total film area for 2 layers (front + back) in sq cm
    const areaSqInches = 2 * effectiveWidth * effectiveLength;
    const areaSqCm = areaSqInches * 6.4516;
    
    // Thickness in cm (1 micron = 0.0001 cm)
    const thicknessCm = Number(micron) * 0.0001;
    
    // Weight of 1 bag in grams
    const rawWeightGrams = areaSqCm * thicknessCm * DENSITY;
    
    // Adjustment for handle cutout / reinforcement
    let handleAdjustment = 0;
    if (handleType.includes('D-Cut') || handleType.includes('Punch')) {
      handleAdjustment = -0.5; // cutout reduces weight slightly
    } else if (handleType.includes('Loop')) {
      handleAdjustment = 1.8; // loop handle adds weight
    }
    const singleBagWeight = Math.max(1, rawWeightGrams + handleAdjustment);
    
    // Batch weight in kg
    const totalBatchKg = (singleBagWeight * quantity) / 1000;
    
    // Base polymer pricing
    const baseRatePerKg = selectedProduct.baseRatePerKg;
    
    // Printing extra cost
    let printCostPerKg = 0;
    if (printingType === '1-color') printCostPerKg = 15;
    if (printingType === 'multi-color') printCostPerKg = 30;
    
    // Quantity volume discount
    let volumeDiscount = 0;
    if (quantity >= 50000) volumeDiscount = 0.05; // 5% discount
    if (quantity >= 100000) volumeDiscount = 0.10; // 10% discount
    
    const finalRatePerKg = (baseRatePerKg + printCostPerKg) * (1 - volumeDiscount);
    const totalCost = totalBatchKg * finalRatePerKg;
    const costPerPiece = totalCost / quantity;
    
    // Eco Impact Calculations
    const petroleumPlasticAvoidedKg = totalBatchKg.toFixed(1);
    const co2AvoidedKg = (totalBatchKg * 2.5).toFixed(1); // 2.5 kg CO2e per kg plastic saved
    
    return {
      singleBagWeight: singleBagWeight.toFixed(2),
      totalBatchKg: totalBatchKg.toFixed(1),
      ratePerKg: finalRatePerKg.toFixed(2),
      costPerPiece: costPerPiece.toFixed(3),
      totalCost: Math.round(totalCost),
      petroleumPlasticAvoidedKg,
      co2AvoidedKg,
      volumeDiscount: Math.round(volumeDiscount * 100)
    };
  }, [width, length, gusset, micron, handleType, printingType, quantity, selectedProduct]);

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleCreateQuotation = () => {
    handleCelebrate();
    onGenerateQuote({
      product: selectedProduct,
      specs: { width, length, gusset, micron, handleType, printingType, quantity },
      calculations,
      client: { name: clientName || 'Valued B2B Customer', phone: clientPhone || 'N/A' }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border-l-4 border-emerald-600 p-4 rounded-r-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>B2B Bag Dimension & Commercial Price Estimator</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">
              Live Factory Rates
            </span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Formulated for 100% biodegradable PLA/PBAT compostable polymers per IS/ISO 17088 standards.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          CIPET & TSPCB Compliant
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Product Selector & Configuration Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {/* 1. Product Category Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Select Biodegradable Product Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRODUCTS.map((prod) => {
                const isSelected = prod.id === selectedProductId;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => handleProductChange(prod.id)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="truncate font-semibold">{prod.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{prod.category}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Dimensions Specification */}
          <div className="border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Dimensions & Thickness
              </label>
              <span className="text-[11px] text-slate-500">Unit: Inches & Microns</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600">Width (inches)</label>
                <input
                  type="number"
                  min="4"
                  max="48"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600">Length (inches)</label>
                <input
                  type="number"
                  min="4"
                  max="60"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600">Side/Bottom Gusset</label>
                <input
                  type="number"
                  min="0"
                  max="12"
                  value={gusset}
                  onChange={(e) => setGusset(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Micron Selector Slider */}
            <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Thickness (Microns):</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-sm">
                  {micron} µm
                </span>
              </div>
              <input
                type="range"
                min={selectedProduct.minMicron}
                max={selectedProduct.maxMicron}
                step="5"
                value={micron}
                onChange={(e) => setMicron(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Min: {selectedProduct.minMicron}µm</span>
                <span className="text-emerald-700 font-medium">
                  {micron >= 50 ? '✓ Compliant with India Single-Use Plastic Guidelines' : 'Special Compostable Exemption'}
                </span>
                <span>Max: {selectedProduct.maxMicron}µm</span>
              </div>
            </div>
          </div>

          {/* 3. Handle & Customization */}
          <div className="border-t border-slate-100 pt-5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              3. Handle Style & Printing
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600">Handle / Sealing Type</label>
                <select
                  value={handleType}
                  onChange={(e) => setHandleType(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {selectedProduct.handleTypes.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">Custom Branding / Printing</label>
                <select
                  value={printingType}
                  onChange={(e) => setPrintingType(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="plain">Plain / Non-Printed (Base Rate)</option>
                  <option value="1-color">1-Color Single Side Brand Logo (+₹15/kg)</option>
                  <option value="multi-color">Multi-Color HD Flexo Printing (+₹30/kg)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Quantity and Order Volume */}
          <div className="border-t border-slate-100 pt-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                4. Order Quantity (Pieces)
              </label>
              {calculations.volumeDiscount > 0 && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  🎉 {calculations.volumeDiscount}% Bulk Discount Applied
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="1000"
                min="1000"
                max="1000000"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1000, Number(e.target.value)))}
                className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex gap-2">
                {[5000, 10000, 50000, 100000].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md border ${
                      quantity === q
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {(q / 1000)}k
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Client Details (Optional for Quick Quotation) */}
          <div className="border-t border-slate-100 pt-5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              5. Client / Business Details (For Formal Quote)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Business / Client Name (e.g., Heritage Dairy)"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="Contact Phone / WhatsApp"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Calculation Summary & Quotation Call to Action */}
        <div className="lg:col-span-5 space-y-5">
          {/* Price & Weight Card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"></div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  Cost & Material Estimate
                </span>
                <div className="text-lg font-bold mt-0.5">{selectedProduct.name}</div>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono">
                {width}" × {length}" ({micron}µ)
              </span>
            </div>

            {/* Large Total Cost */}
            <div className="my-5">
              <div className="text-xs text-slate-400 font-medium">Estimated Total (Excl. GST)</div>
              <div className="text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-1 mt-1">
                <span>₹{calculations.totalCost.toLocaleString('en-IN')}</span>
                <span className="text-xs font-normal text-slate-400">
                  (@ ₹{calculations.ratePerKg}/kg)
                </span>
              </div>
              <div className="text-xs text-emerald-400 font-medium mt-1">
                Approx. ₹{calculations.costPerPiece} per piece
              </div>
            </div>

            {/* Technical Weight Specs */}
            <div className="grid grid-cols-2 gap-3 bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Single Unit Weight</span>
                <span className="font-bold text-slate-200 text-sm">{calculations.singleBagWeight} g</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Total Batch Weight</span>
                <span className="font-bold text-emerald-400 text-sm">{calculations.totalBatchKg} kg</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Polymer Blend</span>
                <span className="font-medium text-slate-300 text-[11px]">PLA + PBAT Bio-resin</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Est. Production Time</span>
                <span className="font-medium text-slate-300 text-[11px]">3 - 5 Working Days</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleCreateQuotation}
              className="mt-6 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Generate Official Quotation Sheet</span>
            </button>
          </div>

          {/* Environmental Impact Metrics Card */}
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Environmental Offset for this Batch</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                <span className="text-slate-500 block text-[10px] font-semibold uppercase">
                  Fossil Plastic Eliminated
                </span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">
                  {calculations.petroleumPlasticAvoidedKg} <span className="text-xs font-normal">kg</span>
                </span>
                <p className="text-[10px] text-emerald-600 mt-0.5">Zero persistent microplastics</p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                <span className="text-slate-500 block text-[10px] font-semibold uppercase">
                  CO₂ Footprint Offset
                </span>
                <span className="text-lg font-bold text-emerald-700 mt-1 block">
                  {calculations.co2AvoidedKg} <span className="text-xs font-normal">kg CO₂e</span>
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5">Equivalent to planting ~12 trees</p>
              </div>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-emerald-200/60 text-[11px] text-slate-700 flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                Naturally disintegrates into water, carbon dioxide, and rich organic compost in commercial & soil composting environments within 180 days.
              </span>
            </div>
          </div>

          {/* Factory Guarantee */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-800">100% Guaranteed CIPET Compliance</span>
            </div>
            <span className="text-[11px] text-slate-400">Telangana, IN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
