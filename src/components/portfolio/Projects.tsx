"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollAnimation } from "./ScrollAnimation";

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Java: "bg-red-500",
  Python: "bg-green-500",
  Rust: "bg-orange-600",
  Go: "bg-cyan-500",
  Shell: "bg-emerald-500",
};

const FallbackRepos: GitHubRepo[] = [
  {
    name: "nexusai-chat",
    full_name: "harman2212/nexusai-chat",
    description:
      "AI-powered chat application built with Next.js 16, TypeScript, Prisma, and NextAuth",
    html_url: "https://github.com/harman2212/nexusai-chat",
    homepage: "https://nexusai-chat-self.vercel.app",
    language: "TypeScript",
    stargazers_count: 1,
    forks_count: 0,
    topics: ["aichatbot", "css", "java", "nextjs", "prisma", "typescript"],
    created_at: "2026-04-25T07:53:17Z",
    updated_at: "2026-04-25T08:39:13Z",
  },
  {
    name: "Bank-Management-System",
    full_name: "harman2212/Bank-Management-System",
    description: "Desktop application built with Java, HTML, and SQLite",
    html_url: "https://github.com/harman2212/Bank-Management-System",
    homepage: null,
    language: "HTML",
    stargazers_count: 1,
    forks_count: 0,
    topics: [],
    created_at: "2026-04-18T08:40:52Z",
    updated_at: "2026-04-23T07:30:31Z",
  },
];

function ProjectCard({
  repo,
  index,
}: {
  repo: GitHubRepo;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 group overflow-hidden h-full">
        <CardHeader className="pb-0">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 flex-1 min-w-0">
              <CardTitle className="text-lg group-hover:text-emerald-500 transition-colors truncate">
                {repo.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {repo.description || "No description available"}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {repo.topics.slice(0, 5).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                >
                  {topic}
                </Badge>
              ))}
              {repo.topics.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{repo.topics.length - 5}
                </Badge>
              )}
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    languageColors[repo.language] || "bg-gray-400"
                  }`}
                />
                {repo.language}
              </div>
            )}
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1">
                <Star className="size-3.5 text-yellow-500" />
                {repo.stargazers_count}
              </div>
            )}
            {repo.forks_count > 0 && (
              <div className="flex items-center gap-1">
                <GitFork className="size-3.5" />
                {repo.forks_count}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/50 text-xs"
              asChild
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-3.5" />
                View on GitHub
              </a>
            </Button>
            {repo.homepage && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                asChild
              >
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-3.5" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (data.repos && data.repos.length > 0) {
            setRepos(data.repos);
          } else {
            setRepos(FallbackRepos);
          }
        } else {
          setRepos(FallbackRepos);
        }
      } catch {
        setRepos(FallbackRepos);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 relative"
    >
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              My{" "}
              <span className="text-emerald-500">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects I&apos;ve built showcasing my skills in full-stack
              development and AI integration
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 mx-auto rounded-full mt-4" />
          </div>
        </ScrollAnimation>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="size-8 text-emerald-500 animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {repos.map((repo, index) => (
              <ProjectCard key={repo.name} repo={repo} index={index} />
            ))}
          </div>
        )}

        {/* View All */}
        <ScrollAnimation delay={0.4}>
          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/50"
              asChild
            >
              <a
                href="https://github.com/harman2212?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" />
                View All Repositories
              </a>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
