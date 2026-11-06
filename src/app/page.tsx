import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import techaHeadshot from "../../public/images/techa-headshot.jpg";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import AppointmentRequestForm from "@/components/form/AppointmentRequestForm";
import { JANE_LOGIN_URL } from "@/lib/jane";
import { REFER_A_PATIENT_PATH, REQUEST_APPOINTMENT_PATH } from "@/lib/routes";
import {
  BrainIcon,
  CheckIcon,
  HeartPulseIcon,
  LeafIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
  StethoscopeIcon,
  UsersIcon,
} from "@/components/icons";

const PAGE_TITLE = "Proactive Medical & Wellness | Pearland, TX";
const PAGE_DESCRIPTION =
  "Your Health. Your Mind. Your Wellness. Comprehensive Mental Health, Primary Care, and Wellness services in Pearland, TX. $59 Self-Pay Sick Visits available.";

const ADDRESS = "11960 Broadway Street, Suite 520, Pearland, TX 77584";
const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "https://www.proactivemedicalandwellness.com",
    siteName: "Proactive Medical & Wellness",
    type: "website",
    images: [
      {
        url: "/images/promo-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Proactive Medical & Wellness - Pearland, TX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/images/promo-preview.jpg"],
  },
};

const THREE_SERVICES = [
  {
    title: "Mental Health",
    subtitle: "Anxiety, Depression, ADHD, Bipolar & More",
    icon: <BrainIcon className="h-8 w-8 text-secondary-deep" />,
    iconBg: "bg-secondary-light/60 border border-secondary/30",
    checkmarks: [
      "Psychiatric evaluations",
      "Medication management",
      "Therapy options",
      "Adolescents (13–17) welcome",
    ],
    buttonText: "Request Mental Health Appointment",
    href: "/request-appointment?service=mental-health",
  },
  {
    title: "Primary Care",
    subtitle: "Physicals, Diabetes, High Blood Pressure & More",
    icon: <StethoscopeIcon className="h-8 w-8 text-primary-dark" />,
    iconBg: "bg-primary-light border border-primary/25",
    checkmarks: [
      "Sick visits",
      "Annual physicals",
      "Chronic condition management",
      "Preventive care",
      "Women's health",
    ],
    buttonText: "Request Primary Care Appointment",
    href: "/request-appointment?service=primary-care",
  },
  {
    title: "Wellness",
    subtitle: "Weight Loss, IV Drips, Vitamin Shots & More",
    icon: <LeafIcon className="h-8 w-8 text-primary-dark" />,
    iconBg: "bg-primary-light/70 border border-primary/25",
    checkmarks: [
      "Weight management",
      "IV hydration therapy",
      "Vitamin injections",
      "Men's & women's wellness",
      "Specialty wellness services",
    ],
    buttonText: "Request Wellness Appointment",
    href: "/request-appointment?service=wellness",
  },
];

const TRUST_PILLARS = [
  {
    icon: <UsersIcon className="h-6 w-6 text-primary-dark" />,
    label: "Patient Focused",
  },
  {
    icon: <HeartPulseIcon className="h-6 w-6 text-primary-dark" />,
    label: "Whole-Person Wellness",
  },
  {
    icon: <LeafIcon className="h-6 w-6 text-primary-dark" />,
    label: "Accessible Care for Mind, Body, & Community",
  },
  {
    icon: <ShieldIcon className="h-6 w-6 text-primary-dark" />,
    label: "Compassionate & Confidential",
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf9f5] via-white to-[#f6f9f7] pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            
            {/* Left: Headline & Welcome */}
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-light/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-dark shadow-soft">
                <span className="h-2 w-2 rounded-full bg-primary-dark animate-pulse" />
                NOW ACCEPTING NEW PATIENTS!
              </div>

              <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem]">
                Your Health. <br />
                Your Mind. <br />
                <span className="text-primary-dark">Your Wellness.</span>
              </h1>

              <p className="mt-4 text-xl font-semibold text-secondary-deep">
                Mental Health | Primary Care | Wellness
              </p>

              <p className="mt-3 max-w-xl text-lg leading-relaxed text-soft">
                Accessible, judgment-free care for the whole person in Pearland, TX.
                Whether you need a quick sick visit, ongoing mental health support,
                or wellness therapies, we are here for you.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="#request-appointment" size="lg" variant="accent">
                  Request an Appointment &rarr;
                </Button>
                <a
                  href="tel:+13468785272"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-accent transition-colors hover:text-accent-dark"
                >
                  <PhoneIcon className="h-5 w-5" />
                  (346) 878-5272
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-soft">
                <a
                  href={JANE_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-dark"
                >
                  Existing Patient Portal &rarr;
                </a>
                <Link
                  href={REFER_A_PATIENT_PATH}
                  className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-dark"
                >
                  Refer a Patient &rarr;
                </Link>
              </div>
            </Reveal>

            {/* Right: $59 Self-Pay Sick Visit Promotion Card */}
            <Reveal delayMs={150}>
              <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border-2 border-red-500/35 bg-white p-7 shadow-soft-xl sm:p-8">
                {/* Subtle background glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-100/60 blur-3xl" />
                
                <div className="relative flex items-center gap-4 sm:gap-5">
                  {/* Clickable Starburst Badge */}
                  <Link
                    href="/request-appointment?service=sick-visit"
                    className="group shrink-0 transition-transform duration-300 hover:scale-105"
                    aria-label="Request a $59 Sick Visit"
                  >
                    <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
                      <svg
                        viewBox="0 0 100 100"
                        className="h-full w-full text-red-600 drop-shadow-md"
                        fill="currentColor"
                      >
                        <path d="M50 0 L58 14 L73 7 L75 24 L91 22 L86 38 L100 42 L89 54 L99 64 L84 71 L88 88 L71 86 L69 102 L54 94 L46 102 L44 86 L27 88 L31 71 L16 64 L26 54 L15 42 L29 38 L24 22 L40 24 L42 7 Z" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                        <span className="font-heading text-2xl font-black leading-none sm:text-3xl">$59</span>
                        <span className="text-[10px] font-extrabold uppercase leading-tight tracking-wider sm:text-[11px]">
                          Sick Visits
                        </span>
                        <span className="text-[8px] font-semibold leading-none text-white/95 sm:text-[8.5px]">
                          In-Office &amp; Telehealth
                        </span>
                        <span className="mt-0.5 text-[7.5px] font-bold uppercase tracking-wider text-amber-200 sm:text-[8px]">
                          Self-Pay Only
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div>
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700">
                      Special Promotion
                    </span>
                    <h2 className="mt-2 font-heading text-xl font-bold leading-tight text-foreground sm:text-2xl">
                      Affordable Care. <br />
                      Quality Service.
                    </h2>
                    <p className="mt-1 text-xs text-soft">
                      Fast, compassionate medical attention when you need it most.
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-2.5 text-[0.95rem] text-foreground/85">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">✓</span>
                    <span>Cold, Flu, Cough, Sore Throat, UTI &amp; More</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">✓</span>
                    <span>Medical evaluation, treatment plan &amp; prescriptions when medically appropriate</span>
                  </div>
                </div>

                {/* Prominent Red Button */}
                <div className="mt-6">
                  <Link
                    href="/request-appointment?service=sick-visit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-center font-heading text-base font-bold text-white shadow-soft transition-all duration-200 hover:bg-red-700 hover:shadow-soft-lg"
                  >
                    REQUEST A $59 SICK VISIT &gt;
                  </Link>
                </div>

                {/* Disclaimer */}
                <p className="mt-4 text-[11.5px] leading-relaxed text-soft">
                  * For uncomplicated sick visits only. Medical evaluation and treatment plan included.
                  Prescriptions provided when medically appropriate. Lab testing, procedures,
                  and medication costs are additional.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Three Service Sections (Mental Health, Primary Care, Wellness) */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="Comprehensive Healthcare for Mind & Body"
            description="Personalized care designed around your needs. Select a service to get started with an appointment request."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {THREE_SERVICES.map((service, i) => (
            <Reveal key={service.title} delayMs={i * 120} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg sm:p-8">
                <div>
                  <div className="flex items-center gap-4">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-xl ${service.iconBg}`}>
                      {service.icon}
                    </span>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-semibold text-secondary-deep">
                    {service.subtitle}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {service.checkmarks.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.98rem] text-foreground/80">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-dark" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-border/70">
                  <Button
                    href={service.href}
                    variant="outline"
                    className="w-full text-center"
                  >
                    {service.buttonText} &rarr;
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust Pillars Strip */}
      <section className="border-y border-border/70 bg-primary-50/50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {TRUST_PILLARS.map((pillar) => (
              <div
                key={pillar.label}
                className="flex items-center gap-3 text-center sm:text-left"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-soft">
                  {pillar.icon}
                </span>
                <span className="font-heading text-sm font-semibold text-foreground">
                  {pillar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Request & Pearland Location Section */}
      <section
        id="request-appointment"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Schedule Your Visit"
            title="Request an Appointment"
            description="Fill out the form below and our team will contact you to confirm your visit. Fast, easy, and confidential."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          
          {/* Left Column: Form */}
          <Reveal>
            <AppointmentRequestForm />
          </Reveal>

          {/* Right Column: Location & Reassurance */}
          <Reveal delayMs={150} className="space-y-6">
            
            {/* Our Location Card */}
            <div className="rounded-2xl border border-border bg-white p-7 shadow-soft sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Our Location
                </h3>
              </div>

              <div className="mt-5 space-y-1 text-[1.05rem]">
                <p className="font-semibold text-foreground">
                  Proactive Medical and Wellness
                </p>
                <p className="text-soft">11960 Broadway Street, Suite 520</p>
                <p className="text-soft">Pearland, TX 77584</p>
                <p className="pt-2">
                  <a
                    href="tel:+13468785272"
                    className="font-bold text-accent transition-colors hover:text-accent-dark"
                  >
                    Phone: (346) 878-5272
                  </a>
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={DIRECTIONS_HREF} variant="accent" size="sm">
                  Get Directions &rarr;
                </Button>
                <Button href={REQUEST_APPOINTMENT_PATH} variant="outline" size="sm">
                  Dedicated Booking Page
                </Button>
              </div>

              {/* Responsive Google Map Embed */}
              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                <iframe
                  title="Proactive Medical and Wellness Pearland Location"
                  src="https://maps.google.com/maps?q=11960+Broadway+Street,+Suite+520,+Pearland,+TX+77584&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </div>

            {/* Why Choose Proactive Reassurance Card */}
            <div className="rounded-2xl border border-border bg-primary-50/50 p-6 sm:p-7">
              <h4 className="font-heading text-lg font-bold text-foreground">
                Why Choose Proactive?
              </h4>
              <ul className="mt-4 space-y-2.5 text-[0.98rem] text-foreground/80">
                <li className="flex items-center gap-2.5">
                  <CheckIcon className="h-4 w-4 shrink-0 text-primary-dark" />
                  <span>Accessible, personalized care</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckIcon className="h-4 w-4 shrink-0 text-primary-dark" />
                  <span>Experienced and compassionate providers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckIcon className="h-4 w-4 shrink-0 text-primary-dark" />
                  <span>Convenient in-office &amp; telehealth options</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckIcon className="h-4 w-4 shrink-0 text-primary-dark" />
                  <span>Comprehensive support for mind, body, &amp; community</span>
                </li>
              </ul>
            </div>

          </Reveal>

        </div>
      </section>

      {/* Insurance Partners */}
      <section className="bg-texture-dots bg-primary-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Insurance &amp; Payment"
              title="We Accept Most Major Insurances"
              description="Making quality healthcare accessible to everyone in our community."
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
            <p className="mt-9 text-center text-[1.05rem] font-medium text-soft">
              Self-pay options &amp; payment plans also available
            </p>
          </Reveal>
        </div>
      </section>

      {/* Meet Techa Bryant */}
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
                  alt="Techa Bryant, MSN, APRN, PMHNP-BC, FNP-C — Founder of Proactive Medical and Wellness"
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
              MSN, APRN, PMHNP-BC, FNP-C
            </p>
            <p className="mt-5 text-lg leading-relaxed text-soft">
              With deep clinical expertise and a warm, judgment-free approach,
              Techa provides comprehensive psychiatric evaluations, medication
              management, primary care, and wellness services. She is passionate
              about helping patients feel their best with accessible, dignified care.
            </p>
            <p className="mt-6 text-lg font-medium text-primary-dark">
              Personalized, accessible care for every patient.
            </p>
            <Button href="#request-appointment" size="lg" className="mt-8">
              Request an Appointment &rarr;
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
