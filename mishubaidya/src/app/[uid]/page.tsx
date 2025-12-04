import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageByUid, getAllPages } from "@/lib/data";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const page = getPageByUid(params.uid);
  
  if (!page) {
    notFound();
  }

  return (
    <Bounded>
      <div className="max-w-4xl">
        <Heading as="h1" size="xl" className="mb-8">
          {page.data.title}
        </Heading>
        <div className="prose prose-lg prose-invert">
          {page.data.content.split('\n\n').map((paragraph: string, index: number) => (
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
