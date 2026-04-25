"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const profileData = {
  avatar: "https://avatars.githubusercontent.com/u/133370119?v=4",
  name: "Harman",
  title: "Full Stack Developer & AI Enthusiast",
  tagline:
    "Full Stack Developer specializing in Next.js, TypeScript, React & AI. Open to freelance projects.",
  github: "https://github.com/harman2212",
};

// Floating particle positions
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 10 + 15,
  delay: Math.random() * 5,
}));

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const characters = text.split("");
  return (
    <span className="inline-flex">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.03,
            delay: delay + i * 0.05,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.8,
          delay: delay + characters.length * 0.05 + 0.3,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="text-emerald-500 ml-0.5"
      >
        |
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5 dark:from-emerald-500/10 dark:via-transparent dark:to-emerald-500/10" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-[128px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[200px]"
        />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-emerald-500/30 dark:bg-emerald-500/40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full blur-sm opacity-75" />
              <Avatar className="relative size-28 sm:size-32 ring-4 ring-background">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback className="text-2xl font-bold bg-emerald-500 text-white">
                  H
                </AvatarFallback>
              </Avatar>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-muted-foreground">Hi, I&apos;m </span>
              <span className="text-emerald-500">
                <TypingText text={profileData.name} delay={0.4} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium"
            >
              {profileData.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground/80 leading-relaxed"
            >
              {profileData.tagline}
            </motion.p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105 px-8"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
              <ArrowDown className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all hover:scale-105 px-8"
              asChild
            >
              <a
                href="https://www.fiverr.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hire Me on Fiverr
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-emerald-500 transition-colors"
              asChild
            >
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground/50"
          >
            <span className="text-xs font-medium">Scroll Down</span>
            <ArrowDown className="size-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
