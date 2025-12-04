import { Metadata } from "next";
import { SliceZone } from "@/components/SliceZone";
import { getHomepage } from "@/lib/data";
import { components } from "@/slices";

export default async function Page() {
  const page = getHomepage();

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = getHomepage();

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
