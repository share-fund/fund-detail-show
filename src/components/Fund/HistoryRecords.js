import React from "react";

import { Descriptions } from "antd";

import { getNumberColor, getNumberFormat, getNumberWithDecimal } from "../../utils";

export const FundHistoryRecords = ({ statistic }) => {
  const numFormat = (item) => {
    return getNumberFormat(getNumberWithDecimal(item * 100 || 0, 2));
  };

  return (
    <Descriptions bordered column={1} size="small">
      <Descriptions.Item label="近1月">
        <span className={getNumberColor(statistic.last_1m_pnl_rate || 0)}>
          {numFormat(statistic.last_1m_pnl_rate)} %
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="近3月">
        <span className={getNumberColor(statistic.last_3m_pnl_rate || 0)}>
          {numFormat(statistic.last_3m_pnl_rate)} %
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="近6月">
        <span className={getNumberColor(statistic.last_6m_pnl_rate || 0)}>
          {numFormat(statistic.last_6m_pnl_rate)} %
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="近1年">
        <span className={getNumberColor(statistic.last_12m_pnl_rate || 0)}>
          {numFormat(statistic.last_12m_pnl_rate)} %
        </span>
      </Descriptions.Item>
    </Descriptions>
  );
};
