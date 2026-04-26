"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, FolderGit2, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollAnimation } from "./ScrollAnimation";
import { profileData } from "@/lib/constants";

// Animated counter that counts up when in view
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

interface GitHubStats {
  public_repos: number;
  stargazers_count: number;
}

export function About() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            const totalStars = (data.repos || []).reduce(
              (sum: number, repo: { stargazers_count: number }) =>
                sum + repo.stargazers_count,
              0
            );
            setGithubStats({
              public_repos: data.profile.public_repos || 0,
              stargazers_count: totalStars,
            });
          }
        }
      } catch {
        // Use fallback values
      }
    }
    fetchStats();
  }, []);

  const stats = [
    {
      label: "Public Repos",
      value: githubStats?.public_repos ?? 2,
      suffix: "+",
      icon: FolderGit2,
    },
    {
      label: "GitHub Stars",
      value: githubStats?.stargazers_count ?? 2,
      suffix: "",
      icon: Star,
    },
    {
      label: "Technologies",
      value: 10,
      suffix: "+",
      icon: Code2,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold mb-4">
              About{" "}
              <span className="text-emerald-500">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 mx-auto rounded-full" />
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Left: Avatar & Info */}
          <ScrollAnimation
            direction="left"
            className="md:col-span-2 flex flex-col items-center md:items-start gap-6"
          >
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-full blur-sm opacity-60" />
              <Avatar className="relative size-48 sm:size-56 ring-4 ring-background">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback className="text-4xl font-bold bg-emerald-500 text-white">
                  H
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center md:text-left space-y-3">
              <h3 className="text-xl font-semibold">{profileData.name}</h3>
              <p className="text-muted-foreground text-sm">{profileData.company}</p>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm justify-center md:justify-start">
                <MapPin className="size-3.5" />
                {profileData.location}
              </div>
              <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              >
                <motion.span
                  className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Available for Freelance
              </Badge>
            </div>
          </ScrollAnimation>

          {/* Right: Bio & Stats */}
          <ScrollAnimation
            direction="right"
            className="md:col-span-3 space-y-8"
          >
            {/* Bio */}
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {profileData.bio}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-emerald-500/30 transition-colors group"
                >
                  <stat.icon className="size-5 text-emerald-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
