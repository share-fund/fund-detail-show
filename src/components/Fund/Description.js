import React from "react";
import { Col, Descriptions, Typography } from "antd";
import { FUNDS_DATA } from "../../components";

const { Title, Paragraph } = Typography;

export const FundDescription = ({ fundCode }) => {
  const fund = FUNDS_DATA[fundCode];

  return (
    <Typography>
      <Title level={5} className="title-p-t-10">
        基本信息
      </Title>
      <Col sm={16} xs={24}>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="项目名称">{fund.name}</Descriptions.Item>
          <Descriptions.Item label="项目代码">{fund.code}</Descriptions.Item>
          <Descriptions.Item label="策略类型">CTA</Descriptions.Item>
          <Descriptions.Item label="策略风格">{fund.style}</Descriptions.Item>
          <Descriptions.Item label="计价单位">USD</Descriptions.Item>
          <Descriptions.Item label="最低认购金额">100000 USD</Descriptions.Item>
          <Descriptions.Item label="运行时间">2020-01-01</Descriptions.Item>
          <Descriptions.Item label="最小募集金额">100000 USD</Descriptions.Item>
          <Descriptions.Item label="最大募集金额">
            10000000 USD
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Title level={5} className="title-p-t-10">
        策略描述
      </Title>
      <Paragraph>
        运用复合技术指标寻找当前市场趋势，根据信号进行方向性交易。根据趋势信号的强度进行仓位及风险敞口管理，无论牛市还是熊市都可有效降低Beta，捕获Alpha。
      </Paragraph>
      <Title level={5} className="title-p-t-10">
        风控参数
      </Title>
      <Paragraph>
        项目严格按照风控参数运作，其交易范围均被限制在 主流交易所 的
        主流交易品种。
      </Paragraph>
      <Col sm={16} xs={24}>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="最大总杠杆">
            {fund.leverage}
          </Descriptions.Item>
          <Descriptions.Item label="最大风险敞口">
            {fund.exposure}
          </Descriptions.Item>
          <Descriptions.Item label="平仓净值">
            {fund.liquidation}
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Title level={5} className="title-p-t-10">
        申赎规则
      </Title>
      <Paragraph>预约申购，预约赎回</Paragraph>
      <Title level={5} className="title-p-t-10">
        利润分配
      </Title>
      <Col sm={16} xs={24}>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="项目运作人">咨询</Descriptions.Item>
          <Descriptions.Item label="份额持有人">咨询</Descriptions.Item>
        </Descriptions>
      </Col>
      <Title level={5} className="title-p-t-10">
        收费标准
      </Title>
      <Col sm={16} xs={24}>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="认购费用">免费</Descriptions.Item>
          <Descriptions.Item label="赎回费用">免费</Descriptions.Item>
          <Descriptions.Item label="管理费用">1% (年化)</Descriptions.Item>
          <Descriptions.Item label="托管费用">1% (年化)</Descriptions.Item>
        </Descriptions>
      </Col>
      <Title level={5} className="title-p-t-10">
        免责声明
      </Title>
      <Paragraph>
        所有项目均为第三方量化团队作为项目运作人提供，项目运作人不保证项目回报，过往业绩及累计净值走势不预示未来业绩表现。
      </Paragraph>
      <Paragraph>
        用户应认真阅读《专业级用户声明》、《专业级用户承诺书》、风险承受能力测评结果及项目风控措施等内容，确认已知晓并理解项目和相关风险，具备相应风险承受能力。
      </Paragraph>
      <Paragraph>市场有风险，请谨慎决定是否参与。</Paragraph>
    </Typography>
  );
};
