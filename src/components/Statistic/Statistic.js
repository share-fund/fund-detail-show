import React from "react";
import { Statistic as StatisticAntd } from "antd";
import { isNumberGreaterThanZero, formatDate } from "../../utils";

export const Statistic = ({
  title = "title",
  value = 0,
  percision = 2,
  isNormal = true,
  ...props
}) => {
  const getColor = (type, value) => {
    if (type || value === "--") {
      return "#000";
    }
    return value >= 0 ? "#389e0d" : "#cf1322";
  };
  return (
    <StatisticAntd
      title={title}
      value={value}
      precision={percision}
      valueStyle={{ color: getColor(isNormal, value), fontWeight: 600 }}
      prefix={!isNormal && isNumberGreaterThanZero(value) ? "+" : ""}
      {...props}
    />
  );
};

export const LatestPricePerShare = ({ timestamp, pps }) => {
  const dateString = timestamp ? formatDate(new Date(timestamp * 1000)) : "--";

  return (
    <Statistic title={`最新净值（${dateString}）`} value={pps || 0} precision={4} suffix="USD" />
  );
};

export const PercentageStatistic = ({ title, value }) => {
  let _value;
  if (value === "--") {
    _value = value;
  } else {
    _value = isNaN(value) ? 0 : value * 100;
  }
  return <Statistic title={title} value={_value} precision={2} suffix="%" isNormal={false} />;
};
