import React from "react";

export const Header = ({ url }: { url: string }) => {
  return (
    <div style={{ background: "#0A1825", height: "56px", lineHeight: "56px" }}>
      {url && (
        <a href="/">
          <img style={{ height: "26px", padding: "0 16px" }} src={url} alt="logo" />
        </a>
      )}
    </div>
  );
};
