import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import ProjectList from "@/components/ProjectList";
import { getAllProjects } from "@/lib/data";

interface ProjectsSectionProps {
  heading: string;
  description: string;
  viewMoreText: string;
}

export default function ProjectsSection({ heading, description, viewMoreText }: ProjectsSectionProps) {
  const projects = getAllProjects();

  return (
    <Bounded>
      <Heading size="xl" className="mb-8">
        {heading}
      </Heading>
      <div className="prose prose-xl prose-invert mb-10">
        <p>{description}</p>
      </div>
      <ProjectList items={projects} viewMoreText={viewMoreText} />
    </Bounded>
  );
}
