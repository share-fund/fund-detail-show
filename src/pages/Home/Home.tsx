import React from "react";
import { Table, Tag, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";

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
    return data[manager].funds.map((x: any) => {
      return {
        ...x,
        manager,
      };
    });
  };
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
      {list.map((x) => {
        return (
          <Row key={data[x].name} gutter={[24, 24]}>
            <Col xs={24}>
              <Card title={data[x].name}>
                <Table
                  rowKey="code"
                  columns={columns}
                  dataSource={formatData(data, x)}
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};
