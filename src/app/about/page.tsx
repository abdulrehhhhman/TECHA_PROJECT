import type { Metadata } from "next";
import Image from "next/image";
import techaHeadshot from "../../../public/images/techa-headshot.jpg";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { CheckIcon } from "@/components/icons";

const PAGE_TITLE = "About Techa Bryant — Family Nurse Practitioner";
const PAGE_DESCRIPTION =
  "Techa Bryant, MSN, APRN, PMHNP-C, FNP-C, brings dedicated clinical experience in psychiatric care, medication management, and addiction medicine to Proactive Medical and Wellness.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
};

const SPECIALTIES = [
  "Psychiatric Evaluations",
  "Medication Management",
  "Anxiety & Depression Treatment",
  "ADHD Evaluation and Management",
  "PTSD/Trauma-Related Conditions",
  "Insomnia Treatment",
  "Addiction Medicine/Suboxone (MAT)",
  "Primary Care/Family Medicine",
  "Telehealth and In-Person Care",
];

function ProviderPortrait() {
  return (
    <div className="group relative mx-auto w-full max-w-[240px] overflow-hidden">
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-secondary/20 blur-2xl" />
      <div className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-primary/20 blur-2xl" />
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
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pb-4 pt-16 text-center sm:px-6 sm:pt-24">
        <Reveal>
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-sm font-semibold tracking-wide text-primary-dark">
            About Us
          </span>
          <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Meet Techa Bryant — Your Mental Health Partner
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-soft">
            Proactive Medical and Wellness was built on a simple belief: care
            should feel personal, judgment-free, and within reach for
            everyone who needs it.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[240px_1fr] lg:gap-14">
          <Reveal>
            <ProviderPortrait />
          </Reveal>
          <Reveal delayMs={120}>
            <p className="text-lg font-semibold text-foreground">
              Techa Bryant, MSN, APRN, PMHNP-C, FNP-C
            </p>
            <h2 className="mt-1 font-heading text-2xl font-semibold text-primary-dark sm:text-3xl">
              Dedicated Clinical Experience You Can Trust
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-soft">
              With years of dedicated experience in mental health and
              wellness, Techa brings deep clinical expertise, compassion, and
              a commitment to personalized care. She specializes in
              psychiatric evaluations, medication management, and addiction
              medicine—including Suboxone (MAT) treatment for opioid use
              disorder. Techa is a board-certified Advanced Practice
              Registered Nurse (APRN), with certifications as a
              Psychiatric-Mental Health Nurse Practitioner (PMHNP-C) and
              Family Nurse Practitioner (FNP-C). She is passionate about
              reducing the stigma surrounding mental health and helping
              patients reclaim their lives with dignity and hope.
            </p>
            <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {SPECIALTIES.map((specialty) => (
                <li
                  key={specialty}
                  className="flex items-center gap-2.5 text-[1.05rem] text-foreground/85"
                >
                  <CheckIcon className="h-5 w-5 shrink-0 text-primary" />
                  {specialty}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-xl bg-primary p-8 shadow-soft sm:p-10">
              <h3 className="font-heading text-2xl font-semibold text-white">
                Our Mission
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-white/85">
                To provide compassionate, accessible mental health care where
                patients feel heard, supported, and empowered to achieve
                wellness.
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="flex h-full flex-col rounded-xl border border-border bg-white p-8 shadow-soft sm:p-10">
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                Our Commitment
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-soft">
                We believe every patient deserves personalized care delivered
                with dignity, respect, and hope. We&apos;re here to support
                your journey.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand heading="Ready to start your wellness journey?" />
    </>
  );
}
