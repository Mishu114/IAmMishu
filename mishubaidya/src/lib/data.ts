import homepageData from '@/data/homepage.json';
import settingsData from '@/data/settings.json';
import pagesData from '@/data/pages.json';
import blogPostsData from '@/data/blog-posts.json';
import projectsData from '@/data/projects.json';

// Type definitions
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

// Simple data access functions
export function getSettings(): Settings {
  return settingsData as Settings;
}

export function getHomepage() {
  return homepageData;
}

export function getAllPages() {
  return pagesData;
}

export function getPageByUid(uid: string) {
  return pagesData.find((p: any) => p.uid === uid) || null;
}

export function getAllBlogPosts() {
  return blogPostsData;
}

export function getBlogPostByUid(uid: string) {
  return blogPostsData.find((p: any) => p.uid === uid) || null;
}

export function getAllProjects() {
  return projectsData;
}

export function getProjectByUid(uid: string) {
  return projectsData.find((p: any) => p.uid === uid) || null;
}

// Helper function to check if a field has content
export function isFilled(field: any): boolean {
  if (field === null || field === undefined) return false;
  if (typeof field === 'string') return field.length > 0;
  if (typeof field === 'object') {
    if ('url' in field) return !!field.url;
    return Object.keys(field).length > 0;
  }
  return true;
}
