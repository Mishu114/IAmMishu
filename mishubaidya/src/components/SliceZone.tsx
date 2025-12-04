import React from 'react';

export function SliceZone({ slices, components }: { slices: any[], components: any }) {
  if (!slices || slices.length === 0) return null;

  return (
    <>
      {slices.map((slice, index) => {
        const SliceComponent = components[slice.slice_type];
        if (!SliceComponent) {
          console.warn(`Component not found for slice type: ${slice.slice_type}`);
          return null;
        }
        return <SliceComponent key={index} slice={slice} />;
      })}
    </>
  );
}
