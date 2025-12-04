import { RichText } from "@/components/RichText";

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: { slice: any }): JSX.Element => {
  return (
    <div className="max-w-prose">
      <RichText field={slice.primary.text} />
    </div>
  );
};

export default TextBlock;
