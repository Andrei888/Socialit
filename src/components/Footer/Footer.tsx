import React from "react";
import { Row, Col, Typography } from "antd";

//components
import logo from "../../images/logo.jpg";
import { Styled } from "./Footer.styled";

const { Title, Text, Link } = Typography;

const Footer: React.FC = () => {
  return (
    <Styled.Footer>
      <Styled.Container>
        <Row justify={"space-between"}>
          <Col>
            <img src={logo} className="social-logo" alt="logo" />
          </Col>
          <Col>
            <Title>About</Title>
            <Link href="/about-us">About Us</Link>
          </Col>
          <Col>
            <Title>Discover</Title>
            <Link href="#n">Facebook</Link>
            <Link href="#n">Instagram</Link>
          </Col>
          <Col>
            <Title>Community</Title>
            <Link href="#n">Test link</Link>
          </Col>
          <Col>
            <Title>Help </Title>
            <Link href="#n">Test link</Link>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="copyright">
              <span>
                © Social IT - Andrei Purcaru 2024 / All rights reserved.{" "}
              </span>
            </div>
          </Col>
        </Row>
      </Styled.Container>
    </Styled.Footer>
  );
};

export default Footer;
