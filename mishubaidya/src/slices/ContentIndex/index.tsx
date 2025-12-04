import { getAllBlogPosts, getAllProjects, isFilled } from "@/lib/data";
import ContentList from "./ContentList";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { RichText } from "@/components/RichText";

/**
 * Component for "BlogPostIndex" Slices.
 */
const BlogPostIndex = async ({
  slice,
}: {
  slice: any;
}): Promise<JSX.Element> => {
  const blogPosts = getAllBlogPosts();
  const projects = getAllProjects();

  const items = slice.primary.content_type === "Blogs" ? blogPosts : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <RichText field={slice.primary.description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={slice.primary.content_type}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image}
      />
    </Bounded>
  );
};

export default BlogPostIndex;
