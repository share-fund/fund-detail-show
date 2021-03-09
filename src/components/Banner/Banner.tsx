import React from "react";

export const Banner = ({ url }: { url: string }) => {
  const background = url ? `url(${url}) center center / cover` : "#000";
  return (
    <div
      style={{
        height: "300px",
        background,
      }}
    ></div>
  );
};
