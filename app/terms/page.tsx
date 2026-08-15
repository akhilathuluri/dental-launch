import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileCheck, Shield, AlertCircle, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms and Conditions | Gahan Dental Clinic & Implant Center',
  description: 'Official Terms & Conditions governing clinical appointments, treatment consultations, payment policies, and digital services at Gahan Dental Clinic, Hyderabad.',
};

export default function TermsPage() {
  const lastUpdated = 'August 15, 2026';

  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] flex flex-col justify-between text-[#111827]">
      {/* Top Header */}
      <header className="w-full bg-[#0F3521] text-white py-4 px-4 sm:px-6 lg:px-8 shadow-md sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/"
            className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-sm border border-white/25"
          >
            Gahan Dental
          </Link>

          <Link
            href="/appointment"
            className="px-4 py-2 bg-white text-[#0F3521] font-semibold text-xs sm:text-sm rounded-full shadow-sm hover:bg-emerald-50 transition-all hover:scale-[1.02]"
          >
            Book Appointment
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        
        {/* Title Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#165634] text-xs font-semibold uppercase tracking-wider">
            <FileCheck className="w-4 h-4" />
            <span>Official Patient &amp; Clinical Terms of Service</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#111827]">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Effective Date &amp; Last Updated: {lastUpdated}
          </p>
          <div className="pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Welcome to <strong>Gahan Dental Clinic &amp; Implant Center</strong> (&quot;Gahan Dental&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;Clinic&quot;). These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Patient&quot;, &quot;User&quot;, or &quot;You&quot;) and Gahan Dental Clinic regarding your access to and use of our website, digital appointment reservation systems, WhatsApp communication services, and in-person clinical consultations.
          </div>
        </div>

        {/* Detailed Terms Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xs space-y-10 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          
          {/* 1. Acceptance of Terms */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">1</span>
              Acceptance of Terms &amp; Eligibility
            </h2>
            <p>
              By accessing our website, reserving an appointment slot, or receiving clinical treatment at our clinic in Kukatpally, Hyderabad, you signify your full agreement to these Terms. If you do not agree with any provision of these Terms, you must refrain from using our online booking platform and healthcare services.
            </p>
            <p>
              For pediatric patients and individuals under eighteen (18) years of age, these Terms must be agreed to by a parent or legal guardian who assumes full responsibility for medical consents, appointment adherence, and financial obligations.
            </p>
          </section>

          {/* 2. Appointment Booking & Slot Allocation */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">2</span>
              Appointment Reservation &amp; Schedule Policy
            </h2>
            <p>
              Our online appointment reservation system is designed to provide seamless, predictable healthcare delivery:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>30-Minute Dedicated Time Slots:</strong> Appointments are scheduled in allocated 30-minute intervals between <strong>10:00 AM and 07:30 PM</strong> on active clinic working days.
              </li>
              <li>
                <strong>Zero Waiting Time Commitment:</strong> To honor our zero waiting time standard, patients are requested to arrive at least <strong>10 minutes prior</strong> to their scheduled time slot to facilitate check-in and preliminary charting.
              </li>
              <li>
                <strong>Clinic Closures &amp; Off Days:</strong> The clinic remains closed on standard <strong>Tuesdays (except the 3rd Tuesday of each month)</strong> and on the <strong>2nd Sunday of each month</strong>, as well as designated public holidays. Online reservations will automatically reflect current slot availability.
              </li>
              <li>
                <strong>Emergency Priority:</strong> While we strive for strict adherence to schedules, emergency trauma cases or acute pain presentations may occasionally necessitate brief triage adjustments. We appreciate your understanding in such clinical circumstances.
              </li>
            </ul>
          </section>

          {/* 3. Cancellation, Rescheduling & No-Show Policy */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">3</span>
              Rescheduling &amp; Cancellation Guidelines
            </h2>
            <p>
              We understand that unforeseen events occur. In the event you need to modify or cancel a scheduled visit:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Please notify our front desk at least <strong>2 hours in advance</strong> via telephone or WhatsApp so the slot may be offered to patients requiring urgent care.</li>
              <li>Repeated unnotified no-shows may require pre-consultation confirmation or administrative review prior to subsequent online booking approvals.</li>
            </ul>
          </section>

          {/* 4. Clinical Diagnosis, Treatment Plans & Informed Consent */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">4</span>
              Clinical Examination &amp; Informed Consent
            </h2>
            <p>
              All clinical diagnostic assessments, radiographs, photographs, and treatment proposals are performed by qualified dental practitioners led by <strong>Dr. Manishpala (MDS - Paedodontics And Preventive Dentistry, BDS)</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Informed Treatment Consent:</strong> Prior to undertaking any invasive, laser, restorative, root canal, or pediatric surgical procedure, the treating specialist will explain the nature, objectives, anticipated benefits, potential risks, and alternative options. A formal written or documented informed consent will be obtained.
              </li>
              <li>
                <strong>Pediatric Care Consent:</strong> Comprehensive parental/guardian consent is mandatory for all pediatric dental interventions, including pulpectomies, space maintainers, fluoride applications, and conscious sedation when indicated.
              </li>
              <li>
                <strong>Treatment Outcomes:</strong> Biological responses to dental therapies vary individually. While our specialists practice with maximum precision, no absolute clinical guarantees can be provided regarding biological longevity without proper patient compliance and maintenance.
              </li>
            </ul>
          </section>

          {/* 5. Fees, Quotations & Payment Terms */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">5</span>
              Fees, Estimates &amp; Payment Terms
            </h2>
            <p>
              Gahan Dental is committed to complete financial transparency:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>A transparent estimate of procedural costs will be provided following your comprehensive clinical examination and diagnostic scan.</li>
              <li>We accept all major payment modes including UPI, Credit/Debit Cards, Net Banking, and cash.</li>
              <li><strong>0% Interest Installment / EMI Plans:</strong> Flexible installment payment facilities are available for major multi-stage dental procedures, subject to partner terms and eligibility verification.</li>
              <li>Any applicable discounts (such as our 5% online registration discount) are applied in accordance with official promotional terms at the time of billing.</li>
            </ul>
          </section>

          {/* 6. WhatsApp & OTP Verification Infrastructure */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">6</span>
              WhatsApp OTP &amp; Electronic Communications
            </h2>
            <p>
              To ensure slot authenticity and patient security, all online bookings require mobile phone verification via One-Time Password (OTP). You agree to provide a valid, active WhatsApp-enabled phone number. The clinic is not liable for notification delays caused by third-party telecom carrier interruptions or incorrect contact entries.
            </p>
          </section>

          {/* 7. Patient Health Disclosure & Medical Responsibilities */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">7</span>
              Patient Responsibilities &amp; Health Disclosures
            </h2>
            <p>
              Patients are legally and medically obligated to disclose a complete and truthful medical history, including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Known drug allergies (e.g., Penicillin, local anesthetics, NSAIDs).</li>
              <li>Systemic medical conditions (hypertension, cardiac pacemakers, diabetes, bleeding disorders, pregnancy).</li>
              <li>Current daily medications (e.g., blood thinners, bisphosphonates, immunosuppressants).</li>
            </ul>
            <p className="text-slate-500 text-xs">
              Gahan Dental and its clinical practitioners shall not be held liable for adverse reactions resulting from non-disclosure or concealment of relevant medical history.
            </p>
          </section>

          {/* 8. Medical Information Disclaimer */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">8</span>
              Medical Website Content Disclaimer
            </h2>
            <p>
              The textual content, procedure descriptions, service explanations, and health articles published on this website are provided solely for general educational and informational purposes. They do not constitute formal medical or dental diagnostic advice. An accurate dental diagnosis requires an in-person clinical examination and radiographic evaluation by a licensed dental surgeon.
            </p>
          </section>

          {/* 9. Limitation of Liability & Governing Law */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">9</span>
              Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the <strong>Republic of India</strong>. Any dispute, claim, or controversy arising out of or relating to your use of this website, online booking system, or clinical services shall be subject to the exclusive jurisdiction of the competent civil courts in <strong>Hyderabad, Telangana, India</strong>.
            </p>
          </section>

          {/* 10. Clinic Contact & Official Enquiries */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">10</span>
              Contact Information &amp; Official Inquiries
            </h2>
            <p>
              If you have any questions, clarifications, or feedback concerning these Terms and Conditions, please contact our administrative desk:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <p className="font-semibold text-slate-800">Administrative Office — Gahan Dental Clinic</p>
              <p>Road No 1, KPHB Colony, Kukatpally, Hyderabad, Telangana 500072</p>
              <p>Helpline: +91 98765 43210 &bull; Email: legal@gahandental.com</p>
            </div>
          </section>

        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
