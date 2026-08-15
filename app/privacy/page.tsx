import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, FileText, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | Gahan Dental Clinic & Implant Center',
  description: 'Comprehensive Privacy Policy of Gahan Dental Clinic detailing how we collect, protect, process, and store patient healthcare data and WhatsApp notifications.',
};

export default function PrivacyPage() {
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
            <ShieldCheck className="w-4 h-4" />
            <span>Healthcare Data Protection &amp; Confidentiality</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#111827]">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Effective Date &amp; Last Updated: {lastUpdated}
          </p>
          <div className="pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            At <strong>Gahan Dental Clinic &amp; Implant Center</strong> (&quot;Gahan Dental&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we are committed to safeguarding the confidentiality, integrity, and privacy of your personal identity and sensitive medical/dental healthcare records. This Privacy Policy governs your use of our website, digital appointment reservation system, automated WhatsApp messaging infrastructure, and clinical consultation services.
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xs space-y-10 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          
          {/* 1. Introduction & Statutory Scope */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">1</span>
              Statutory Scope &amp; Legal Framework
            </h2>
            <p>
              This Privacy Policy is formulated in strict compliance with the <strong>Digital Personal Data Protection Act (DPDP Act 2023)</strong>, the <strong>Information Technology Act, 2000</strong>, the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>, and the ethical medical regulations issued by the <strong>Dental Council of India (DCI)</strong>.
            </p>
            <p>
              By accessing our website, reserving appointment slots, verifying OTPs, or utilizing our in-clinic healthcare services, you expressly acknowledge and consent to the collection, processing, and safeguarding of your data as set forth herein.
            </p>
          </section>

          {/* 2. Categories of Information We Collect */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">2</span>
              Categories of Information We Collect
            </h2>
            <p>We may collect and process the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Identity &amp; Contact Data:</strong> Patient full name, age, gender, active WhatsApp phone number, email address, residential address, and emergency contact details.
              </li>
              <li>
                <strong>Clinical &amp; Dental Health History:</strong> Oral health complaints, past dental treatments, medical history, systemic conditions (e.g., diabetes, hypertension, cardiac ailments, bleeding disorders), drug allergies, current medications, and dental radiographic imaging/scans.
              </li>
              <li>
                <strong>Appointment &amp; Transactional Data:</strong> Preferred clinical services, selected appointment dates, 30-minute time slot allocations, unique booking reference IDs, OTP verification logs, and digital confirmation receipt downloads.
              </li>
              <li>
                <strong>Billing &amp; Payment Records:</strong> Consultation fees, procedure cost estimates, invoice receipts, and transaction reference numbers (note: card numbers and UPI PINs are processed securely by licensed payment gateways and are never stored on our servers).
              </li>
              <li>
                <strong>Technical &amp; Log Metadata:</strong> Device IP address, browser type, operating system, device screen resolution, and session timestamps for system security, fraud prevention, and performance telemetry.
              </li>
            </ul>
          </section>

          {/* 3. Purpose & Legal Basis of Data Processing */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">3</span>
              Purpose &amp; Legal Basis of Processing
            </h2>
            <p>We process patient data strictly for legitimate medical and operational purposes, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Facilitating scheduled appointments, eliminating waiting lines, and managing clinical slot rosters.</li>
              <li>Executing secure One-Time Password (OTP) verifications to prevent spam and duplicate slot allocations.</li>
              <li>Delivering automated WhatsApp confirmation tickets, appointment reminders, and downloadable PDF receipts.</li>
              <li>Formulating accurate clinical diagnosis, customized treatment plans, and safe dental surgical procedures.</li>
              <li>Maintaining statutory clinical case sheets as mandated by the Clinical Establishments Act and medical councils.</li>
              <li>Providing post-operative care advisories and medication instructions.</li>
            </ul>
          </section>

          {/* 4. WhatsApp & Meta Cloud API Messaging Policy */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">4</span>
              WhatsApp &amp; Electronic Communications Policy
            </h2>
            <p>
              Gahan Dental utilizes the official <strong>Meta WhatsApp Cloud API</strong> to transmit transactional notifications. By initiating an appointment booking and requesting OTP verification, you grant explicit consent to receive:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Authentication OTP codes for booking verification.</li>
              <li>Electronic booking confirmation tickets with reference IDs and clinic navigation links.</li>
              <li>Timely clinical visit reminders and schedule updates.</li>
            </ul>
            <p className="text-slate-500 text-xs">
              We do not engage in unauthorized third-party commercial spam. You may opt out of automated WhatsApp communications at any time by notifying our front desk or messaging &quot;STOP&quot;.
            </p>
          </section>

          {/* 5. Medical Data Confidentiality & Storage Safeguards */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">5</span>
              Data Security &amp; Storage Safeguards
            </h2>
            <p>
              We implement comprehensive technical, physical, and administrative safeguards to protect your personal and medical records:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>End-to-End Transport Security:</strong> All data transmitted between your browser and our infrastructure is encrypted using Transport Layer Security (TLS 1.3 / HTTPS).</li>
              <li><strong>Database Encryption:</strong> Appointment records and customer databases are secured with AES-256 bit encryption at rest within enterprise cloud data centers.</li>
              <li><strong>Role-Based Access Control (RBAC):</strong> Access to medical histories and diagnostic files is strictly restricted to licensed dental practitioners and authorized clinical staff bound by non-disclosure agreements.</li>
              <li><strong>Audit Logging:</strong> All administrative access and modifications to patient records are logged and monitored for unauthorized access.</li>
            </ul>
          </section>

          {/* 6. Data Retention & Record Keeping */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">6</span>
              Data Retention &amp; Record Archival
            </h2>
            <p>
              Medical and dental case histories, radiographs, and treatment charts are retained for the mandatory minimum duration stipulated by the <strong>Dental Council of India</strong> and applicable healthcare regulations (typically 3 to 8 years from the date of the last consultation, or until a minor patient attains majority). Non-clinical appointment logs may be purged periodically after completion of administrative review.
            </p>
          </section>

          {/* 7. Patient Rights & Privacy Choices */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">7</span>
              Your Rights as a Healthcare Consumer
            </h2>
            <p>Under applicable data protection laws, patients possess the following rights:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Right of Access:</strong> You may request a copy of your clinical case history, diagnostic X-rays, and billing records.</li>
              <li><strong>Right of Correction:</strong> You may request corrections of inaccurate contact information or outdated medical details.</li>
              <li><strong>Right to Withdraw Consent:</strong> You may withdraw consent for marketing or non-essential communications at any time.</li>
              <li><strong>Right to Grievance Redressal:</strong> You have the right to lodge complaints regarding data handling directly with our Grievance Officer.</li>
            </ul>
          </section>

          {/* 8. Third-Party Service Providers */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">8</span>
              Third-Party Service Providers &amp; Disclosures
            </h2>
            <p>
              We do not sell, rent, or trade patient personal data to third parties. We share limited necessary data only with trusted enterprise service providers operating under strict confidentiality contracts:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Meta Platforms Inc.</strong> (for WhatsApp Cloud API message routing).</li>
              <li><strong>Cloud Hosting &amp; Database Providers</strong> (Supabase / Next.js infrastructure).</li>
              <li><strong>Statutory Authorities:</strong> Disclosures made solely when mandated by valid court orders, law enforcement warrants, or statutory public health directives.</li>
            </ul>
          </section>

          {/* 9. Grievance Officer & Contact Information */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#165634]/10 text-[#165634] text-xs flex items-center justify-center font-bold">9</span>
              Grievance Officer &amp; Contact Details
            </h2>
            <p>
              For inquiries regarding this Privacy Policy, your medical data rights, or to submit a formal privacy grievance, please reach our designated Data Grievance Officer:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <p className="font-semibold text-slate-800">Grievance Officer — Patient Data Protection</p>
              <p>Gahan Dental Clinic &amp; Implant Center</p>
              <p>Road No 1, KPHB Colony, Kukatpally, Hyderabad, Telangana 500072</p>
              <p>Helpline: +91 98765 43210 &bull; Email: privacy@gahandental.com</p>
            </div>
          </section>

        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
