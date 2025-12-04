import Image from "next/image";

/**
 * Component for "Image" Slices.
 */
const ImageSlice = ({ slice }: { slice: any }): JSX.Element => {
  const image = slice.primary.image;
  
  if (!image || !image.url) return <></>;

  return (
    <Image
      src={image.url}
      alt={image.alt || ""}
      width={image.width || 1200}
      height={image.height || 800}
      className="not-prose w-full h-auto rounded-md my-10 md:my-14 lg:my-16"
    />
  );
};

export default ImageSlice;
