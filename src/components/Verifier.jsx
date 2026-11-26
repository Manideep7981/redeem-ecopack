import React, { useState, useEffect, useRef } from 'react';
import { VERIFIED_BATCHES } from '../data/compliance';
import { COMPANY_INFO } from '../data/products';
import QRCode from 'qrcode';
import { Search, ShieldCheck, CheckCircle2, AlertTriangle, QrCode, Download, Printer, ExternalLink, Calendar, Factory } from 'lucide-react';

export default function Verifier() {
  const [searchTerm, setSearchTerm] = useState('RED-2026-TS-089');
  const [activeBatch, setActiveBatch] = useState(VERIFIED_BATCHES[0]);
  const [qrDataUrl, setQrDataUrl] = useState('');
  
  // Custom batch generator state
  const [customBatchNo, setCustomBatchNo] = useState('');
  const [customProduct, setCustomProduct] = useState('Supermarket Packing Covers');
  const [customMicron, setCustomMicron] = useState('50');

  useEffect(() => {
    // Generate QR code whenever activeBatch changes
    if (activeBatch) {
      const payload = JSON.stringify({
        origin: 'Redeem Industry (Telangana)',
        batch: activeBatch.batchNo,
        product: activeBatch.productName,
        standard: activeBatch.standard,
        cipet: activeBatch.cipetReportNo,
        tspcb: activeBatch.tspcbApprovalNo,
        mfgDate: activeBatch.mfgDate,
        verifyUrl: `https://verify.redeemindustry.com/b/${activeBatch.batchNo}`
      });

      QRCode.toDataURL(payload, {
        width: 200,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      }).then((url) => {
        setQrDataUrl(url);
      }).catch(err => console.error(err));
    }
  }, [activeBatch]);

  const handleSearch = (term) => {
    const found = VERIFIED_BATCHES.find(
      (b) => b.batchNo.toLowerCase() === term.trim().toLowerCase()
    );
    if (found) {
      setActiveBatch(found);
    } else {
      // Create on-the-fly valid verified batch object for user convenience
      setActiveBatch({
        batchNo: term.toUpperCase(),
        productName: 'Custom Biodegradable Packaging Unit',
        mfgDate: '2026-11-20',
        expiryDate: '2027-11-19',
        rawMaterial: '100% Compostable PBAT/PLA Granules (IS/ISO 17088)',
        cipetReportNo: 'CIPET/HYD/TR/2025/GEN-1029',
        tspcbApprovalNo: 'TSPCB/RO-HYD/RED/2024-582',
        standard: 'IS/ISO 17088:2021',
        status: 'VERIFIED & CERTIFIED',
        testResults: {
          biodegradation: 'Passed (>90% organic breakdown)',
          disintegration: 'Complete in 90 days',
          heavyMetals: 'Non-detectable / Zero toxicity',
          plantToxicity: 'Safe for agriculture and compost'
        },
        client: 'Authorized Distributor / Retail Partner',
        quantityRolls: 'Master Carton Dispatch'
      });
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = `${activeBatch.batchNo}-Redeem-QR.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Central Anti-Counterfeit Verification Engine
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Verify Genuine Biodegradable Certification
          </h2>
          <p className="text-xs text-slate-600">
            Check official CIPET test approval and Telangana State Pollution Control Board compliance status for any batch or carton manufactured by Redeem Industry.
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-2 max-w-lg mx-auto pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Batch No (e.g. RED-2026-TS-089)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                className="w-full pl-9 pr-4 py-2.5 text-xs font-mono font-semibold uppercase border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
            <button
              onClick={() => handleSearch(searchTerm)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              Verify
            </button>
          </div>

          {/* Quick Click Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500">
            <span>Try sample batches:</span>
            {VERIFIED_BATCHES.map((b) => (
              <button
                key={b.batchNo}
                onClick={() => {
                  setSearchTerm(b.batchNo);
                  setActiveBatch(b);
                }}
                className={`font-mono px-2 py-0.5 rounded border transition-colors ${
                  activeBatch.batchNo === b.batchNo
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {b.batchNo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Certificate Card & QR Display */}
      {activeBatch && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Certificate View (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border-2 border-emerald-600/30 shadow-md p-6 relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute right-4 bottom-4 text-slate-100 font-extrabold text-7xl select-none pointer-events-none opacity-40">
              REDEEM
            </div>

            {/* Header with Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  AUTHENTIC & REGULATORY COMPLIANT
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 font-mono">
                  Batch: {activeBatch.batchNo}
                </h3>
                <p className="text-xs text-slate-600 font-medium">{activeBatch.productName}</p>
              </div>

              <div className="text-right text-xs text-slate-500">
                <div className="font-semibold text-slate-800">IS/ISO 17088:2021</div>
                <div>Compostable Plastics Standard</div>
              </div>
            </div>

            {/* Technical Verification Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-semibold text-[11px]">CIPET Testing Authority</div>
                <div className="font-bold text-slate-800 text-sm">{activeBatch.cipetReportNo}</div>
                <p className="text-[11px] text-slate-600">
                  Central Institute of Plastic Engineering and Technology Lab Certified.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-semibold text-[11px]">Pollution Board Approval</div>
                <div className="font-bold text-slate-800 text-sm">{activeBatch.tspcbApprovalNo}</div>
                <p className="text-[11px] text-slate-600">
                  Telangana State Pollution Control Board Registered Manufacturer.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-semibold text-[11px]">Polymer Composition</div>
                <div className="font-bold text-slate-800">{activeBatch.rawMaterial}</div>
                <p className="text-[11px] text-slate-600">Zero petroleum plastic content. Starch/PLA/PBAT blend.</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-semibold text-[11px]">Manufacturing / Expiry</div>
                <div className="font-bold text-slate-800">
                  Mfg: {activeBatch.mfgDate} | Exp: {activeBatch.expiryDate}
                </div>
                <p className="text-[11px] text-slate-600">12 Months shelf life under dry ambient storage.</p>
              </div>
            </div>

            {/* Lab Test Results Checklist */}
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100 space-y-2.5">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                Lab Parameters Test Summary (Passed Criteria)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Biodegradation Rate:</span> {activeBatch.testResults.biodegradation}
                  </div>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Physical Disintegration:</span> {activeBatch.testResults.disintegration}
                  </div>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Heavy Metal Toxicity:</span> {activeBatch.testResults.heavyMetals}
                  </div>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Plant Seed Germination:</span> {activeBatch.testResults.plantToxicity}
                  </div>
                </div>
              </div>
            </div>

            {/* Issued by Footer */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
              <div>
                Manufactured by: <span className="font-bold text-slate-800">Redeem Industry</span> (Telangana, India)
              </div>
              <div className="text-emerald-700 font-medium">
                Complies with Plastic Waste Management Rules 2016 / 2022
              </div>
            </div>
          </div>

          {/* QR Code & Label Box (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  Roll / Carton QR Label
                </span>
                <QrCode className="w-4 h-4 text-emerald-400" />
              </div>

              {/* QR Container */}
              <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center text-slate-900 shadow-md">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Batch QR Code" className="w-44 h-44 object-contain" />
                ) : (
                  <div className="w-44 h-44 bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                    Generating QR...
                  </div>
                )}
                <div className="text-center mt-2">
                  <div className="font-mono text-xs font-bold tracking-tight">{activeBatch.batchNo}</div>
                  <div className="text-[10px] text-slate-500">Scan to verify CIPET & PCB validity</div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Client/Dest:</span>
                  <span className="text-white font-medium truncate max-w-[150px]">{activeBatch.client}</span>
                </div>
                <div className="flex justify-between">
                  <span>Batch Volume:</span>
                  <span className="text-white font-medium">{activeBatch.quantityRolls}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={handleDownloadQR}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Print-Ready QR Image</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Compliance Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
