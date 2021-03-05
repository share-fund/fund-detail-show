import React from "react";
import { Row, Card, Col, Tag } from "antd";

import { Statistic, LatestPricePerShare, PercentageStatistic } from "../../components";

export const FundSummary = ({
  metrics,
  statistic,
  fundName,
  showAnnualReturn = false,
  isRunning = false,
}) => {
  const getAnnualReturn = (show) => {
    if (show && show !== "false") {
      return metrics.strategy && metrics.strategy.annual_return;
    }
    return "--";
  };
  const getIsRunning = (isRunning) => {
    console.log(isRunning);
    if (isRunning && isRunning !== "false") {
      return "运行中";
    }
    return "已结束";
  };
  return (
    <Col xs={24}>
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "20px" }}>{fundName}</span>
          </div>
        }
        extra={
          <>
            <Tag color="default">{getIsRunning(isRunning)}</Tag>
          </>
        }
      >
        <Row>
          <Col sm={5} xs={12}>
            <PercentageStatistic title="历史年化收益率" value={getAnnualReturn(showAnnualReturn)} />
          </Col>
          <Col sm={5} xs={12}>
            <PercentageStatistic title="成立以来收益率" value={statistic.pnl_rate} />
          </Col>
          <Col sm={5} xs={12}>
            <LatestPricePerShare timestamp={statistic.timestamp} pps={statistic.pps} />
          </Col>
          <Col sm={5} xs={12}>
            <PercentageStatistic title="昨日涨跌" value={statistic.last_day_pnl_rate} />
          </Col>
          <Col sm={4} xs={12}>
            <Statistic title="价值本位" value="USD" />
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
