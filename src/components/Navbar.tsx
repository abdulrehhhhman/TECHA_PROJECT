"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import Logo from "./Logo";
import { PhoneIcon } from "./icons";
import { JANE_LOGIN_URL } from "@/lib/jane";
import { REQUEST_APPOINTMENT_PATH } from "@/lib/routes";

const PHONE_DISPLAY = "(346) 878-5272";
const PHONE_HREF = "tel:+13468785272";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-2 text-[1.05rem] font-medium text-foreground/80 transition-colors hover:text-primary-dark"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-secondary transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={PHONE_HREF}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[1.05rem] font-medium text-accent transition-colors hover:text-accent-dark"
          >
            <PhoneIcon className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <Button
            href={REQUEST_APPOINTMENT_PATH}
            size="sm"
            className="shrink-0 whitespace-nowrap"
          >
            Request an Appointment
          </Button>
          <Button
            href={JANE_LOGIN_URL}
            variant="outline"
            size="sm"
            className="shrink-0 whitespace-nowrap"
          >
            Existing Patient Portal
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Button
            href={REQUEST_APPOINTMENT_PATH}
            size="sm"
            className="!px-3 !py-1.5 !text-xs leading-tight"
          >
            <span className="block text-center">
              Request an
              <br />
              Appointment
            </span>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-accent"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-border/80 bg-background transition-[max-height] duration-300 ease-in-out xl:hidden ${
          open ? "max-h-[30rem]" : "max-h-0 border-t-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-lg font-medium text-foreground/85 transition-colors hover:bg-primary-light hover:text-primary-dark"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={PHONE_HREF}
            className="mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-lg font-medium text-accent"
          >
            <PhoneIcon className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={JANE_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-3 text-lg font-medium text-soft transition-colors hover:text-accent"
          >
            Existing Patient Portal
          </a>
        </nav>
      </div>
    </header>
  );
}
