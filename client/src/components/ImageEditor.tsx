import React, { useState, useEffect } from "react";

const ImageEditor = ({ imageUrl }) => {
  const [processedImageUrl, setProcessedImageUrl] = useState("");

  useEffect(() => {
    const processImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3003/images/process?src=${encodeURIComponent(
            imageUrl
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setProcessedImageUrl(url);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    };

    processImage();
  }, [imageUrl]);

  return (
    <div
      style={{
        width: "300px",
        height: "300px",
        backgroundImage: `url(${processedImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

export default ImageEditor;
