import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectByUid, getAllProjects } from "@/lib/data";
import ContentBody from "@/components/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const page = getProjectByUid(params.uid);
  
  if (!page) {
    notFound();
  }

  return <ContentBody page={page} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const page = getProjectByUid(params.uid);
  
  if (!page) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: page.data.title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const pages = getAllProjects();

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
