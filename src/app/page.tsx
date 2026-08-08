import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import techaHeadshot from "../../public/images/techa-headshot.jpg";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { JANE_LOGIN_URL } from "@/lib/jane";
import { REFER_A_PATIENT_PATH, REQUEST_APPOINTMENT_PATH } from "@/lib/routes";
import {
  ClipboardIcon,
  HeartPulseIcon,
  PhoneIcon,
  PillIcon,
  VideoIcon,
} from "@/components/icons";

const PAGE_TITLE = "Compassionate Mental Health Care in Houston";
const PAGE_DESCRIPTION =
  "Personalized psychiatric evaluations, medication management, and addiction medicine care in Houston. Compassionate, judgment-free mental health support for the whole family.";

export const metadata: Metadata = {
  // The root layout's title template does not apply to a page in the same
  // segment as the layout that defines it, so the site name is spelled out
  // here to match the "%s | Proactive Medical and Wellness" format used by
  // every other page.
  title: `${PAGE_TITLE} | Proactive Medical and Wellness`,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
};

const SERVICES = [
  {
    icon: <ClipboardIcon />,
    title: "Psychiatric Evaluations",
    description:
      "Comprehensive psychiatric evaluations to understand your unique needs and develop a personalized treatment plan.",
  },
  {
    icon: <PillIcon />,
    title: "Medication Management",
    description:
      "Medication adjustments, therapy guidance, and ongoing support to help you achieve emotional balance.",
  },
  {
    icon: <HeartPulseIcon />,
    title: "Anxiety & Depression Treatment",
    description:
      "Evidence-based therapy and treatment for anxiety, depression, and related conditions. We focus on your individual journey.",
  },
  {
    icon: <VideoIcon />,
    title: "Telehealth and In-Person Care",
    description:
      "Convenient telehealth appointments and welcoming in-person visits. Care on your terms.",
  },
];

const INSURANCE_PARTNERS = [
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "United Healthcare",
  "Medicare",
  "Medicaid",
];


export default function HomePage() {
  return (
    <>
      {/* Hero — headline left, welcoming image right, soft bright backdrop */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1751945965597-71171ec7a458?auto=format&fit=crop&w=1600&q=75"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="inline-block rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-dark shadow-soft backdrop-blur-sm">
                Proactive Medical and Wellness Center
              </span>
              <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
                Accessible Care for Mind, Body, &amp; Community
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-soft">
                Mental Health &middot; Family Medicine &middot; Addiction
                Medicine — compassionate, personalized care in Pasadena, TX.
              </p>

              <div className="mt-8">
                <Button href={REQUEST_APPOINTMENT_PATH} size="lg">
                  Request an Appointment
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={JANE_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[1.05rem] font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-dark"
                >
                  Existing Patient Portal
                </a>
                <Link
                  href={REFER_A_PATIENT_PATH}
                  className="text-[1.05rem] font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-dark"
                >
                  Refer a Patient
                </Link>
              </div>

              <a
                href="tel:+13468785272"
                className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-accent transition-colors hover:text-accent-dark"
              >
                <PhoneIcon className="h-5 w-5" />
                Or call us: (346) 878-5272
              </a>
            </Reveal>

            <Reveal delayMs={150}>
              <div className="group relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-xl shadow-soft-xl ring-1 ring-primary/15 lg:mx-0">
                <Image
                  src="https://images.unsplash.com/photo-1741682739943-d0209422f004?auto=format&fit=crop&w=1200&q=75"
                  alt="A calm, sunlit space"
                  fill
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="ease-calm object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="Compassionate Mental Health Care"
            description="From psychiatric evaluations to ongoing support, we offer personalized mental health services designed to help you thrive."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delayMs={i * 100} className="h-full">
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={200} className="mt-14 text-center">
          <p className="text-lg text-soft">
            Not sure which service is right for you?
          </p>
          <Button href={REQUEST_APPOINTMENT_PATH} variant="outline" size="lg" className="mt-5">
            Request an Appointment
          </Button>
        </Reveal>
      </section>

      {/* Insurance */}
      <section className="bg-texture-dots bg-primary-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Insurance"
              title="We Accept Most Major Insurances"
              description="Making quality mental health care accessible to everyone in our community."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {INSURANCE_PARTNERS.map((name, i) => (
              <Reveal key={name} delayMs={i * 60}>
                <div className="flex h-20 items-center justify-center rounded-xl border border-border/70 bg-white px-3 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                  <span className="font-heading text-[1.05rem] font-semibold text-foreground/80">
                    {name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={300}>
            <p className="mt-9 text-center text-[1.05rem] text-soft">
              Self-pay options also available
            </p>
          </Reveal>
        </div>
      </section>

      {/* Accessible care / mission */}
      <section className="bg-white">
        <Reveal className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Mental Health Care for Everybody
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-soft">
            We believe compassionate, professional mental health care should
            be within reach for every person who needs it — regardless of
            background, circumstance, or where you are in your journey.
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <span
              aria-hidden="true"
              className="font-heading text-6xl leading-none text-primary/25"
            >
              &ldquo;
            </span>
            <p className="mt-2 font-heading text-2xl font-medium italic leading-relaxed text-foreground">
              Your mental health matters. Let us support you on your journey
              to wellness.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={REQUEST_APPOINTMENT_PATH} size="lg">
              Request an Appointment
            </Button>
            <Button href="tel:+13468785272" variant="outline" size="lg">
              Call: (346) 878-5272
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Meet Techa */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[240px_1fr] lg:gap-16">
          <Reveal>
            <div className="group relative mx-auto w-full max-w-[240px]">
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-secondary/20 blur-2xl" />
                <div className="absolute -bottom-10 -right-6 h-40 w-40 rounded-full bg-primary/20 blur-2xl" />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-soft-xl ring-1 ring-primary/20">
                <Image
                  src={techaHeadshot}
                  alt="Techa Bryant, MSN, APRN, PMHNP-C, FNP-C — Founder of Proactive Medical and Wellness"
                  placeholder="blur"
                  quality={95}
                  sizes="(min-width: 768px) 240px, 60vw"
                  className="ease-calm block h-auto w-full object-cover contrast-[1.05] saturate-[1.05] transition-transform duration-[1400ms] group-hover:scale-105"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-dark">
              Meet Your Provider
            </span>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Meet Techa Bryant
            </h2>
            <p className="mt-1 text-lg font-semibold text-secondary-deep">
              MSN, APRN, PMHNP-C, FNP-C
            </p>
            <p className="mt-5 text-lg leading-relaxed text-soft">
              With deep clinical expertise and a warm, judgment-free approach,
              Techa specializes in psychiatric evaluations, medication
              management, and addiction medicine—including Suboxone (MAT)
              treatment. She&apos;s passionate about helping patients reclaim
              their lives with dignity and hope.
            </p>
            <p className="mt-6 text-lg font-medium text-primary-dark">
              Personalized, accessible care for every patient.
            </p>
            <Button href={REQUEST_APPOINTMENT_PATH} size="lg" className="mt-8">
              Request an Appointment
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
