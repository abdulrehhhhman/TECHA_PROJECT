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

function SickVisitStarburst() {
  return (
    <div className="relative inline-flex items-center justify-center animate-starburst cursor-pointer">
      {/* 18-Pointed Sharp Red Starburst */}
      <svg
        viewBox="0 0 120 120"
        className="h-36 w-36 transition-transform duration-300 sm:h-40 sm:w-40"
        fill="#dc2626"
      >
        <polygon points="60,4 67.6,16.7 79.2,7.4 82,21.9 96,17.1 93.7,31.7 108.5,32 101.3,45 115.1,50.3 104,60 115.1,69.7 101.3,75 108.5,88 93.7,88.3 96,102.9 82,98.1 79.2,112.6 67.6,103.3 60,116 52.4,103.3 40.8,112.6 38,98.1 24,102.9 26.3,88.3 11.5,88 18.7,75 4.9,69.7 16,60 4.9,50.3 18.7,45 11.5,32 26.3,31.7 24,17.1 38,21.9 40.8,7.4 52.4,16.7" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white select-none">
        <span className="font-heading text-4xl font-black leading-none tracking-tight drop-shadow sm:text-[2.75rem]">
          $59
        </span>
        <span className="mt-1 text-xs font-black uppercase tracking-wider text-white drop-shadow sm:text-[13px]">
          SICK VISITS
        </span>
        <span className="text-[9px] font-semibold leading-tight text-white/95 sm:text-[10px]">
          In-Office &amp; Telehealth
        </span>
        <span className="mt-0.5 text-[9px] font-black uppercase tracking-wider text-[#ffd700] drop-shadow-sm sm:text-[10px]">
          SELF-PAY ONLY
        </span>
      </div>
    </div>
  );
}

const THREE_SERVICES = [
  {
    title: "Mental Health",
    subtitle: "Anxiety, Depression, ADHD, Bipolar & More",
    icon: <BrainIcon className="h-8 w-8 text-white" />,
    badgeBg: "bg-[#1c4b35]",
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
    icon: <StethoscopeIcon className="h-8 w-8 text-white" />,
    badgeBg: "bg-[#0e7490]",
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
    icon: <LeafIcon className="h-8 w-8 text-white" />,
    badgeBg: "bg-[#15803d]",
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
    icon: <ShieldIcon className="h-6 w-6 text-primary-dark" />,
    label: "Accessible Care for Mind, Body, & Community",
  },
  {
    icon: <LeafIcon className="h-6 w-6 text-primary-dark" />,
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
      {/* Hero Section — Clean 2-Column Layout */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#faf8f5] via-white to-[#f4f7f5] pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20 border-b border-border/40">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_0.85fr] lg:gap-16 xl:gap-20">
            
            {/* Left Column: Welcome Headline & Subtext */}
            <Reveal>
              <div className="inline-block rounded-full border border-primary/25 bg-white/95 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-dark shadow-soft">
                NOW ACCEPTING NEW PATIENTS!
              </div>

              <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
                Your Health. <br />
                Your Mind. <br />
                <span className="text-primary-dark">Our Priority.</span>
              </h1>

              <p className="mt-4 text-xl font-semibold text-secondary-deep">
                Medical Care | Mental Health | Wellness
              </p>

              <p className="mt-3 max-w-xl text-lg leading-relaxed text-soft">
                Accessible care for mind, body, and community in Pearland, TX.
                Personalized healthcare tailored to your unique journey.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#request-appointment"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#cb9958] px-7 py-3.5 font-heading text-base font-semibold text-white shadow-soft transition-all duration-300 hover:bg-[#b88647] hover:shadow-soft-lg hover:-translate-y-0.5"
                >
                  Request an Appointment &rarr;
                </a>
                <a
                  href="tel:+13468785272"
                  className="inline-flex items-center gap-2 text-base font-semibold text-accent transition-colors hover:text-accent-dark"
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

            {/* Right Column: The $59 Sick Visits Card with Continuous Hover/Pulse Animation */}
            <Reveal delayMs={150}>
              <div className="relative mx-auto flex w-full max-w-md flex-col items-center rounded-3xl border border-red-200 bg-gradient-to-b from-[#fef5f3] via-[#fff8f6] to-white p-7 shadow-soft-xl sm:p-9">
                
                {/* Continuously Animated Floating/Hovering Starburst Badge */}
                <Link
                  href="/request-appointment?service=sick-visit"
                  className="group"
                  aria-label="Request a $59 Sick Visit"
                >
                  <SickVisitStarburst />
                </Link>

                {/* Checklist with Medical Icons */}
                <div className="mt-7 w-full space-y-3.5 text-left">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <StethoscopeIcon className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-[0.95rem] font-medium leading-snug text-foreground/85">
                      Cold, Flu, Cough, Sore Throat, UTI &amp; More
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <HeartPulseIcon className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-[0.95rem] font-medium leading-snug text-foreground/85">
                      Medical evaluation, treatment plan, and prescription when medically appropriate
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <ShieldIcon className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-[12.5px] leading-snug text-soft">
                      Lab testing, procedures, and medication costs are additional.
                    </p>
                  </div>
                </div>

                {/* Big Bold Red Pill Button */}
                <div className="mt-7 w-full">
                  <Link
                    href="/request-appointment?service=sick-visit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#dc2626] py-3.5 px-6 text-center font-heading text-sm font-bold tracking-wide text-white shadow-md transition-all duration-200 hover:bg-[#b91c1c] hover:shadow-lg active:scale-95 sm:text-base"
                  >
                    Request a $59 Sick Visit &gt;
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Three Service Sections (Clean Minimalist Cards Without Photos) */}
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
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg sm:p-9">
                
                <div>
                  {/* Clean Circular Icon Badge */}
                  <div className="flex items-center gap-4">
                    <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${service.badgeBg} shadow-soft`}>
                      {service.icon}
                    </span>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-secondary-deep">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border/60 pt-6">
                    <ul className="space-y-3 text-left">
                      {service.checkmarks.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[0.98rem] text-foreground/80">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/60">
                  <Link
                    href={service.href}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1c4b35] py-3.5 px-4 font-heading text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#143727] hover:shadow-soft"
                  >
                    {service.buttonText} &rarr;
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust Pillars Strip — Light Green Bar from Mockup */}
      <section className="border-y border-[#d5e7db] bg-[#eaf4ed] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {TRUST_PILLARS.map((pillar) => (
              <div
                key={pillar.label}
                className="flex items-center gap-3 text-center sm:text-left"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary-dark shadow-soft">
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
                    className="font-bold text-accent transition-colors hover:text-accent-dark flex items-center gap-2"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    (346) 878-5272
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
                  <span>Support for mind, body, &amp; community</span>
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
