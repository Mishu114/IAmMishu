"use client";
import React, { useLayoutEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  name: string;
  color: string;
}

interface TechSectionProps {
  title: string;
  items: TechItem[];
}

export default function TechSection({ title, items }: TechSectionProps) {
  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: true,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        },
      );
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section className="wrapper overflow-hidden" ref={component}>
      <Bounded as="div">
        <Heading size="xl" className="mb-8" as="h2">
          {title}
        </Heading>
      </Bounded>

      {items.map((tech, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={tech.name}
        >
          {Array.from({ length: 15 }, (_, idx) => (
            <React.Fragment key={idx}>
              <span
                className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: idx === 7 && tech.color ? tech.color : "inherit",
                }}
              >
                {tech.name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
}
