import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageByUid, getAllPages } from "@/lib/data";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import AboutSection from "@/components/sections/AboutSection";
import TechSection from "@/components/sections/TechSection";
import ExperienceSection from "@/components/sections/ExperienceSection";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const page = getPageByUid(params.uid);
  
  if (!page) {
    notFound();
  }

  // Special handling for About page
  if (params.uid === 'about' && page.data.avatar) {
    return (
      <>
        <AboutSection
          heading={page.data.heading}
          description={page.data.description}
          avatar={page.data.avatar}
          buttonText={page.data.button_text}
          buttonLink={page.data.button_link}
        />
        {page.data.technologies && (
          <TechSection
            title={page.data.technologies.title}
            items={page.data.technologies.items}
          />
        )}
        {page.data.experience && (
          <ExperienceSection
            heading={page.data.experience.heading}
            items={page.data.experience.items}
          />
        )}
      </>
    );
  }

  // Default page rendering for other pages (like Contact)
  return (
    <Bounded>
      <div className="max-w-4xl">
        <Heading as="h1" size="xl" className="mb-8">
          {page.data.title}
        </Heading>
        <div className="prose prose-lg prose-invert">
          {page.data.content && page.data.content.split('\n\n').map((paragraph: string, index: number) => (
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
