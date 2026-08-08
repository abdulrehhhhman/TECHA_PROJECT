import type { Metadata } from "next";
import AppointmentRequestForm from "@/components/form/AppointmentRequestForm";
import Reveal from "@/components/Reveal";
import { ClockIcon, PhoneIcon, ShieldIcon } from "@/components/icons";

const PAGE_TITLE = "Request an Appointment";
const PAGE_DESCRIPTION =
  "Fill out the form below and a member of our team will contact you to confirm and schedule your appointment at Proactive Medical and Wellness.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
};

const REASSURANCE_CARDS = [
  {
    icon: <PhoneIcon className="h-7 w-7" />,
    title: "Prefer to call?",
    value: "(346) 878-5272",
    href: "tel:+13468785272",
  },
  {
    icon: <ClockIcon className="h-7 w-7" />,
    title: "We'll Follow Up",
    value: "Our team reviews requests and contacts you to confirm",
  },
  {
    icon: <ShieldIcon className="h-7 w-7" />,
    title: "Confidential",
    value: "Your privacy is our top priority",
  },
];

export default function RequestAppointmentPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Request an Appointment
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-soft">
          Fill out the form below and a member of our team will contact you
          to confirm and schedule your appointment.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <Reveal>
          <AppointmentRequestForm />
        </Reveal>

        <Reveal delayMs={120} className="space-y-5">
          {REASSURANCE_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex items-start gap-4 rounded-xl border border-border bg-white p-6 shadow-soft"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                {card.icon}
              </span>
              <div>
                <p className="font-heading text-lg font-semibold text-foreground">
                  {card.title}
                </p>
                {card.href ? (
                  <a
                    href={card.href}
                    className="text-lg font-semibold text-accent transition-colors hover:text-accent-dark"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-[1.05rem] text-soft">{card.value}</p>
                )}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
