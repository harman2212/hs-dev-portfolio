"use client";

import { ScrollAnimation, ScrollItem } from "./ScrollAnimation";
import {
  Code2,
  Server,
  Database,
  ShieldCheck,
  GitBranch,
  Globe,
  Palette,
  FileCode2,
  Box,
  Settings2,
  Cpu,
  Layers,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    description: "Building beautiful, responsive user interfaces",
    skills: [
      { name: "React", icon: Code2, color: "text-sky-400" },
      { name: "Next.js", icon: Globe, color: "text-white dark:text-neutral-200" },
      { name: "TypeScript", icon: FileCode2, color: "text-blue-400" },
      { name: "JavaScript", icon: Code2, color: "text-yellow-400" },
      { name: "HTML5", icon: FileCode2, color: "text-orange-500" },
      { name: "CSS3", icon: Palette, color: "text-blue-500" },
      { name: "Tailwind CSS", icon: Layers, color: "text-cyan-400" },
    ],
  },
  {
    title: "Backend",
    description: "Robust server-side architectures & APIs",
    skills: [
      { name: "Node.js", icon: Server, color: "text-green-500" },
      { name: "Next.js API", icon: Settings2, color: "text-white dark:text-neutral-200" },
      { name: "Prisma ORM", icon: Database, color: "text-indigo-400" },
    ],
  },
  {
    title: "Database & Auth",
    description: "Data persistence & security",
    skills: [
      { name: "SQLite", icon: Database, color: "text-blue-300" },
      { name: "PostgreSQL", icon: Database, color: "text-sky-500" },
      { name: "NextAuth.js", icon: ShieldCheck, color: "text-emerald-400" },
    ],
  },
  {
    title: "Tools & Other",
    description: "Development workflow & integrations",
    skills: [
      { name: "Git", icon: GitBranch, color: "text-orange-500" },
      { name: "GitHub", icon: Box, color: "text-neutral-300" },
      { name: "Vercel", icon: Globe, color: "text-white dark:text-neutral-200" },
      { name: "AI Integration", icon: Cpu, color: "text-emerald-400" },
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="py-20 sm:py-28 relative"
    >
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              My{" "}
              <span className="text-emerald-500">Skills</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I work with to build modern, full-stack web applications
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 mx-auto rounded-full mt-4" />
          </div>
        </ScrollAnimation>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <ScrollAnimation key={category.title} delay={catIndex * 0.1}>
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-emerald-500/20 transition-all duration-300 group">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-emerald-500 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.skills.map((skill) => (
                    <ScrollItem key={skill.name}>
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-background/50 border border-border/30 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-200 group/skill cursor-default">
                        <skill.icon
                          className={`size-4 ${skill.color} shrink-0 group-hover/skill:scale-110 transition-transform`}
                        />
                        <span className="text-sm font-medium truncate">
                          {skill.name}
                        </span>
                      </div>
                    </ScrollItem>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
