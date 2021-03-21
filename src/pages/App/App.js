import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { T1 } from "../T1/T1";
import { Home } from "pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Header } from "components/Header/Header";
import { Banner } from "components/Banner/Banner";

const urlPrefix = process.env.REACT_APP_RAW_PREFIX;
const MANAGER = process.env.REACT_APP_MANAGER;

const App = () => {
  const [listData, setListData] = useState({});
  const formatData = (data) => {
    if (MANAGER === "default") {
      return data;
    } else {
      if (data[MANAGER]) {
        return {
          [MANAGER]: data[MANAGER],
        };
      }
      return {};
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const list = await axios.get(`${urlPrefix}/list.json`);
      setListData(formatData(list.data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (listData[MANAGER]) {
      const link = document.head.querySelector("link[rel=icon]");
      document.title = listData[MANAGER]?.name || "ShareFund 基金";
      link.href = listData[MANAGER]?.favicon;
    }
  }, [listData]);

  return (
    <Layout>
      <Header url={listData[MANAGER]?.logoUrl} />
      <Routes>
        <Route path="/" element={<Banner url={listData[MANAGER]?.bannerUrl} />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home data={listData} />} />
        <Route path="/details" element={<T1 data={listData} />} />
      </Routes>
    </Layout>
  );
};

export default App;
