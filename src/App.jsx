import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Estimator from './components/Estimator';
import Verifier from './components/Verifier';
import Catalog from './components/Catalog';
import SustainabilityHub from './components/SustainabilityHub';
import QuotationPrintModal from './components/QuotationPrintModal';
import { COMPANY_INFO } from './data/products';
import { Leaf, Award, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('estimator');
  const [quoteModalData, setQuoteModalData] = useState(null);

  const handleSelectProductForQuote = (productId) => {
    setActiveTab('estimator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation & Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'estimator' && (
          <Estimator onGenerateQuote={(data) => setQuoteModalData(data)} />
        )}

        {activeTab === 'verifier' && (
          <Verifier />
        )}

        {activeTab === 'catalog' && (
          <Catalog onSelectProductForQuote={handleSelectProductForQuote} />
        )}

        {activeTab === 'sustainability' && (
          <SustainabilityHub />
        )}
      </main>

      {/* Quotation Print Modal */}
      {quoteModalData && (
        <QuotationPrintModal
          quoteData={quoteModalData}
          onClose={() => setQuoteModalData(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              R
            </div>
            <span className="font-bold text-slate-800">Redeem Industry</span>
            <span>—</span>
            <span>Eco-conscious Manufacturing for a Greener Tomorrow</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>CIPET Tested</span>
            <span>•</span>
            <span>Telangana PCB Approved</span>
            <span>•</span>
            <span>IS/ISO 17088:2021 Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
