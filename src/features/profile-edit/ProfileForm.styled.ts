import styled from "styled-components";

import { Row, Col } from "antd";

const Wrapper = styled.section`
  padding: 4em 0 12em 0;
  h1.ant-typography {
    font-size: 13px;
    margin-bottom: 15px;
  }
  .ant-typography {
    margin: 0;
  }
`;

const FormRow = styled(Row)``;
const FormCol = styled(Col)`
  .ant-typography {
    margin: 0;
  }
`;

export const Styled = {
  Wrapper,
  FormRow,
  FormCol,
};
