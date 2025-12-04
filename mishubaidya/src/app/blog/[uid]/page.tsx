import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostByUid, getAllBlogPosts } from "@/lib/data";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { formatDate } from "@/utils/formatDate";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const post = getBlogPostByUid(params.uid);
  
  if (!post) {
    notFound();
  }

  const formattedDate = formatDate(post.data.date);

  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{post.data.title}</Heading>
        <div className="flex gap-4 text-yellow-400">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-xl font-bold">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          {post.data.content.split('\n\n').map((paragraph, index) => (
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
  const post = getBlogPostByUid(params.uid);
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.data.title,
    description: post.data.meta_description,
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();

  return posts.map((post) => {
    return { uid: post.uid };
  });
}
