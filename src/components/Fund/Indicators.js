import React from "react";

import { Descriptions } from "antd";

export const FundIndicators = ({ metrics }) => {
  return (
    <Descriptions bordered column={1} size="small" style={{ minHeight: "400px" }}>
      <Descriptions.Item label="日胜率">
        {(metrics.strategy && (metrics.strategy.daily_winning_ratio * 100).toFixed(2)) || "--"} %
      </Descriptions.Item>
      <Descriptions.Item label="年化波动率">
        {(metrics.strategy && (metrics.strategy.annual_volatility * 100).toFixed(2)) || "--"} %
      </Descriptions.Item>
      <Descriptions.Item label="Alpha">
        {(metrics.strategy && metrics.strategy.alpha.toFixed(2)) || "--"}
      </Descriptions.Item>
      <Descriptions.Item label="Beta">
        {(metrics.strategy && metrics.strategy.beta.toFixed(2)) || "--"}
      </Descriptions.Item>
      <Descriptions.Item label="夏普比率">
        {(metrics.strategy && metrics.strategy.sharpe_ratio.toFixed(2)) || "--"}
      </Descriptions.Item>
      <Descriptions.Item label="索提诺比率">
        {(metrics.strategy && metrics.strategy.sortino_ratio.toFixed(2)) || "--"}
      </Descriptions.Item>
      <Descriptions.Item label="最大回撤率">
        {(metrics.strategy && (metrics.strategy.max_drawdown * 100).toFixed(2)) || "--"} %
      </Descriptions.Item>
    </Descriptions>
  );
};
