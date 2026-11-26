import React from 'react';
import { COMPANY_INFO } from '../data/products';
import { X, Printer, ShieldCheck, CheckCircle2, Download } from 'lucide-react';

export default function QuotationPrintModal({ quoteData, onClose }) {
  if (!quoteData) return null;

  const { product, specs, calculations, client } = quoteData;
  const quoteNumber = `RED-QT-${Date.now().toString().slice(-6)}`;
  const quoteDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const gstAmount = Math.round(calculations.totalCost * 0.18);
  const grandTotal = calculations.totalCost + gstAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Commercial Quotation Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Document Area */}
        <div className="p-8 sm:p-10 text-slate-800 space-y-6 print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-emerald-600 pb-5 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  REDEEM INDUSTRY
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                  02 Years of Success
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                {COMPANY_INFO.tagline}
              </p>
              <div className="text-[11px] text-slate-500 mt-1 space-y-0.5">
                <div>Telangana State, India | {COMPANY_INFO.email} | {COMPANY_INFO.phone}</div>
                <div className="text-emerald-700 font-semibold">
                  CIPET Tested & Certified | Telangana State Pollution Control Board Approved
                </div>
              </div>
            </div>

            <div className="text-right text-xs">
              <div className="text-sm font-bold text-slate-900">PROFORMA ESTIMATE</div>
              <div className="font-mono text-emerald-700 font-bold mt-0.5">{quoteNumber}</div>
              <div className="text-slate-500 mt-0.5">Date: {quoteDate}</div>
              <div className="text-slate-500">Validity: 15 Days</div>
            </div>
          </div>

          {/* Client Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex justify-between">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Customer Details:</span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{client.name}</div>
              <div className="text-slate-600 mt-0.5">Contact: {client.phone}</div>
            </div>
            <div className="text-right">
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Standard:</span>
              <div className="font-semibold text-slate-900 mt-0.5">IS/ISO 17088:2021</div>
              <div className="text-emerald-700 font-medium">100% Compostable Packaging</div>
            </div>
          </div>

          {/* Product Specifications Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-3">Specs (Size / Micron)</th>
                  <th className="py-2.5 px-3 text-right">Quantity</th>
                  <th className="py-2.5 px-3 text-right">Rate / Unit</th>
                  <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{product.name}</div>
                    <div className="text-[11px] text-slate-500">
                      Handle: {specs.handleType} | Print: {specs.printingType}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-mono mt-0.5">
                      Single Bag: ~{calculations.singleBagWeight}g | Total Batch: {calculations.totalBatchKg} kg
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div>{specs.width}" × {specs.length}" (+{specs.gusset}" gusset)</div>
                    <div className="font-semibold text-slate-700">{specs.micron} µm</div>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-800">
                    {Number(specs.quantity).toLocaleString('en-IN')} pcs
                  </td>
                  <td className="py-3 px-3 text-right text-slate-700">
                    ₹{calculations.costPerPiece}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    ₹{calculations.totalCost.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pricing Summary */}
          <div className="flex justify-end text-xs">
            <div className="w-64 space-y-2 border border-slate-200 p-4 rounded-xl bg-slate-50">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (Excl. Tax):</span>
                <span className="font-semibold">₹{calculations.totalCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST @ 18%:</span>
                <span className="font-semibold">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-slate-300 pt-2 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Amount:</span>
                <span className="text-emerald-700">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Environmental Compliance Statement */}
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-[11px] text-slate-700 space-y-1">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Statutory Certification & Degradation Warranty
            </div>
            <p>
              This product is manufactured using certified bio-based polymers (PBAT, PLA, and plant starch) and tested at CIPET in compliance with IS/ISO 17088 standards. It is exempted from the single-use plastic ban under Telangana State Pollution Control Board guidelines.
            </p>
          </div>

          {/* Terms and Sign-off */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between text-[10px] text-slate-500 gap-4">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-700 uppercase">Commercial Terms:</span>
              <div>1. 50% advance along with purchase order; balance before dispatch.</div>
              <div>2. Standard lead time: 3 to 5 business days from plate approval.</div>
              <div>3. Freight and unloading extra at actuals unless agreed otherwise.</div>
            </div>

            <div className="text-right sm:self-end pt-4 sm:pt-0">
              <div className="font-bold text-slate-800 text-xs">For REDEEM INDUSTRY</div>
              <div className="text-slate-400 text-[10px] mt-6">Authorized Signatory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
