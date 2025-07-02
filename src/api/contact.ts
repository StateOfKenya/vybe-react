import api from './api';

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  category: string;
  subject: string;
  message: string;
}

export interface VolunteerApplication {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  skills: string[];
  availability: string;
  experience: string;
  motivation: string;
}

// Description: Send contact message
// Endpoint: POST /api/contact/message
// Request: ContactMessage
// Response: { success: boolean, message: string }
export const sendContactMessage = (data: ContactMessage) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Thank you for your message! We will get back to you within 24 hours.'
      });
    }, 1000);
  });
};

// Description: Submit volunteer application
// Endpoint: POST /api/contact/volunteer
// Request: VolunteerApplication
// Response: { success: boolean, message: string }
export const submitVolunteerApplication = (data: VolunteerApplication) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Thank you for your interest in volunteering! Our team will contact you soon.'
      });
    }, 1200);
  });
};

// Description: Submit partnership inquiry
// Endpoint: POST /api/contact/partnership
// Request: { companyName: string, contactPerson: string, email: string, phone: string, partnershipType: string, message: string }
// Response: { success: boolean, message: string }
export const submitPartnershipInquiry = (data: {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
}) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Thank you for your partnership interest! Our partnerships team will reach out to you.'
      });
    }, 1000);
  });
};