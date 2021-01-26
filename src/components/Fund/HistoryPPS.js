import React from "react";
import { Table } from "antd";

import { getNumberColor, getNumberFormat, getNumberWithDecimal, formatDate } from "../../utils";

export const FundHistoryPPS = ({ data }) => {
  const columnsT1 = [
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "净值",
      dataIndex: "value",
      key: "value",
      render: (text) => text,
    },
    {
      title: "日涨幅",
      dataIndex: "incomeRate",
      key: "incomeRate",
      render: (text) => {
        return (
          <span className={getNumberColor(text)}>
            {getNumberFormat(getNumberWithDecimal(text, 2))}%
          </span>
        );
      },
    },
  ];

  const dataSource = (data) => {
    if (data.length > 0) {
      const result = data.map((x) => {
        return {
          date: formatDate(x[0] * 1000),
          value: getNumberWithDecimal(x[1], 4),
          incomeRate: x[3] * 100,
          key: x[0],
        };
      });
      return result;
    } else {
      return [];
    }
  };

  return (
    <Table
      columns={columnsT1}
      dataSource={dataSource([...data].reverse())}
      pagination={{
        simple: true,
      }}
    />
  );
};
