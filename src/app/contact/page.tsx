import type { Metadata } from "next";
import Button from "@/components/Button";
import CTABand from "@/components/CTABand";
import ContactForm from "@/components/ContactForm";
import ContactInfoCard from "@/components/ContactInfoCard";
import Reveal from "@/components/Reveal";
import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

const PAGE_TITLE = "Contact Us";
const PAGE_DESCRIPTION =
  "Get in touch with Proactive Medical and Wellness — call, email, or send a message. We're here to help.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
};

const ADDRESS = "123 Wellness Way, Suite 200, Your City, ST 00000";
const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pb-4 pt-16 text-center sm:px-6 sm:pt-24">
        <Reveal>
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-sm font-semibold tracking-wide text-primary-dark">
            Contact
          </span>
          <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Get in Touch — We&apos;re Here to Help
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-soft">
            Have questions? Ready to schedule an appointment? We&apos;d love
            to hear from you.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="h-full">
            <ContactInfoCard
              icon={<PhoneIcon className="h-7 w-7" />}
              title="Call Us"
              primary="(346) 878-5272"
              primaryHref="tel:+13468785272"
              secondary={["Available Mon–Fri, 8:00 AM – 5:00 PM"]}
            />
          </Reveal>
          <Reveal delayMs={100} className="h-full">
            <ContactInfoCard
              icon={<EnvelopeIcon className="h-7 w-7" />}
              title="Email Us"
              primary="reception@proactivemedicalandwellness.com"
              primaryHref="mailto:reception@proactivemedicalandwellness.com"
              secondary={["We'll respond within 24 hours"]}
            />
          </Reveal>
          <Reveal delayMs={200} className="h-full">
            <ContactInfoCard
              icon={<ClockIcon className="h-7 w-7" />}
              title="Office Hours"
              primary="Monday – Friday: 8:00 AM – 5:00 PM"
              secondary={["Saturday & Sunday: Closed", "Walk-ins by appointment only"]}
            />
          </Reveal>
          <Reveal delayMs={300} className="h-full">
            <ContactInfoCard
              icon={<MapPinIcon className="h-7 w-7" />}
              title="Visit Us"
              primary={ADDRESS}
              link={{ label: "Get Directions", href: DIRECTIONS_HREF }}
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal>
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              Send Us a Message
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-soft">
              Fill out the form below and our team will get back to you
              shortly.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary-light via-secondary-light to-primary-light p-8 text-center shadow-soft-lg sm:aspect-4/3">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -bottom-10 -right-6 h-44 w-44 rounded-full bg-secondary/25 blur-2xl" />
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary-dark shadow-soft">
                <MapPinIcon className="h-8 w-8" />
              </span>
              <p className="mt-5 font-heading text-xl font-semibold text-foreground">
                Find Our Office
              </p>
              <p className="mt-2 max-w-xs text-[1.05rem] leading-relaxed text-soft">
                {ADDRESS}
              </p>
              <Button href={DIRECTIONS_HREF} variant="accent" className="mt-6">
                Get Directions
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        heading="Ready to take the next step?"
        subtext="Book your consultation online, or call us directly."
      />
    </>
  );
}
