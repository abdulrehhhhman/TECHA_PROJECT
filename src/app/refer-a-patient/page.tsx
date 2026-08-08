import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ReferralForm from "@/components/form/ReferralForm";

const PAGE_TITLE = "Refer a Patient";
const PAGE_DESCRIPTION =
  "For physicians, therapists, hospitals, case managers, community organizations, and other healthcare partners. We make patient referrals simple.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
};

export default function ReferAPatientPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pb-4 pt-16 text-center sm:px-6 sm:pt-24">
        <Reveal>
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-sm font-semibold tracking-wide text-primary-dark">
            For Referral Partners
          </span>
          <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Refer a Patient
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-soft">
            For physicians, therapists, hospitals, case managers, community
            organizations, and other healthcare partners. We make patient
            referrals simple.
          </p>
        </Reveal>
      </section>

      <section className="bg-primary-50">
        <Reveal className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
          <p className="text-lg leading-relaxed text-soft">
            When you refer a patient to Proactive Medical and Wellness, we
            contact the patient directly to schedule and coordinate care. We
            accept referrals for all our services, including psychiatric
            evaluations, medication management, ADHD, addiction medicine
            (Suboxone/MAT), and family medicine.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <ReferralForm />
        </Reveal>
      </section>
    </>
  );
}
