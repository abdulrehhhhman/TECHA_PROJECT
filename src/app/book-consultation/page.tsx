import { redirect } from "next/navigation";
import { REQUEST_APPOINTMENT_PATH } from "@/lib/routes";

// The booking flow moved to /request-appointment; this redirect keeps any
// existing bookmarks or shared links working.
export default function BookConsultationRedirect() {
  redirect(REQUEST_APPOINTMENT_PATH);
}
