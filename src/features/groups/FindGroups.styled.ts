import styled from "styled-components";

import { Row, Col, Typography } from "antd";

const Wrapper = styled.section`
  padding: 4em 0 12em 0;
  h1.ant-typography {
    font-size: 13px;
    margin-bottom: 15px;
    color: rgb(24, 106, 182);
  }
  .ant-typography {
    margin: 0;
  }
`;

const FormRow = styled(Row)`
  padding: 10px 0;
  margin-bottom: 0 !important;
  border-bottom: 1px solid red;
`;
const FormCol = styled(Col)`
  h1.ant-typography {
    font-size: 16px;
    margin-bottom: 0px;
  }
`;

const Message = styled.div`
  padding: 10px 0;
  font-size: 14px;
  font-weight: 700;
`;

export const Styled = {
  Wrapper,
  Row: FormRow,
  Col: FormCol,
  Message,
};
