import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { formatDate } from "@/utils/formatDate";

interface ContentBodyProps {
  page: {
    uid: string;
    tags: string[];
    data: {
      title: string;
      date: string;
      content: string;
    };
  };
}

export default function ContentBody({ page }: ContentBodyProps) {
  const formattedDate = formatDate(page.data.date);
  
  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="flex gap-4 text-yellow-400">
          {page.tags.map((tag: string, index: number) => (
            <span key={index} className="text-xl font-bold">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          {page.data.content.split('\n\n').map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Bounded>
  );
}
