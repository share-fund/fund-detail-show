import React, { useState, useEffect } from "react";
import { Typography } from "antd";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const urlPrefix = "https://raw.githubusercontent.com/share-fund/fund-descriptions/main";

export const FundDescription = ({ fund }) => {
  const [content, setContent] = useState("加载中...");
  useEffect(() => {
    if (fund.manager && fund.code) {
      fetch(`${urlPrefix}/${fund.manager}/${fund.code}.md`)
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          setContent(text);
        });
    }
  }, [fund]);

  return (
    <Typography>
      <ReactMarkdown plugins={[gfm]} children={content} />
    </Typography>
  );
};
