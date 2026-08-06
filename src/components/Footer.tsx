import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/socials";
import { LogoMark } from "./Logo";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
  { href: "/book-consultation", label: "Book a Consultation" },
];

const SERVICE_LINKS = [
  { href: "/services", label: "All Services" },
  { href: "/services#mental-health", label: "Mental Health Counseling" },
  { href: "/services#addiction-medicine", label: "Addiction Medicine" },
  { href: "/services#medication-management", label: "Medication Management" },
  { href: "/services#group-therapy", label: "Group Therapy" },
];

const INSURANCE_PARTNERS = [
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "UnitedHealthcare",
  "Medicaid",
  "Medicare",
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-base font-semibold tracking-wide text-white/95">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-accent to-accent-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span className="font-heading text-lg font-semibold text-white">
                Proactive Medical & Wellness
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[1.05rem] leading-relaxed text-white/75">
              Accessible Care for Mind, Body, & Community
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-sm text-white/80 transition-colors hover:border-secondary hover:text-secondary-light"
                >
                  {social.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[1.05rem] text-white/75 transition-colors hover:text-secondary-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[1.05rem] text-white/75 transition-colors hover:text-secondary-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="mt-4 space-y-2.5 text-[1.05rem] text-white/75">
              <li>
                <a href="tel:+13468785272" className="transition-colors hover:text-secondary-light">
                  (346) 878-5272
                </a>
              </li>
              <li>
                <a
                  href="mailto:reception@proactivemedicalandwellness.com"
                  className="transition-colors hover:text-secondary-light"
                >
                  reception@proactivemedicalandwellness.com
                </a>
              </li>
              <li>123 Wellness Way, Suite 200<br />Your City, ST 00000</li>
              <li className="pt-1 text-white/60">
                Mon–Fri: 8am – 5pm
                <br />
                Sat–Sun: Closed
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-9">
          <p className="mb-5 text-sm font-medium uppercase tracking-widest text-white/45">
            Insurance we accept
          </p>
          <div className="flex flex-wrap gap-3">
            {INSURANCE_PARTNERS.map((name) => (
              <span
                key={name}
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-sm text-white/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Proactive Medical & Wellness Center. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-secondary-light">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-secondary-light">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
