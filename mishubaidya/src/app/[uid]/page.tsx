import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@/components/SliceZone";
import { getPageByUid, getAllPages } from "@/lib/data";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const page = getPageByUid(params.uid);
  
  if (!page) {
    notFound();
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const page = getPageByUid(params.uid);
  
  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const pages = getAllPages();

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
