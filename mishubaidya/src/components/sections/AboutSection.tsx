import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";

interface AboutSectionProps {
  heading: string;
  description: string;
  avatar: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  buttonText: string;
  buttonLink: string;
}

export default function AboutSection({
  heading,
  description,
  avatar,
  buttonText,
  buttonLink,
}: AboutSectionProps) {
  return (
    <Bounded>
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading size="xl" className="col-start-1">
          {heading}
        </Heading>

        <div className="prose prose-xl prose-slate prose-invert col-start-1">
          {description.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        <Button linkField={buttonLink} label={buttonText} />

        <Avatar
          image={avatar}
          className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        />
      </div>
    </Bounded>
  );
}
