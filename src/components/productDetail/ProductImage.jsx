
import React from "react";
import ReactImageMagnify from "react-image-magnify";

const ProductImage = ({ mainImage }) => {
  return (
    <div style={{ width: "100%", position: "relative", zIndex: 3 }}>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Product Image",
            isFluidWidth: true,
            src: mainImage,
          },
          largeImage: {
            src: mainImage,
            width: 1000, // High resolution
            height: 1000,
          },
          enlargedImageContainerDimensions: {
            width: "150%",
            height: "150%",
          },
        }}
      />
    </div>
  );
};

export default ProductImage;

