import styled from "styled-components";

import { Row, Col } from "antd";

const Header = styled(Row)`
  background: rgb(24, 106, 182);

  .social-logo {
    max-width: 190px;
  }
`;
const Container = styled.div`
  width: 1020px;
  max-width: 100%;
  padding: 10px 20px;
  margin: 0 auto;
  a.header-link {
    color: #fff;
    font-weight: 700;
    :hover {
      color: #fff;
      text-shadow: 0 0 3px rgb(52, 113, 235);
    }
  }
  .ant-col {
    padding: 0 7px;
  }
`;

export const Styled = {
  Header,
  Container,
};
