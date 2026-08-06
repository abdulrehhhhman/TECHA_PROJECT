import type { Metadata } from "next";
import Image from "next/image";
import techaHeadshot from "../../public/images/techa-headshot.jpg";
import Button from "@/components/Button";
import ConsultationForm from "@/components/ConsultationForm";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { JANE_BOOKING_URL } from "@/lib/jane";
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
    title: "Anxiety & Depression",
    description:
      "Evidence-based therapy and treatment for anxiety, depression, and related conditions. We focus on your individual journey.",
  },
  {
    icon: <VideoIcon />,
    title: "Telehealth & In-Home",
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

const STATS = [
  { value: "2,500+", label: "Patients Served" },
  { value: "25+", label: "Years Experience" },
  { value: "98%", label: "Patient Satisfaction" },
  { value: "24hr", label: "Response Time" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    quote:
      "She has completely changed my approach to managing my anxiety. I feel more equipped and hopeful now. I'd highly recommend her!",
  },
  {
    name: "Marina Johnson",
    quote:
      "These services have been the best thing I've done for myself. I learned excellent guidance for life athlete's care.",
  },
  {
    name: "Emily Rodriguez",
    quote:
      "When I met with Techa and her team, compassionate care, confidence and extensive knowledge brought many anxious thoughts to resolve.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — headline left, booking form right, soft bright backdrop */}
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
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="inline-block rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-dark shadow-soft backdrop-blur-sm">
                Proactive Medical and Wellness Center
              </span>
              <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
                Accessible Care for Mind, Body, &amp; Community
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-soft">
                Compassionate mental health and addiction medicine services
                designed to help you thrive.
              </p>
              <p className="mt-6 text-base font-medium tracking-wide text-primary-dark">
                Confidential &middot; Compassionate &middot; Judgment-Free
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href={JANE_BOOKING_URL} size="lg">
                  Book Now
                </Button>
                <a
                  href="tel:+13468785272"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-accent transition-colors hover:text-accent-dark"
                >
                  <PhoneIcon className="h-5 w-5" />
                  Or call us: (346) 878-5272
                </a>
              </div>

              <div className="group relative mt-10 aspect-4/3 w-full max-w-md overflow-hidden rounded-xl shadow-soft-lg ring-1 ring-primary/15">
                <Image
                  src="https://images.unsplash.com/photo-1741682739943-d0209422f004?auto=format&fit=crop&w=1000&q=75"
                  alt="A calm, sunlit space"
                  fill
                  sizes="(min-width: 1024px) 448px, 90vw"
                  className="ease-calm object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
              </div>
            </Reveal>

            <Reveal delayMs={150}>
              <ConsultationForm
                compact
                title="Book Your Consultation"
                subtitle="Take the first step towards better health"
                reasonLabel="How can we support you today?"
                reasonPlaceholder="Share a little about what brings you here today."
                submitLabel="Request Appointment"
              />
              <p className="mt-5 text-center text-[1.05rem] leading-relaxed text-soft">
                Whether you&apos;re feeling overwhelmed, anxious, or just need
                someone to talk to — we&apos;re here to help.
              </p>
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
          <Button href={JANE_BOOKING_URL} variant="outline" size="lg" className="mt-5">
            Schedule a Consultation
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
            <Button href={JANE_BOOKING_URL} size="lg">
              Book Your Appointment Today
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
                  alt="Techa B., MSN, FNP-C, FMHNP-C — Founder of Proactive Medical and Wellness"
                  placeholder="blur"
                  quality={95}
                  sizes="(min-width: 768px) 240px, 60vw"
                  className="ease-calm block h-auto w-full object-cover contrast-[1.05] saturate-[1.05] transition-transform duration-[1400ms] group-hover:scale-105"
                />
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-foreground shadow-soft-lg">
                25+ Years of Excellence
              </span>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-dark">
              Meet Your Provider
            </span>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Meet Techa B.
            </h2>
            <p className="mt-1 text-lg font-semibold text-secondary-deep">
              MSN, FNP-C, FMHNP-C
            </p>
            <p className="mt-5 text-lg leading-relaxed text-soft">
              With deep clinical expertise and a warm, judgment-free approach,
              Techa specializes in psychiatric evaluations, medication
              management, and addiction medicine—including Suboxone (MAT)
              treatment. She&apos;s passionate about helping patients reclaim
              their lives with dignity and hope.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/70 bg-white p-4 text-center shadow-soft"
                >
                  <p className="font-heading text-2xl font-semibold text-primary-dark">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-soft">{stat.label}</p>
                </div>
              ))}
            </div>
            <Button href={JANE_BOOKING_URL} size="lg" className="mt-8">
              Schedule Your Visit
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Patients Say"
            description="Real stories from real patients who have experienced the Proactive Medical difference in their health journey."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delayMs={i * 100} className="h-full">
              <TestimonialCard {...t} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
