export interface ConsultationRequest {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string;
  patient_type: string | null;
  preferred_contact_method: string | null;
  insurance_type: string | null;
  preferred_day_time: string | null;
  service_requested: string | null;
  reason_for_visit: string | null;
  submitted_at: string;
}

export interface ContactFormSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  submitted_at: string;
}

export interface AppointmentBooking {
  id: string;
  created_at: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  appointment_date: string;
  appointment_time: string;
  service_type: string | null;
  jane_appointment_id: string | null;
  status: string;
  submitted_at: string;
}

export interface PatientReferral {
  id: string;
  created_at: string;
  referrer_name: string;
  referrer_organization: string;
  referrer_role: string | null;
  referrer_phone: string;
  referrer_email: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  reason_for_referral: string;
  additional_notes: string | null;
  consent_confirmed: boolean;
}
