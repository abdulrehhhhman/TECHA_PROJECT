import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Brain,
  ClipboardList,
  Heart,
  Pill,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import Button from "@/components/Button";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { CheckIcon } from "@/components/icons";
import { REQUEST_APPOINTMENT_PATH } from "@/lib/routes";

const ICON_PROPS = { className: "h-7 w-7", strokeWidth: 1.75 };

const PAGE_TITLE = "Our Services | Proactive Medical & Wellness";
const PAGE_DESCRIPTION =
  "Comprehensive Mental Health, Addiction Medicine (Suboxone/MAT), Primary Care, and Wellness services in Pearland, TX. Compassionate, personalized care for the whole person.";

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
}

const SERVICES: Service[] = [
  {
    id: "psychiatric-evaluations",
    icon: <ClipboardList {...ICON_PROPS} />,
    title: "Psychiatric Evaluations",
    description:
      "Comprehensive psychiatric evaluations form the foundation of personalized treatment. We take time to understand your unique needs, medical history, and personal goals.",
    details: [
      "Thorough diagnostic assessments",
      "Individualized treatment planning",
      "Medication recommendations",
      "Support for adolescents (13–17) and adults",
    ],
  },
  {
    id: "addiction-medicine",
    icon: <Shield {...ICON_PROPS} />,
    title: "Addiction Medicine",
    description:
      "Compassionate, judgment-free treatment for substance use disorders. We provide evidence-based care to help you reclaim your life and health with dignity and lasting hope.",
    details: [
      "Suboxone treatment",
      "Medication-assisted treatment (MAT)",
      "Opioid and alcohol use disorder treatment",
      "Substance use assessments & recovery support",
    ],
  },
  {
    id: "anxiety-depression",
    icon: <Heart {...ICON_PROPS} />,
    title: "Anxiety & Depression",
    description:
      "Evidence-based therapies and medical support for generalized anxiety, social anxiety, panic disorder, major depression, and treatment-resistant mood conditions.",
    details: [
      "Evidence-based symptom management",
      "Personalized medication management",
      "Therapy guidance & coping strategies",
      "Continuous ongoing progress monitoring",
    ],
  },
  {
    id: "adhd-mood-disorders",
    icon: <Brain {...ICON_PROPS} />,
    title: "ADHD & Mood Disorders",
    description:
      "Comprehensive diagnostic evaluations and ongoing management for ADHD, bipolar disorder, and related mood conditions to help restore balance and focus.",
    details: [
      "Adult and adolescent ADHD evaluations",
      "Bipolar disorder management & stabilization",
      "Focus, executive function, and behavioral strategies",
      "School and workplace accommodations support",
    ],
  },
  {
    id: "medication-management",
    icon: <Pill {...ICON_PROPS} />,
    title: "Medication Management",
    description:
      "Thoughtful psychiatric medication management focused on safety, efficacy, and your personal comfort. We carefully monitor side effects and make adjustments as you heal.",
    details: [
      "Careful medication selection & dosing",
      "Routine follow-ups & therapeutic monitoring",
      "Side effect prevention & management",
      "Harmonious integration with existing care",
    ],
  },
  {
    id: "primary-care",
    icon: <Stethoscope {...ICON_PROPS} />,
    title: "Primary Care",
    description:
      "Whole-person medical care for routine, acute, and chronic health needs. From sick visits and physicals to hypertension and diabetes management, we support your body alongside your mind.",
    details: [
      "$59 Self-Pay Sick Visits (Cold, flu, cough, UTI, etc.)",
      "School & sports physicals",
      "Annual wellness exams & preventive health",
      "Chronic condition management (Diabetes, high blood pressure)",
    ],
  },
  {
    id: "wellness-services",
    icon: <Sparkles {...ICON_PROPS} />,
    title: "Wellness Services",
    description:
      "Rejuvenating wellness treatments designed to optimize your vitality, immune health, and overall well-being from the inside out.",
    details: [
      "Medical weight management & support",
      "IV hydration & nutrient therapy",
      "Vitamin injections (B12, Vitamin D, etc.)",
      "Hormone & metabolic wellness support",
    ],
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
            Compassionate Care for Mind, Body, &amp; Wellness
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-soft">
            Explore our specialized psychiatric care, addiction medicine, primary medical services, and rejuvenating wellness therapies.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl space-y-8 px-4 pb-20 sm:px-6 sm:pb-24">
        {SERVICES.map((service, i) => (
          <Reveal key={service.id} delayMs={i % 2 === 0 ? 0 : 80}>
            <div
              id={service.id}
              className="ease-calm scroll-mt-24 rounded-2xl border border-border/70 bg-white p-7 shadow-soft transition-shadow duration-500 hover:shadow-soft-lg sm:p-10"
            >
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary-dark">
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
                        <CheckIcon className="h-5 w-5 shrink-0 text-emerald-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={REQUEST_APPOINTMENT_PATH}
                    variant="accent"
                    className="mt-7"
                  >
                    Request an Appointment
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <CTABand heading="Ready to take the next step on your health journey?" />
    </>
  );
}
