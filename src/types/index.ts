export interface AnchorConfig {
  /** Normalized vertical offset from the estimated ear anchor point (-0.1 to 0.5) */
  verticalOffset: number;
  /** Normalized horizontal outward offset from the ear anchor (-0.2 to 0.2) */
  horizontalOffset: number;
  /** Scale factor relative to face width */
  defaultScale: number;
  /** Center anchor point inside the overlay SVG/PNG (0 to 1 normalized) */
  anchorPoint: {
    x: number; // e.g. 0.5 (center)
    y: number; // e.g. 0.08 (top post of earring)
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Drop Earrings' | 'Studs' | 'Hoops' | 'Chandelier Earrings';
  description: string;
  shortDescription: string;
  price: number; // in INR
  metal: string;
  karat: string;
  stone: string;
  dimensions: string;
  catalogImage: string;
  overlayAsset: string;
  anchorConfig: AnchorConfig;
  availability: 'Available' | 'Made to Order' | 'Showroom Exclusive';
  featured?: boolean;
}

export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  consentStatus: boolean;
}

export interface TryOnSession {
  sessionId: string;
  selectedProductId: string;
  createdAt: number;
  processingStatus: 'idle' | 'detecting' | 'rendered' | 'error';
  inputMethod: 'upload' | 'camera' | 'demo';
  resultAvailability: boolean;
  inquiryIntent?: 'appointment' | 'concierge' | 'quote';
}

export interface TryOnResult {
  resultId: string;
  sessionId: string;
  productId: string;
  renderingStatus: 'ready' | 'fallback' | 'failed';
  resultDataUrl?: string;
  settings: {
    offsetX: number;
    offsetY: number;
    scale: number;
    rotation: number;
    brightness: number;
  };
}

export interface AppointmentInquiry {
  requestId: string;
  productId: string;
  productName: string;
  sessionId: string;
  customer: Customer;
  requestedAction: 'Showroom Appointment' | 'Concierge Consultation' | 'Price & Craft Inquire';
  preferredDate?: string;
  preferredTime?: string;
  contactMethod: 'email' | 'phone' | 'whatsapp';
  notes?: string;
  status: 'pending' | 'confirmed';
  submittedAt: number;
}
