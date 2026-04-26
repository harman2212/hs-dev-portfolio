import { NextResponse } from "next/server";

const GITHUB_USERNAME = "harman2212";

// Repos to hide from the Projects section (portfolio website itself)
const HIDDEN_REPOS = ["hs-dev-portfolio"];

interface GitHubProfile {
  login: string;
  name: string | null;
  company: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  hireable: boolean | null;
  public_repos: number;
  followers: number;
  following: number;
}

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

async function fetchGitHubData() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "HS-Dev-Portfolio",
  };

  // Use token if available for higher rate limits
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 300 },
    }),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 300 },
      }
    ),
  ]);

  if (!profileRes.ok || !reposRes.ok) {
    console.error(
      `GitHub API error: profile=${profileRes.status}, repos=${reposRes.status}`
    );
    return null;
  }

  const profile: GitHubProfile = await profileRes.json();
  const repos: GitHubRepo[] = await reposRes.json();

  // Filter out the portfolio repo itself
  const filteredRepos = repos.filter(
    (repo) => !HIDDEN_REPOS.includes(repo.name)
  );

  return {
    profile,
    repos: filteredRepos,
  };
}

export async function GET() {
  try {
    const data = await fetchGitHubData();

    if (!data) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("GitHub API fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
