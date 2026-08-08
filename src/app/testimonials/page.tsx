import type { Metadata } from "next";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";

const PAGE_TITLE = "Patient Reviews & Testimonials";
const PAGE_DESCRIPTION =
  "Patient stories are coming soon. We're honored to serve our community at Proactive Medical and Wellness.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
};

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
        </Reveal>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <Reveal>
          <p className="text-xl leading-relaxed text-soft">
            Patient stories coming soon. We&apos;re honored to serve our
            community.
          </p>
        </Reveal>
      </section>

      <CTABand heading="Join our community of patients on their wellness journey" />
    </>
  );
}
