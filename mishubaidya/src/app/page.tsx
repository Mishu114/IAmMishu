import { Metadata } from "next";
import { getHomepage } from "@/lib/data";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TechSection from "@/components/sections/TechSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default async function Page() {
  const homepage = getHomepage();

  return (
    <>
      <HeroSection
        firstName={homepage.hero.first_name}
        lastName={homepage.hero.last_name}
        tagLine={homepage.hero.tag_line}
      />
      <AboutSection
        heading={homepage.about.heading}
        description={homepage.about.description}
        avatar={homepage.about.avatar}
        buttonText={homepage.about.button_text}
        buttonLink={homepage.about.button_link}
      />
      <TechSection
        title={homepage.technologies.title}
        items={homepage.technologies.items}
      />
      <ExperienceSection
        heading={homepage.experience.heading}
        items={homepage.experience.items}
      />
      <ProjectsSection
        heading={homepage.projects.heading}
        description={homepage.projects.description}
        viewMoreText={homepage.projects.view_more_text}
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
