import Button from "./Button";
import { PhoneIcon } from "./icons";
import { REQUEST_APPOINTMENT_PATH } from "@/lib/routes";

const PHONE_DISPLAY = "(346) 878-5272";
const PHONE_HREF = "tel:+13468785272";

interface CTABandProps {
  heading: string;
  subtext?: string;
}

export default function CTABand({ heading, subtext }: CTABandProps) {
  return (
    <section className="bg-gradient-to-br from-accent via-accent to-accent-dark">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {heading}
        </h2>
        {subtext && (
          <p className="mt-4 text-lg leading-relaxed text-white/80">{subtext}</p>
        )}
        <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Button href={REQUEST_APPOINTMENT_PATH} size="lg">
            Request an Appointment
          </Button>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 text-lg font-semibold text-white/90 transition-colors hover:text-secondary-light"
          >
            <PhoneIcon className="h-5 w-5" />
            Or call us: {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
