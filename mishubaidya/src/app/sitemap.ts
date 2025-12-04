import { MetadataRoute } from "next";
import { getAllPages, getAllBlogPosts, getAllProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = getAllPages();
  const blogPosts = getAllBlogPosts();
  const projects = getAllProjects();

  const siteRoot = "https://demo.com";

  const homepageRoute = {
    url: siteRoot,
    lastModified: new Date(),
  };

  const pagesRoutes = pages.map((page) => ({
    url: siteRoot + "/" + page.uid,
    lastModified: new Date(),
  }));

  const blogPostsRoutes = blogPosts.map((post) => ({
    url: siteRoot + "/blog/" + post.uid,
    lastModified: new Date(post.data.date),
  }));

  const projectsRoutes = projects.map((project) => ({
    url: siteRoot + "/project/" + project.uid,
    lastModified: new Date(project.data.date),
  }));

  return [homepageRoute, ...pagesRoutes, ...blogPostsRoutes, ...projectsRoutes];
}
