import type { Metadata } from "next";
import Button from "@/components/Button";
import ConsultationForm from "@/components/ConsultationForm";
import Reveal from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import { JANE_BOOKING_URL } from "@/lib/jane";
import { ClockIcon, PhoneIcon, ShieldIcon } from "@/components/icons";

const PAGE_TITLE = "Book Your Appointment";
const PAGE_DESCRIPTION =
  "Ready to get started? Book instantly through our secure Jane portal, or send us a message and our care team will respond within 24 hours.";

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
    title: "Response Time",
    value: "We respond within 24 hours",
  },
  {
    icon: <ShieldIcon className="h-7 w-7" />,
    title: "Confidential",
    value: "Your privacy is our top priority",
  },
];

export default function BookConsultationPage() {
  return (
    <>
      {/* Primary — instant booking via Jane */}
      <section className="bg-primary-50">
        <Reveal className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Book Your Appointment
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-soft">
            Pick a time that works for you. Telehealth or in-person visits.
          </p>
          <Button href={JANE_BOOKING_URL} size="lg" className="mt-9">
            Book Now
          </Button>
          <p className="mt-4 text-sm text-soft">
            You&apos;ll be redirected to our secure booking portal powered by
            Jane.
          </p>
        </Reveal>
      </section>

      {/* Secondary — message the care team instead */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Or send us a message
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-soft">
            If you&apos;d like to talk before booking, fill out the form and
            we&apos;ll reach out.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <Reveal>
            <ConsultationForm />
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

      <section className="bg-primary-50">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <TestimonialCard
              name="Sarah Mitchell"
              quote="She has completely changed my approach to managing my anxiety. I feel more equipped and hopeful now. I'd highly recommend her!"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
