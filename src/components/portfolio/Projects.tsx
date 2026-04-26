"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
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

function ProjectSkeleton() {
  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm h-full">
      <CardHeader className="pb-0">
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 w-16 bg-muted animate-pulse rounded-full" />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          <div className="h-4 w-12 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <div className="h-8 w-28 bg-muted animate-pulse rounded-md" />
          <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

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
          }
        }
      } catch {
        // Silently handle - shows empty state
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
      aria-labelledby="projects-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 id="projects-heading" className="text-3xl sm:text-4xl font-bold mb-4">
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
          <div className="grid md:grid-cols-2 gap-6">
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        ) : repos.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {repos.map((repo, index) => (
              <ProjectCard key={repo.name} repo={repo} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Projects are loading from GitHub. If this persists, check back later.
            </p>
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
