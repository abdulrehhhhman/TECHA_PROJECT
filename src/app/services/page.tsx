import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Brain, ClipboardList, Heart, Pill, Shield, Video } from "lucide-react";
import Button from "@/components/Button";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { CheckIcon } from "@/components/icons";
import { JANE_BOOKING_URL } from "@/lib/jane";

const ICON_PROPS = { className: "h-7 w-7", strokeWidth: 1.75 };

const PAGE_TITLE = "Mental Health & Addiction Medicine Services";
const PAGE_DESCRIPTION =
  "Psychiatric evaluations, medication management, anxiety and depression treatment, Suboxone (MAT) for addiction medicine, ADHD evaluations, and telehealth or in-person visits — all in one compassionate Houston practice.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
};

interface Service {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  details: string[];
  cta: string;
}

const SERVICES: Service[] = [
  {
    id: "psychiatric-evaluations",
    icon: <ClipboardList {...ICON_PROPS} />,
    title: "Psychiatric Evaluations",
    description:
      "Comprehensive psychiatric evaluations form the foundation of personalized treatment. We take time to understand your unique needs, history, and goals.",
    details: [
      "Initial assessment",
      "Diagnostic clarity",
      "Treatment planning",
      "Ongoing monitoring",
    ],
    cta: "Schedule an Evaluation",
  },
  {
    id: "medication-management",
    icon: <Pill {...ICON_PROPS} />,
    title: "Medication Management",
    description:
      "We provide expert medication management, adjusting prescriptions based on your response and needs. Our goal is to find the right balance for you.",
    details: [
      "Medication selection",
      "Monitoring",
      "Side effect management",
      "Integration with therapy",
    ],
    cta: "Discuss Medication Options",
  },
  {
    id: "mental-health",
    icon: <Heart {...ICON_PROPS} />,
    title: "Treatment for Anxiety & Depression",
    description:
      "Anxiety and depression are among the most common mental health conditions. We use evidence-based therapy and medication to help you feel like yourself again.",
    details: [
      "Cognitive-behavioral therapy (CBT)",
      "Psychotherapy",
      "Medication options",
      "Personalized treatment plans",
    ],
    cta: "Get Support for Anxiety & Depression",
  },
  {
    id: "addiction-medicine",
    icon: <Shield {...ICON_PROPS} />,
    title: "Addiction Medicine & Suboxone (MAT)",
    description:
      "Medication-assisted treatment (MAT) using Suboxone is a compassionate, evidence-based approach to opioid use disorder. We support your recovery journey with dignity.",
    details: [
      "Suboxone maintenance",
      "Counseling",
      "Relapse prevention",
      "Long-term recovery support",
    ],
    cta: "Start Your Recovery",
  },
  {
    id: "adhd",
    icon: <Brain {...ICON_PROPS} />,
    title: "ADHD Evaluations & Treatment",
    description:
      "ADHD affects focus, organization, and daily functioning. We provide thorough evaluations and personalized treatment to help you succeed.",
    details: [
      "Diagnostic assessment",
      "Medication options",
      "Behavioral strategies",
      "School/work accommodations support",
    ],
    cta: "Get an ADHD Evaluation",
  },
  {
    id: "telehealth",
    icon: <Video {...ICON_PROPS} />,
    title: "Telehealth & In-Person Visits",
    description:
      "Choose the care format that works for you. Telehealth for convenience, in-person for a direct connection.",
    details: [
      "Video appointments",
      "In-office visits",
      "Flexible scheduling",
      "Same quality care both ways",
    ],
    cta: "Book an Appointment",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-24">
        <Reveal>
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-sm font-semibold tracking-wide text-primary-dark">
            Our Services
          </span>
          <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Compassionate Mental Health &amp; Addiction Medicine Services
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-soft">
            From psychiatric evaluations to ongoing support, we offer
            personalized care designed to help you achieve lasting wellness.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl space-y-8 px-4 pb-20 sm:px-6 sm:pb-24">
        {SERVICES.map((service, i) => (
          <Reveal key={service.id} delayMs={i % 2 === 0 ? 0 : 80}>
            <div
              id={service.id}
              className="ease-calm scroll-mt-24 rounded-xl border border-border/70 bg-white p-7 shadow-soft transition-shadow duration-500 hover:shadow-soft-lg sm:p-10"
            >
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-[1.65rem]">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-soft">
                    {service.description}
                  </p>
                  <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2.5 text-[1.05rem] text-foreground/85"
                      >
                        <CheckIcon className="h-5 w-5 shrink-0 text-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <Button href={JANE_BOOKING_URL} variant="accent" className="mt-7">
                    {service.cta}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <CTABand heading="Ready to get started?" />
    </>
  );
}
