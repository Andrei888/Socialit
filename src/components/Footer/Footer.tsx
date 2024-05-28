import React from "react";
import { Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

//components
import logo from "../../images/updatedLogo.jpg";
import { Styled } from "./Footer.styled";

const { Title, Text, Link: ExternalLink } = Typography;

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
            <Link to="/about-us">About Us</Link>
          </Col>
          <Col>
            <Title>Discover Us</Title>
            <Row>
              <ExternalLink href="#facebook">Facebook</ExternalLink>
            </Row>
            <Row>
              <ExternalLink href="#instagram">Instagram</ExternalLink>
            </Row>
          </Col>
          <Col>
            <Title>Community</Title>
            <ExternalLink href="#n">Test link</ExternalLink>
          </Col>
          <Col>
            <Title>Help </Title>
            <Link to={"/test"}>Test link</Link>
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
