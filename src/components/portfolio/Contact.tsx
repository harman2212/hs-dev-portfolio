"use client";

import { Github, Mail, Phone, ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "./ScrollAnimation";
import { profileData } from "@/lib/constants";

const contactOptions = [
  {
    name: "Email",
    description: profileData.email,
    href: `mailto:${profileData.email}`,
    icon: Mail,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    name: "Phone",
    description: profileData.phone,
    href: "tel:+919464741376",
    icon: Phone,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    name: "GitHub",
    description: "Check out my open source work and contributions",
    href: profileData.github,
    icon: Github,
    color: "text-white dark:text-neutral-200",
    bgColor: "bg-neutral-800 dark:bg-neutral-700",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 relative"
      aria-labelledby="contact-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold mb-4">
              Let&apos;s Work{" "}
              <span className="text-emerald-500">Together</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I&apos;m currently available for freelance work and open to discussing new
              projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 mx-auto rounded-full mt-4" />
          </div>
        </ScrollAnimation>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Contact cards */}
          <ScrollAnimation stagger>
            <div className="grid sm:grid-cols-3 gap-4">
              {contactOptions.map((option) => (
                <Card
                  key={option.name}
                  className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer min-w-0"
                >
                  <CardContent className="p-6">
                    <a
                      href={option.href}
                      target={option.name === "Phone" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-start gap-4"
                    >
                      <div
                        className={`p-3 rounded-xl shrink-0 ${option.bgColor} group-hover:scale-110 transition-transform`}
                      >
                        <option.icon className={`size-5 ${option.color}`} />
                      </div>
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h3 className="font-semibold mb-1 group-hover:text-emerald-500 transition-colors">
                          {option.name}
                        </h3>
                        <p className="text-sm text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                          {option.description}
                        </p>
                      </div>
                      <ExternalLink className="size-4 text-muted-foreground group-hover:text-emerald-500 transition-colors shrink-0 mt-1" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollAnimation>

          {/* CTA */}
          <ScrollAnimation>
            <Card className="bg-gradient-to-br from-emerald-500/10 via-card to-emerald-500/5 border-emerald-500/20 overflow-hidden">
              <CardContent className="p-8 sm:p-10 text-center">
                <div className="space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-emerald-500/10">
                    <Send className="size-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Ready to start your next project?
                  </h3>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Whether you need a full-stack web application, an AI-powered
                    feature, or a modern website — let&apos;s bring your ideas to life.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Button
                      size="lg"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-105 px-8"
                      asChild
                    >
                      <a
                        href={profileData.fiverr}
                        target="_self"
                      >
                        Hire Me on Fiverr
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/50 px-8"
                      asChild
                    >
                      <a href={`mailto:${profileData.email}`}>
                        <Mail className="size-4" />
                        Send Email
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
