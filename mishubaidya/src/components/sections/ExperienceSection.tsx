import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

interface ExperienceItem {
  title: string;
  time_period: string;
  institution: string;
  description: string;
}

interface ExperienceSectionProps {
  heading: string;
  items: ExperienceItem[];
}

export default function ExperienceSection({ heading, items }: ExperienceSectionProps) {
  return (
    <Bounded>
      <Heading as="h2" size="lg">
        {heading}
      </Heading>
      {items.map((item, index) => (
        <div key={index} className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
          <Heading as="h3" size="sm">
            {item.title}
          </Heading>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
            <span>{item.time_period}</span>{" "}
            <span className="text-3xl font-extralight">/</span>{" "}
            <span>{item.institution}</span>
          </div>
          <div className="prose prose-lg prose-invert mt-4">
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </Bounded>
  );
}
