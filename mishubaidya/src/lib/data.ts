import settingsData from '@/data/settings.json';
import homepageData from '@/data/homepage.json';
import pagesData from '@/data/pages.json';
import blogPostsData from '@/data/blog-posts.json';
import projectsData from '@/data/projects.json';

export type RichTextField = Array<{
  type: string;
  text: string;
}>;

export type ImageField = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
} | null;

export type LinkField = string | null;

export interface Settings {
  name: string;
  meta_title: string;
  meta_description: string;
  nav_item: Array<{
    label: string;
    link: string;
  }>;
  cta_label: string;
  cta_link: string;
  github_link?: string;
  twitter_link?: string;
  linkedin_link?: string;
}

export interface Page {
  uid: string;
  data: {
    meta_title: string;
    meta_description: string;
    slices: any[];
  };
}

export interface BlogPost {
  uid: string;
  tags: string[];
  data: {
    title: string;
    meta_description: string;
    date: string;
    image: ImageField;
    slices: any[];
  };
}

export interface Project {
  uid: string;
  tags: string[];
  data: {
    title: string;
    meta_description: string;
    date: string;
    image: ImageField;
    slices: any[];
  };
}

export interface Homepage {
  data: {
    meta_title: string;
    meta_description: string;
    slices: any[];
  };
}

// Data access functions
export function getSettings(): Settings {
  return settingsData as Settings;
}

export function getHomepage(): Homepage {
  return { data: homepageData } as Homepage;
}

export function getAllPages(): Page[] {
  return pagesData as Page[];
}

export function getPageByUid(uid: string): Page | null {
  const page = pagesData.find((p: any) => p.uid === uid);
  return page ? (page as Page) : null;
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData as BlogPost[];
}

export function getBlogPostByUid(uid: string): BlogPost | null {
  const post = blogPostsData.find((p: any) => p.uid === uid);
  return post ? (post as BlogPost) : null;
}

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectByUid(uid: string): Project | null {
  const project = projectsData.find((p: any) => p.uid === uid);
  return project ? (project as Project) : null;
}

// Helper function to check if a field is filled
export function isFilled(field: any): boolean {
  if (field === null || field === undefined) return false;
  if (typeof field === 'string') return field.length > 0;
  if (typeof field === 'object') {
    if ('url' in field) return !!field.url;
    return Object.keys(field).length > 0;
  }
  return true;
}

// Helper to get image src
export function asImageSrc(image: ImageField, params?: any): string | null {
  if (!image || !image.url) return null;
  return image.url;
}
