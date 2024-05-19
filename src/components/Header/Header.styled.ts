import styled from "styled-components";

import { Row, Col } from "antd";

const Header = styled(Row)`
  background: rgba(14, 166, 181, 1);

  .social-logo {
    max-width: 60px;
  }
`;
const Container = styled.div`
  width: 1200px;
  max-width: 100%;
  padding: 10px 20px;
  margin: 0 auto;
`;

export const Styled = {
  Header,
  Container,
};
