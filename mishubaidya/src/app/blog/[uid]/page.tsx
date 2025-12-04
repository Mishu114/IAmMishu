import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostByUid, getAllBlogPosts } from "@/lib/data";
import ContentBody from "@/components/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const page = getBlogPostByUid(params.uid);
  
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
  const page = getBlogPostByUid(params.uid);
  
  if (!page) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: page.data.title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const pages = getAllBlogPosts();

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
