import React from "react";

export default function Preview({ image, setPreview }) {
  return (
    <div>
      {/* Backdrop */}
      <div
        className="absolute z-20 top-0 bottom-0 left-0 right-0 bg-black opacity-30"
        onClick={() => setPreview(false)}
      ></div>
      <div className="absolute z-30 w-[100vw] lg:w-[90vw] h-[90vh] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  flex justify-center items-center overflow-scroll">
        <img src={image.url} className="w-[100vw] object-contain" />
      </div>
    </div>
  );
}
