"use client";

import { Github, Mail, Phone, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const currentYear = new Date().getFullYear();

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative mt-10">
      <Separator className="bg-border/50" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-3 gap-8 items-center">
          {/* Logo & description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                H
              </div>
              <span className="font-semibold">Harman</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer crafting modern web experiences.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center justify-start sm:justify-end gap-3">
            <a
              href="mailto:hs9961984@gmail.com"
              className="p-2 rounded-lg text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-all"
            >
              <Mail className="size-5" />
              <span className="sr-only">Email</span>
            </a>
            <a
              href="tel:+919464741376"
              className="p-2 rounded-lg text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-all"
            >
              <Phone className="size-5" />
              <span className="sr-only">Phone</span>
            </a>
            <a
              href="https://github.com/harman2212"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-all"
            >
              <Github className="size-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="bg-border/30 my-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Harman. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="size-3.5 text-red-500 fill-red-500" />
            <span>using</span>
            <span className="font-medium text-emerald-500">Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
