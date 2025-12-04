import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectByUid, getAllProjects } from "@/lib/data";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { formatDate } from "@/utils/formatDate";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const project = getProjectByUid(params.uid);
  
  if (!project) {
    notFound();
  }

  const formattedDate = formatDate(project.data.date);

  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{project.data.title}</Heading>
        <div className="flex gap-4 text-yellow-400">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xl font-bold">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          {project.data.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Bounded>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const project = getProjectByUid(params.uid);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.data.title,
    description: project.data.meta_description,
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map((project) => {
    return { uid: project.uid };
  });
}
