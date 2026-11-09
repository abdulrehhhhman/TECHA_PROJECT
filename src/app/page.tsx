import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import techaHeadshot from "../../public/images/techa-headshot.jpg";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import AppointmentRequestForm from "@/components/form/AppointmentRequestForm";
import { JANE_LOGIN_URL } from "@/lib/jane";
import { REFER_A_PATIENT_PATH, REQUEST_APPOINTMENT_PATH } from "@/lib/routes";
import {
  BrainIcon,
  CalendarIcon,
  CheckIcon,
  LeafIcon,
  MapPinIcon,
  PhoneIcon,
  PillIcon,
  StethoscopeIcon,
  ThermometerIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/icons";

const PAGE_TITLE = "Proactive Medical and Wellness | Accessible Care for Mind & Body";
const PAGE_DESCRIPTION =
  "Accessible, compassionate care for mind, body, and community. Personalized treatment and support for every stage of your health journey. Mental Health, Addiction Medicine, Medical Care, and Wellness.";

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
    siteName: "Proactive Medical and Wellness",
    type: "website",
    images: [
      {
        url: "/images/promo-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Proactive Medical and Wellness",
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

const FOUR_SERVICES = [
  {
    title: "Mental Health",
    icon: <BrainIcon className="h-9 w-9 text-[#6b21a8]" />,
    cardBg: "bg-[#f8f5fc] border-purple-200/80 hover:border-purple-300",
    titleColor: "text-[#4a154b]",
    arrowBg: "bg-[#4a154b] text-white hover:bg-[#380e39]",
    description:
      "Psychiatric evaluations, medication management, and ongoing support for anxiety, depression, bipolar disorder, ADHD, PTSD, and more.",
    href: "/request-appointment?service=mental-health",
  },
  {
    title: "Addiction Medicine",
    icon: <PillIcon className="h-9 w-9 text-[#0d9488]" />,
    cardBg: "bg-[#f0faf8] border-teal-200/80 hover:border-teal-300",
    titleColor: "text-[#0f766e]",
    arrowBg: "bg-[#0f766e] text-white hover:bg-[#115e59]",
    description:
      "Suboxone treatment, medication-assisted treatment (MAT), substance use treatment, and recovery support.",
    href: "/request-appointment?service=addiction-medicine",
  },
  {
    title: "Medical Care",
    icon: <StethoscopeIcon className="h-9 w-9 text-[#0284c7]" />,
    cardBg: "bg-[#f0f7fd] border-sky-200/80 hover:border-sky-300",
    titleColor: "text-[#0369a1]",
    arrowBg: "bg-[#0284c7] text-white hover:bg-[#0369a1]",
    description:
      "Sick visits, chronic condition management, preventive care, women's and men's health, and physical exams.",
    href: "/request-appointment?service=primary-care",
  },
  {
    title: "Wellness",
    icon: <LeafIcon className="h-9 w-9 text-[#b45309]" />,
    cardBg: "bg-[#fdfbf2] border-amber-200/80 hover:border-amber-300",
    titleColor: "text-[#92400e]",
    arrowBg: "bg-[#b45309] text-white hover:bg-[#92400e]",
    description:
      "Weight management, IV therapy, wellness injections, and custom wellness packages.",
    href: "/request-appointment?service=wellness",
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
      {/* Hero Section — Matching Exact Mockup */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#faf8f5] via-white to-[#f4f7f5] pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-14 border-b border-border/40">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 xl:gap-16">
            
            {/* Left Column: Headline, Services & CTA */}
            <Reveal>
              {/* Eyebrow with decorative line */}
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-10 sm:w-14 bg-teal-600 rounded-full" />
                <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-700">
                  YOUR MIND. YOUR HEALTH.
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.15] tracking-tight text-[#4a154b] sm:text-5xl lg:text-[3.25rem]">
                Mental Health, <br />
                Addiction Medicine, <br />
                Medical Care <span className="text-teal-600">&amp;</span> Wellness
              </h1>

              {/* Supporting Description */}
              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-foreground/80 font-normal">
                Accessible, compassionate care for mind, body, and community. Personalized treatment and support for every stage of your health journey.
              </p>

              {/* CTA Buttons Side-by-Side */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#request-appointment"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#4a154b] px-6 py-3.5 font-heading text-base font-semibold text-white shadow-soft transition-all duration-300 hover:bg-[#380e39] hover:shadow-soft-lg hover:-translate-y-0.5"
                >
                  <CalendarIcon className="h-5 w-5" />
                  Request Appointment
                </a>

                <a
                  href="#request-appointment"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#4a154b] bg-white px-6 py-3 font-heading text-base font-semibold text-[#4a154b] shadow-soft transition-all duration-300 hover:bg-purple-50 hover:-translate-y-0.5"
                >
                  <UsersIcon className="h-5 w-5" />
                  New Patients Welcome
                </a>
              </div>

              {/* Quick Links */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-soft">
                <a
                  href="tel:+13468785272"
                  className="inline-flex items-center gap-1.5 text-accent hover:text-accent-dark"
                >
                  <PhoneIcon className="h-4 w-4" />
                  (346) 878-5272
                </a>
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

            {/* Right Column: Welcoming Diverse Everyday People Photo with Wave Accent */}
            <Reveal delayMs={120}>
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <div className="relative aspect-[584/240] sm:aspect-[584/255] w-full overflow-hidden rounded-3xl shadow-soft-xl border border-border/50 bg-white">
                  <Image
                    src="/images/hero-diverse-people.jpg"
                    alt="Diverse, welcoming group of smiling everyday people"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                  {/* Subtle decorative curved swoosh accent at bottom right */}
                  <div className="pointer-events-none absolute -bottom-1 -right-1 h-14 w-44 rounded-tl-full bg-gradient-to-r from-teal-500/80 to-[#4a154b]/90 opacity-90 blur-xs" />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Our Services Section — 4 Horizontal Categories matching Mockup */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        
        {/* Decorative Centered Heading */}
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-0.5 w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#4a154b]/30 rounded-full" />
            <h2 className="font-heading text-3xl font-bold text-[#4a154b] sm:text-4xl text-center">
              Our Services
            </h2>
            <div className="h-0.5 w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#4a154b]/30 rounded-full" />
          </div>
        </Reveal>

        {/* 4 Cards in 1 Row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FOUR_SERVICES.map((service, i) => (
            <Reveal key={service.title} delayMs={i * 80} className="h-full">
              <div
                className={`flex h-full flex-col justify-between rounded-2xl border p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg ${service.cardBg}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="shrink-0">{service.icon}</span>
                    <Link
                      href={service.href}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold shadow-sm transition-transform hover:scale-110 ${service.arrowBg}`}
                      aria-label={`Learn more about ${service.title}`}
                    >
                      &rarr;
                    </Link>
                  </div>

                  <h3 className={`mt-4 font-heading text-xl font-bold ${service.titleColor}`}>
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/80">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5">
                  <Link
                    href={service.href}
                    className={`text-xs font-bold uppercase tracking-wider ${service.titleColor} hover:underline inline-flex items-center gap-1`}
                  >
                    Request Care &rarr;
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Two Matching Limited-Time Promotional Offers directly underneath */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* Promo Card 1: Sick Visits (Purple Card) */}
          <Reveal delayMs={100}>
            <div className="relative flex flex-col justify-between rounded-3xl bg-[#4a154b] p-7 pt-9 shadow-soft-xl text-white sm:p-9 sm:pt-10">
              
              {/* Yellow Pill Badge */}
              <div className="absolute -top-3.5 left-8 rounded-full bg-[#facc15] px-4 py-1 shadow-md">
                <span className="font-heading text-xs font-black uppercase tracking-wider text-black">
                  LIMITED-TIME OFFER
                </span>
              </div>

              <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1.1fr_1fr]">
                {/* Left: Icon, Title & Price */}
                <div>
                  <div className="flex items-center gap-3">
                    <ThermometerIcon className="h-10 w-10 text-purple-200" />
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold leading-tight text-white">
                        Sick Visits
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-semibold text-purple-200 line-through decoration-red-400 decoration-2">
                          Regular $99.99
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="font-heading text-4xl sm:text-5xl font-black text-[#facc15] tracking-tight">
                      $59.99
                    </span>
                  </div>
                </div>

                {/* Right: Bullet List */}
                <div className="space-y-2.5 text-xs sm:text-sm text-purple-100 border-t border-purple-400/30 pt-4 sm:border-t-0 sm:border-l sm:border-purple-400/30 sm:pl-6 sm:pt-0">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#facc15] text-base leading-none">✓</span>
                    <span>Self-pay sick visits only</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#facc15] text-base leading-none">✓</span>
                    <span>Testing and additional services billed separately</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#facc15] text-base leading-none">✓</span>
                    <span>Prescriptions when medically appropriate</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="mt-6 pt-5 border-t border-purple-400/30 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-purple-200">
                  In-office &amp; telehealth available
                </span>
                <Link
                  href="/request-appointment?service=sick-visit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#facc15] px-5 py-2.5 font-heading text-sm font-bold text-black shadow-sm transition-all hover:bg-yellow-300 hover:shadow-md"
                >
                  Request a $59.99 Sick Visit &rarr;
                </Link>
              </div>

            </div>
          </Reveal>

          {/* Promo Card 2: School & Sports Physicals (Emerald Teal Card) */}
          <Reveal delayMs={150}>
            <div className="relative flex flex-col justify-between rounded-3xl bg-[#064e3b] p-7 pt-9 shadow-soft-xl text-white sm:p-9 sm:pt-10">
              
              {/* Yellow Pill Badge */}
              <div className="absolute -top-3.5 left-8 rounded-full bg-[#facc15] px-4 py-1 shadow-md">
                <span className="font-heading text-xs font-black uppercase tracking-wider text-black">
                  LIMITED-TIME OFFER
                </span>
              </div>

              <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1.1fr_1fr]">
                {/* Left: Icon, Title & Price */}
                <div>
                  <div className="flex items-center gap-3">
                    <TrophyIcon className="h-10 w-10 text-emerald-200" />
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold leading-tight text-white">
                        School &amp; Sports Physicals
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-semibold text-emerald-200 line-through decoration-red-400 decoration-2">
                          Regular $99.99
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="font-heading text-4xl sm:text-5xl font-black text-[#facc15] tracking-tight">
                      $59.99
                    </span>
                  </div>
                </div>

                {/* Right: Bullet List */}
                <div className="space-y-2.5 text-xs sm:text-sm text-emerald-100 border-t border-emerald-400/30 pt-4 sm:border-t-0 sm:border-l sm:border-emerald-400/30 sm:pl-6 sm:pt-0">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#facc15] text-base leading-none">✓</span>
                    <span>Self-pay school and sports physicals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#facc15] text-base leading-none">✓</span>
                    <span>Additional testing or services, if needed, billed separately</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="mt-6 pt-5 border-t border-emerald-400/30 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-emerald-200">
                  Quick turnaround &amp; completed forms
                </span>
                <Link
                  href="/request-appointment?service=school-sports-physical"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#facc15] px-5 py-2.5 font-heading text-sm font-bold text-black shadow-sm transition-all hover:bg-yellow-300 hover:shadow-md"
                >
                  Request a $59.99 Physical &rarr;
                </Link>
              </div>

            </div>
          </Reveal>

        </div>

      </section>

      {/* Appointment Request & Pearland Location Section */}
      <section
        id="request-appointment"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 border-t border-border/40"
      >
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-dark">
              Schedule Your Visit
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#4a154b] sm:text-4xl">
              Request an Appointment
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-soft">
              Fill out the form below and our team will contact you to confirm your visit. Fast, easy, and confidential.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          
          {/* Left Column: Form */}
          <Reveal>
            <AppointmentRequestForm />
          </Reveal>

          {/* Right Column: Location & Practice Info */}
          <Reveal delayMs={150} className="space-y-6">
            
            {/* Our Location Card */}
            <div className="rounded-3xl border border-border bg-white p-7 shadow-soft sm:p-8">
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
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
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
            <div className="rounded-3xl border border-border bg-primary-50/50 p-6 sm:p-7">
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
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-dark">
                Insurance &amp; Payment
              </span>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground">
                We Accept Most Major Insurances
              </h2>
              <p className="mt-3 text-soft">
                Making quality mental health and medical care accessible to everyone.
              </p>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
            <p className="mt-8 text-center text-[1.05rem] font-medium text-soft">
              Self-pay options &amp; payment plans also available
            </p>
          </Reveal>
        </div>
      </section>

      {/* Meet Techa Bryant */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
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
