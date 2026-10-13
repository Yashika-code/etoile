'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, getProductBySlug, formatINR } from '@/data/products';
import { AppointmentInquiry } from '@/types';
import {
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  Clock,
  ArrowLeft,
  Building
} from 'lucide-react';

export default function AppointmentForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product') || PRODUCTS[0].id;
  const initialIntent = searchParams.get('intent') || 'appointment';

  const selectedProduct = getProductBySlug(productId) || PRODUCTS[0];

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requestedAction, setRequestedAction] = useState<AppointmentInquiry['requestedAction']>(
    initialIntent === 'concierge'
      ? 'Concierge Consultation'
      : initialIntent === 'quote'
      ? 'Price & Craft Inquire'
      : 'Showroom Appointment'
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone' | 'whatsapp'>('email');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<AppointmentInquiry | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim()) {
      setErrorMessage('Please provide your name and email address.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please confirm your consent for our private salon concierge to contact you.');
      return;
    }

    setSubmitting(true);

    // Simulated robust client-side demo booking
    setTimeout(() => {
      const newInquiry: AppointmentInquiry = {
        requestId: `ETOILE-${Date.now().toString().slice(-6)}`,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        sessionId: `SESSION-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        customer: {
          name: fullName,
          email,
          phone,
          consentStatus: consent
        },
        requestedAction,
        preferredDate: preferredDate || 'Flexible / Next Available',
        preferredTime,
        contactMethod,
        notes,
        status: 'pending',
        submittedAt: Date.now()
      };

      setSubmittedData(newInquiry);
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen py-16 px-6 sm:px-12 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href={`/product/${selectedProduct.slug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C827A] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to {selectedProduct.name}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
            Private Client Services
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-normal">
            Private Salon &amp; Concierge Appointment
          </h1>
          <p className="text-xs sm:text-sm text-[#8C827A] max-w-xl mx-auto leading-relaxed">
            Reserve a private viewing suite at our Geneva or Mumbai salons, or connect directly with our master gemologists.
          </p>
        </div>

        {/* Selected Product Context Banner */}
        <div className="p-6 bg-white border border-[#C5A880]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 bg-[#FAF8F5] border border-stone-200 shrink-0 p-2">
              <Image
                src={selectedProduct.catalogImage}
                alt={selectedProduct.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8C827A]">
                Selected Jewelry Creation
              </span>
              <h2 className="font-serif text-xl text-[#1A1A1A] font-medium">
                {selectedProduct.name}
              </h2>
              <span className="text-xs text-[#8C827A]">
                {selectedProduct.metal} ({selectedProduct.karat}) • {formatINR(selectedProduct.price)}
              </span>
            </div>
          </div>

          <Link
            href={`/try-on?product=${selectedProduct.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF8F5] border border-[#C5A880]/50 text-xs uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF8F5] transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Virtual Try-On</span>
          </Link>
        </div>

        {/* Form Container / Confirmation State */}
        {!submittedData ? (
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-12 bg-white border border-[#C5A880]/30 shadow-md space-y-8"
          >
            {/* Service Type Selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest text-[#1A1A1A] font-medium block">
                Appointment or Inquiry Objective
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Showroom Appointment',
                  'Concierge Consultation',
                  'Price & Craft Inquire'
                ].map((act) => (
                  <button
                    type="button"
                    key={act}
                    onClick={() => setRequestedAction(act as any)}
                    className={`py-3 px-4 text-xs tracking-wider border transition-all text-center ${
                      requestedAction === act
                        ? 'bg-[#1A1A1A] text-[#FAF8F5] border-[#1A1A1A]'
                        : 'bg-[#FAF8F5] text-[#1A1A1A] border-stone-200 hover:border-[#C5A880]'
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#1A1A1A] block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Genevieve Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#1A1A1A] block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="vance@heritage.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#1A1A1A] block">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+41 22 819 00 00 or +91 98200 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#1A1A1A] block">
                  Preferred Contact Channel
                </label>
                <select
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value as any)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="email">Email</option>
                  <option value="phone">Direct Phone Call</option>
                  <option value="whatsapp">WhatsApp Concierge</option>
                </select>
              </div>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#1A1A1A] block">
                  Preferred Salon Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#1A1A1A] block">
                  Preferred Salon Time
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="11:00">11:00 AM — Morning Viewing</option>
                  <option value="14:00">2:00 PM — Afternoon Salon</option>
                  <option value="16:30">4:30 PM — Twilight Champagne Tasting</option>
                  <option value="18:30">6:30 PM — Private Evening Salon</option>
                </select>
              </div>
            </div>

            {/* Special Instructions or Customization notes */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#1A1A1A] block">
                Bespoke Notes or Inquiries
              </label>
              <textarea
                rows={3}
                placeholder="Mention any custom metal preferences, gemstone certification questions, or companion pieces you'd like prepared."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-stone-200 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            {/* Consent Notice */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 text-xs text-[#8C827A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 accent-[#C5A880]"
                />
                <span className="leading-relaxed">
                  I consent to ÉTOILE &amp; CO. contacting me regarding this piece and understand that salon visits are arranged by private appointment with confidential consultation.
                </span>
              </label>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-8 bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1A1A1A] disabled:opacity-50 text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md"
              >
                {submitting ? 'Transmitting Request...' : 'Confirm Appointment Request'}
              </button>
            </div>

            <p className="text-[11px] text-[#8C827A] text-center italic">
              Demonstration Mode — Requests are captured and logged locally in your current browser session without external transactional API calls.
            </p>
          </form>
        ) : (
          /* Confirmation Success Card */
          <div className="p-10 sm:p-14 bg-white border border-[#C5A880] shadow-xl space-y-8 text-center">
            <div className="w-16 h-16 bg-[#FAF8F5] border border-[#C5A880] mx-auto flex items-center justify-center text-[#C5A880]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                Request Recorded Locally
              </span>
              <h2 className="font-serif text-3xl text-[#1A1A1A]">
                Thank You, {submittedData.customer.name}
              </h2>
              <p className="text-xs text-[#8C827A] max-w-md mx-auto leading-relaxed">
                Your private salon consultation request for the{' '}
                <strong className="text-[#1A1A1A]">{submittedData.productName}</strong> has been logged with reference number{' '}
                <span className="font-mono text-[#1A1A1A] bg-[#FAF8F5] px-2 py-0.5 border border-stone-200">
                  {submittedData.requestId}
                </span>.
              </p>
            </div>

            {/* Summary Details */}
            <div className="max-w-md mx-auto bg-[#FAF8F5] p-5 text-left text-xs border border-stone-200 space-y-2">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-[#8C827A]">Service:</span>
                <span className="font-medium text-[#1A1A1A]">{submittedData.requestedAction}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-[#8C827A]">Preferred Date:</span>
                <span className="font-medium text-[#1A1A1A]">
                  {submittedData.preferredDate} at {submittedData.preferredTime}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-[#8C827A]">Contact Method:</span>
                <span className="font-medium text-[#1A1A1A]">
                  {submittedData.contactMethod} ({submittedData.customer.email})
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8C827A]">Session Context:</span>
                <span className="font-mono text-[10px] text-[#8C827A]">
                  {submittedData.sessionId}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/try-on"
                className="w-full sm:w-auto px-6 py-3 bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1A1A1A] text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Return to Virtual Try-On Studio
              </Link>

              <button
                onClick={() => setSubmittedData(null)}
                className="w-full sm:w-auto px-6 py-3 bg-white border border-stone-300 text-xs uppercase tracking-widest text-[#8C827A] hover:text-[#1A1A1A]"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
