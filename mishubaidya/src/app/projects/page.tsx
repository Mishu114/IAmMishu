import { Metadata } from "next";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import ProjectList from "@/components/ProjectList";
import { getAllProjects } from "@/lib/data";

export default async function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Bounded>
      <Heading size="xl" className="mb-8">
        Projects
      </Heading>
      <div className="prose prose-xl prose-invert mb-10">
        <p>Check out my recent work and side projects.</p>
      </div>
      <ProjectList items={projects} viewMoreText="View Project" />
    </Bounded>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects - Mishu Baidya",
    description: "Portfolio projects by Mishu Baidya - Creative developer specializing in modern web technologies",
  };
}
