import React from "react";
import { Row, Col, Typography } from "antd";

//components
import logo from "../../images/logo.jpg";

const { Text, Link } = Typography;

const Footer: React.FC = () => {
  return (
    <Row justify={"space-between"} align={"middle"}>
      {/* <Col>
        <img src={logo} className="App-logo" alt="logo" />
      </Col>
      <Col>
        <Link href="#n">Test link</Link>
      </Col>
      <Col>
        <Link href="#n">Test link</Link>
      </Col>
      <Col>
        <Link href="#n">Test link</Link>
      </Col>
      <Col>
        <Link href="#n">Test link</Link>
      </Col> */}
    </Row>
  );
};

export default Footer;
