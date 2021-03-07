import React, { useEffect, useState, useMemo } from "react";
import { Layout, Row, Card, Col, Tabs, Radio } from "antd";
import axios from "axios";
import styled from "styled-components";
import {
  FundDescription,
  FundOverviewChart,
  FundHistoryRecords,
  FundHistoryPPS,
  FundIndicators,
  FundSummary,
} from "../../components";
import { useLocation } from "react-router-dom";
import qs from "qs";

const { Content } = Layout;
const { TabPane } = Tabs;
const urlPrefix = process.env.REACT_APP_RAW_PREFIX;

export const T1Component = ({ className, data }) => {
  const [fundData, setFundData] = useState([]);
  const [statistic, setStatistic] = useState({});
  const [metrics, setMetrics] = useState({});
  const [dateRange, setDateRange] = useState("all");
  const { search } = useLocation();
  const { code, manager } = qs.parse(search.replace("?", ""));
  const fund = data[manager]?.funds ? data[manager].funds.find((x) => x.code === code) : {};
  fund.manager = manager;
  const { showAnnualReturn, status } = fund;

  useEffect(() => {
    const fetchCharts = async () => {
      const [{ data: all }, { data: statisticData }, { data: metricsData }] = await Promise.all([
        axios.get(`${urlPrefix}/${manager}/${code}/all.json`),
        axios.get(`${urlPrefix}/${manager}/${code}/statistic.json`),
        axios.get(`${urlPrefix}/${manager}/${code}/metrics.json`),
      ]);
      setMetrics(metricsData);
      setFundData(all);
      setStatistic(statisticData);
    };

    fetchCharts();
  }, [code, manager]);

  const pickDate = (e) => {
    setDateRange(e.target.value);
  };

  return (
    <Layout className={className}>
      <Content>
        <Row className="content" gutter={24}>
          <FundSummary
            fundName={fund.name}
            metrics={metrics}
            statistic={statistic}
            showAnnualReturn={showAnnualReturn}
            status={status}
          />
        </Row>
        <Row className="content" gutter={24}>
          <Col sm={15} xs={24}>
            <Card title="业绩走势">
              <Row>
                <Col
                  xs={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {useMemo(
                    () => (
                      <FundOverviewChart
                        fundManager={manager}
                        fundCode={code}
                        dateRange={dateRange}
                      />
                    ),
                    [code, dateRange, manager]
                  )}
                  <Radio.Group
                    defaultValue="all"
                    buttonStyle="solid"
                    onChange={pickDate}
                    style={{ marginTop: "10px" }}
                  >
                    <Radio.Button value="1m">近1月</Radio.Button>
                    <Radio.Button value="3m">近3月</Radio.Button>
                    <Radio.Button value="6m">近6月</Radio.Button>
                    <Radio.Button value="12m">近1年</Radio.Button>
                    <Radio.Button value="all">所有</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={9} xs={24}>
            <Card title="统计指标">
              <FundIndicators metrics={metrics} />
            </Card>
          </Col>
        </Row>
        <Row className="content" gutter={24}>
          <Col sm={15} xs={24}>
            <Card className="p-t-0">
              <Tabs defaultActiveKey="1" style={{ background: "#fff" }} size="large">
                <TabPane tab="项目简介" key="1">
                  <FundDescription fund={fund} />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col sm={9} xs={24}>
            <Card className="p-t-0">
              <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="历史业绩" key="1">
                  <FundHistoryRecords statistic={statistic} />
                </TabPane>
                <TabPane tab="历史净值" key="2">
                  <FundHistoryPPS data={fundData} />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export const T1 = styled(T1Component)`
  .p-24 {
    padding: 24px;
  }
  .m-t-24 {
    margin-top: 24px;
  }
  .m-b-24 {
    margin-bottom: 24px;
  }
  .p-t-0 {
    padding-top: 0;
    .ant-card-body {
      padding-top: 0;
    }
  }
  .content {
    padding-top: 24px;
    max-width: 1200px;
    margin: 0 auto !important;
  }
  .title-p-t-10 {
    padding-top: 20px;
  }
`;
