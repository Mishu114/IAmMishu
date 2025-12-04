import { MetadataRoute } from "next";
import { getAllPages, getAllProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = getAllPages();
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

  const projectsRoutes = projects.map((project) => ({
    url: siteRoot + "/project/" + project.uid,
    lastModified: new Date(project.data.date),
  }));

  const projectsPageRoute = {
    url: siteRoot + "/projects",
    lastModified: new Date(),
  };

  return [homepageRoute, projectsPageRoute, ...pagesRoutes, ...projectsRoutes];
}
