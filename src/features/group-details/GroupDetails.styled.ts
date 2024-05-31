import styled from "styled-components";

import { Row, Col, Typography } from "antd";

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
  h1.ant-typography {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

const UsersBlock = styled.div`
  padding: 10px;
  border: 2px solid rgba(14, 166, 181, 1);
  border-radius: 5px;
`;

export const Styled = {
  Wrapper,
  Row: FormRow,
  Col: FormCol,
  UsersBlock,
};
