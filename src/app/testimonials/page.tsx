import type { Metadata } from "next";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";

const PAGE_TITLE = "Patient Reviews & Testimonials";
const PAGE_DESCRIPTION =
  "Real stories from real patients about their experience with Proactive Medical and Wellness.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
};

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    quote:
      "She has completely changed my approach to managing my anxiety. I feel more equipped and hopeful now. I'd highly recommend her!",
  },
  {
    name: "Marina Johnson",
    quote:
      "These services have been the best thing I've done for myself. I learned excellent guidance for life athletic care.",
  },
  {
    name: "Emily Rodriguez",
    quote:
      "When I met with Techa and her team, compassionate care, confidence and extensive knowledge brought many anxious thoughts to resolve.",
  },
];

const STATS = [
  { value: "25+", label: "Years of Clinical Experience" },
  { value: "1,000+", label: "Patients Helped" },
  { value: "5.0", label: "Average Patient Rating" },
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pb-4 pt-16 text-center sm:px-6 sm:pt-24">
        <Reveal>
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-sm font-semibold tracking-wide text-primary-dark">
            Testimonials
          </span>
          <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            What Our Patients Say
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-soft">
            Real stories from real patients about their experience with
            Proactive Medical and Wellness.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delayMs={i * 100} className="h-full">
              <TestimonialCard {...t} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-primary-light/60">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Trusted Care"
              title="Care Backed by Experience"
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delayMs={i * 100}>
                <p className="font-heading text-4xl font-semibold text-primary-dark sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[1.05rem] text-soft">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand heading="Join our community of patients on their wellness journey" />
    </>
  );
}
