// components/work-detail/types.ts

export interface WorkDetail {
  slug: string;
  title: string;
  tag: string;
  year: string;
  role: string;
  overview: string;
  problem: string;
  solution: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  images: string[];
}

export interface FeaturedWork {
  index: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
  href: string;
  image: string;
}