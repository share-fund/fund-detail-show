import React, { useEffect, useState } from "react";
import { Row, Card, Col } from "antd";
import { Statistic, LatestPricePerShare, PercentageStatistic } from "../../components";
import { FundOverviewChart } from "./OverviewChart";

import axios from "axios";
import styled from "styled-components";

export const FundOverview = styled(
  ({ className, fundCode, fundName, fundType, fundStatus, fundColor, chartColor }) => {
    const [statistic, setStatistic] = useState({});
    const [metrics, setMetrics] = useState({});

    useEffect(() => {
      const urlPrefix = process.env.REACT_APP_RAW_PREFIX;

      const statisticUrl = `${urlPrefix}/${fundCode}/statistic.json`;
      const metricUrl = `${urlPrefix}/${fundCode}/metrics.json`;

      const fetchData = async () => {
        const [{ data: handleStatistic }, { data: handleMetrics }] = await Promise.all([
          axios.get(statisticUrl),
          axios.get(metricUrl),
        ]);

        setStatistic(handleStatistic);
        setMetrics(handleMetrics);
      };

      fetchData();
    }, [fundCode]);

    return (
      <Card
        className={className}
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "20px", fontWeight: 600 }}>{fundName}</span>
          </div>
        }
        extra={
          <a href={`#/${fundCode}`} className="blue">
            策略详情 &rsaquo;
          </a>
        }
      >
        <Row style={{ padding: "0 0 20px 0" }}>
          <Col sm={15} xs={24} className="card-left">
            <FundOverviewChart fundCode={fundCode} chartColor={chartColor} />
          </Col>
          <Col sm={9} xs={24} className="card-right">
            <Row style={{ width: "100%" }}>
              <Col xs={12}>
                <PercentageStatistic
                  title="历史年化收益率"
                  value={metrics.strategy && metrics.strategy.annual_return}
                />
              </Col>
              <Col xs={12}>
                <LatestPricePerShare timestamp={statistic.timestamp} pps={statistic.pps} />
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col xs={12}>
                <PercentageStatistic title="成立以来收益率" value={statistic.pnl_rate} />
              </Col>
              <Col xs={12}>
                <PercentageStatistic title="昨日涨跌" value={statistic.last_day_pnl_rate} />
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col xs={12}>
                <Statistic title="价值本位" value="USD" />
              </Col>
              <Col xs={12}>
                <Statistic title="策略类型" value={fundType} precision={0} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
)`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 0 auto !important;
  border: 1px solid #000;
  .card-left {
    padding: 0 20px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .card-right {
    padding: 0 0 0 30px;
    border-left: 1px solid #000;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  }
  .ant-card-head {
    border-bottom: 1px solid #000;
    background: #000;
    color: #fff;
  }
`;
