# Redeem EcoPack: B2B Packaging Estimator & CIPET Compliance Portal

A full-stack, responsive web application custom-built for **Redeem Industry** (Eco-conscious Manufacturing for a Greener Tomorrow).

---

## 🌟 Overview & Purpose

As a software developer at **Redeem Industry**, this project provides direct business value to company operations, B2B sales, and regulatory compliance:

1. **B2B Packaging & Cost Estimator:** Enables clients and sales representatives to input custom dimensions ($L \times W \times \text{gusset}$), micron thickness ($40\mu\text{m} - 120\mu\text{m}$), handle styles, and print options across all 7 Redeem product lines. Instantly calculates unit weight, total batch weight (kg), price tier, and outputs a print-ready proforma quotation.
2. **CIPET & Telangana State PCB Digital Batch Verifier:** Solves the anti-counterfeit challenge in the compostable packaging market. Allows scanning/searching batch serial numbers to view lab certifications (IS/ISO 17088), degradation test results, and generates downloadable batch QR labels for rolls and carton boxes.
3. **Comprehensive Product Catalog:** Showcases all 7 Redeem manufacturing lines:
   - *Carry Bags (D-Cut / W-Cut)*
   - *Kirana Folding Covers*
   - *Supermarket Packing Covers*
   - *Dairy Forms Milk Packing Covers*
   - *Garbage Covers & Bio-Hazard Rolls*
   - *Nursery Planting Covers*
   - *Shopping Mall Luxury Covers*
4. **Corporate Eco-Impact & ESG Calculator:** Calculates conventional fossil plastic eliminated, CO₂ footprint avoided, and generates printable ESG certificates for corporate supermarket and retail clients.

---

## 🚀 Quick Start

### 1. Run in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```

---

## 📐 Scientific Formulation & Weight Calculations

The bag weight and cost estimator uses the physical density of certified compostable resin (PBAT + PLA + Cornstarch blend $\approx 1.25\text{ g/cm}^3$):

$$\text{Total Area (cm}^2\text{)} = 2 \times (\text{Width} + \text{Gusset}) \times \text{Length (in inches)} \times 6.4516$$

$$\text{Volume (cm}^3\text{)} = \text{Total Area} \times (\text{Thickness in Microns} \times 10^{-4})$$

$$\text{Weight per Bag (g)} = \text{Volume} \times 1.25\text{ g/cm}^3 \pm \text{Handle Adjustment}$$

$$\text{Total Batch Weight (kg)} = \frac{\text{Weight per Bag (g)} \times \text{Quantity}}{1000}$$

---

## 🏛 Regulatory Standards Referenced

- **CIPET:** Central Institute of Petrochemicals Engineering & Technology (IS/ISO 17088:2021).
- **TSPCB:** Telangana State Pollution Control Board Consent Order.
- **CPCB / MoEFCC:** Plastic Waste Management Rules 2016 / 2022 compostable packaging exemption.
