import { Metadata } from "next";
import { getHomepage } from "@/lib/data";
import HeroSection from "@/components/sections/HeroSection";

export default async function Page() {
  const homepage = getHomepage();

  return (
    <>
      <HeroSection
        firstName={homepage.hero.first_name}
        lastName={homepage.hero.last_name}
        tagLine={homepage.hero.tag_line}
      />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const homepage = getHomepage();

  return {
    title: homepage.meta_title,
    description: homepage.meta_description,
  };
}
