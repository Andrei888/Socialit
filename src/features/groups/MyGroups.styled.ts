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

const FormRow = styled(Row)`
  border-bottom: 1px solid rgb(24, 106, 182);
  margin-right: 20px;
`;
const FormCol = styled(Col)`
  h1.ant-typography {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

export const Styled = {
  Wrapper,
  Row: FormRow,
  Col: FormCol,
};
