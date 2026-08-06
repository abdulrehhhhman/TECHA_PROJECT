export interface ConsultationRequest {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_date: string | null;
  preferred_time: string | null;
  reason_for_visit: string | null;
  message: string | null;
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
