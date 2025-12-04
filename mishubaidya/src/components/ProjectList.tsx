"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  uid: string;
  tags: string[];
  data: {
    title: string;
    image?: {
      url: string;
      alt: string;
    };
  };
}

interface ProjectListProps {
  items: Project[];
  viewMoreText: string;
}

export default function ProjectList({ items, viewMoreText }: ProjectListProps) {
  const component = useRef(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const revealRef = useRef(null);
  const [currentItem, setCurrentItem] = useState<null | number>(null);
  const [hovering, setHovering] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "elastic.out(1,0.3)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          },
        );
      });
      return () => ctx.revert();
    }, component);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      let ctx = gsap.context(() => {
        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: "back.out(2)",
            duration: 1.3,
          });
          gsap.to(revealRef.current, {
            opacity: hovering ? 1 : 0,
            visibility: "visible",
            ease: "power3.out",
            duration: 0.4,
          });
        }
        lastMousePos.current = mousePos;
        return () => ctx.revert();
      }, component);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hovering, currentItem]);

  const contentImages = items.map((item) => item.data.image?.url || "");

  useEffect(() => {
    contentImages.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  }, [contentImages]);

  return (
    <ul
      ref={component}
      className="grid border-b border-b-slate-100"
      onMouseLeave={() => {
        setHovering(false);
        setCurrentItem(null);
      }}
    >
      {items.map((project, index) => (
        <li
          key={index}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          onMouseEnter={() => {
            setCurrentItem(index);
            setHovering(true);
          }}
          className="list-item opacity-0"
        >
          <a
            href={`/project/${project.uid}`}
            className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
            aria-label={project.data.title}
          >
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{project.data.title}</span>
              <div className="flex gap-3 text-yellow-400">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="text-lg font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
              {viewMoreText} <MdArrowOutward />
            </span>
          </a>
        </li>
      ))}

      <div
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage:
            currentItem !== null ? `url(${contentImages[currentItem]})` : "",
        }}
        ref={revealRef}
      ></div>
    </ul>
  );
}
