import styled from "styled-components";

import { Row, Col } from "antd";

const Footer = styled.div`
  max-height: 160px;
  padding: 20px;
  width: 100%;
  background: rgb(52, 113, 235);

  .social-logo {
    max-width: 80px;
  }

  a {
    color: #fff;
  }
  .copyright {
    text-align: center;
    color: #fff;
  }
`;
const Container = styled.div`
  width: 1200px;
  max-width: 100%;
  padding: 10px 20px;
  margin: 0 auto;
`;

export const Styled = {
  Footer,
  Container,
};
