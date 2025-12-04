import React from 'react';

export type RichTextBlock = {
  type: string;
  text: string;
  spans?: any[];
};

export function RichText({ field }: { field: RichTextBlock[] | null | undefined }) {
  if (!field || field.length === 0) return null;

  return (
    <>
      {field.map((block, index) => {
        switch (block.type) {
          case 'heading1':
            return <h1 key={index}>{block.text}</h1>;
          case 'heading2':
            return <h2 key={index}>{block.text}</h2>;
          case 'heading3':
            return <h3 key={index}>{block.text}</h3>;
          case 'heading4':
            return <h4 key={index}>{block.text}</h4>;
          case 'heading5':
            return <h5 key={index}>{block.text}</h5>;
          case 'heading6':
            return <h6 key={index}>{block.text}</h6>;
          case 'paragraph':
            return <p key={index}>{block.text}</p>;
          case 'list-item':
            return <li key={index}>{block.text}</li>;
          default:
            return <p key={index}>{block.text}</p>;
        }
      })}
    </>
  );
}
