import React from "react";

export const Banner = ({ url }: { url: string }) => {
  return (
    <div
      style={{
        height: "300px",
        backgroundColor: "#000",
        background: `url(${url}) center center / cover`,
      }}
    ></div>
  );
};
