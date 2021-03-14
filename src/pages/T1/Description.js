import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useParams } from "react-router-dom";

export const FundDescription = () => {
  const { id } = useParams();
  const [content, setContent] = useState("加载中...");
  useEffect(() => {
    fetch(`api/funds/${id}/description.md`)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setContent(text);
      });
  }, []);

  return (
    <Typography>
      <ReactMarkdown plugins={[gfm]} children={content} />
    </Typography>
  );
};
