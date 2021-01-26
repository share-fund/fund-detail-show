import React from "react";
import { LineChart } from "../../components";
import useOverviewData from "hooks/useOverviewData";
import { getNumberFormat, getNumberWithDecimal, formatDate } from "../../utils";

export const FundOverviewChart = ({ fundManager, fundCode, chartColor, height = 240, dateRange = "all" }) => {
  const { income, handleIncome, isLoading } = useOverviewData({ fundManager, fundCode, dateRange });

  const tooltipFormatter = (params) => {
    const date = new Date(params[0].data[0]);
    const dateFormat = formatDate(date);
    const fundData = params.find((x) => x.seriesIndex === 0);
    const btcData = params.find((x) => x.seriesIndex === 1);
    var returnHtmT1 = fundData ? `${getNumberWithDecimal(fundData.data[1], 2)}%` : "--";
    var returnHtmlBTC = btcData ? `${getNumberWithDecimal(btcData.data[1], 2)}%` : "--";
    return `<span>${dateFormat}</span><br/><span>本策略：${returnHtmT1}</span> <br/> <span>BTCUSD: ${returnHtmlBTC}</span>`;
  };

  const legendFormatter = (name) => {
    const value = name === "本策略" ? income : handleIncome;
    return value.length === 0
      ? `${name} +0.00%`
      : `${name} ${getNumberFormat(getNumberWithDecimal(value[value.length - 1][1], 2))}%`;
  };

  const option = {
    title: {
      text: "业绩走势",
      textStyle: {
        color: "rgba(0, 0, 0, 0.45)",
        fontSize: "14px",
      },
    },
    animation: true,
    tooltip: {
      trigger: "axis",
      formatter: tooltipFormatter,
    },
    legend: {
      data: [
        {
          name: "本策略",
        },
        {
          name: "BTCUSD",
        },
      ],
      formatter: legendFormatter,
      right: 0,
      top: 3,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "time",
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#888",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: true,
        formatter: "{value}%",
      },
      splitLine: {
        show: true,
      },
      splitNumber: 3,
      axisLine: {
        lineStyle: {
          color: "#888",
        },
      },
    },
    series: [
      {
        name: "本策略",
        type: "line",
        data: income,
        showSymbol: false,
        hoverAnimation: true,
        itemStyle: {
          color: chartColor,
        },
      },
      {
        name: "BTCUSD",
        type: "line",
        data: handleIncome,
        itemStyle: {
          color: "rgba(0,0,0,.4)",
        },
        showSymbol: false,
        hoverAnimation: true,
      },
    ],
  };

  return <LineChart option={option} showLoading={isLoading} height={height} />;
};
