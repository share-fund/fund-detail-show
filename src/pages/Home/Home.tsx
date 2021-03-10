import React from "react";
import { Table, Tag, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

export const Home = ({ data }: any) => {
  const getStatus = (status: string) => {
    switch (status) {
      case "prepare":
        return "待启动";
      case "running":
        return "运行中";
      case "done":
        return "已结束";
      default:
        return "未知";
    }
  };
  const list = Object.keys(data);
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => {
        const { code, manager, status } = record;
        return status === "prepare" ? (
          text
        ) : (
          <Link to={`details?code=${code}&manager=${manager}`}>{text}</Link>
        );
      },
    },
    {
      title: "日期",
      dataIndex: "data",
      render: (data: any) => {
        return moment(+new Date(data.datetime)).format("YYYY-MM-DD");
      },
    },
    {
      title: `最新净值`,
      dataIndex: "data",
      render: (data: any) => {
        return data.pps;
      },
    },
    {
      title: "成立以来收益率",
      dataIndex: "data",
      render: (data: any) => {
        return (
          <span className={data.cum_pnl_rate >= 0 ? "green" : "red"}>
            {(data.cum_pnl_rate * 100).toFixed(2)} %
          </span>
        );
      },
    },
    {
      title: "昨日涨跌",
      dataIndex: "data",
      render: (data: any) => {
        return (
          <span className={data.daily_pnl_rate >= 0 ? "green" : "red"}>
            {(data.daily_pnl_rate * 100).toFixed(2)} %
          </span>
        );
      },
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (status: string) => {
        const color = status === "running" ? "green" : "default";
        return (
          <Tag color={color} key={status}>
            {getStatus(status)}
          </Tag>
        );
      },
    },
  ];
  const formatData = (data: any, manager: any) => {
    return data.map((x: any) => {
      return {
        ...x,
        manager,
      };
    });
  };
  return (
    <div style={{ maxWidth: "1200px", margin: "24px auto", width: "100%" }}>
      {list.map((x) => {
        return (
          <Row key={data[x].name} gutter={[24, 24]} style={{ margin: "24px auto" }}>
            <Col xs={24}>
              <Card title={data[x].name}>
                {data[x].funds.filter((x: any) => x.status === "prepare" || x.status === "running")
                  .length > 0 && (
                  <>
                    <Table
                      rowKey="code"
                      columns={columns}
                      dataSource={formatData(
                        data[x].funds.filter(
                          (x: any) => x.status === "prepare" || x.status === "running"
                        ),
                        x
                      )}
                      pagination={false}
                    />
                  </>
                )}
                {data[x].funds.filter((x: any) => x.status === "done").length > 0 && (
                  <>
                    <h3 style={{ marginTop: "48px" }}>往期项目</h3>
                    <Table
                      rowKey="code"
                      columns={columns}
                      dataSource={formatData(
                        data[x].funds.filter(
                          (x: any) => x.status === "done" || x.status === "done"
                        ),
                        x
                      )}
                      pagination={false}
                    />
                  </>
                )}
              </Card>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};
