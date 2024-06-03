import styled from "styled-components";

import { Row, Col, Typography } from "antd";

const { Title } = Typography;

const Wrapper = styled.section`
  padding: 20px;
  border: 1px solid rgb(24, 106, 182);
  border-radius: 10px;
  margin-bottom: 20px;
  margin-right: 20px;

  h1.ant-typography {
  }
  .ant-typography {
    margin: 0;
  }
`;

const FormRow = styled(Row)`
  padding: 10px 0;
  margin-bottom: 0 !important;
  border-bottom: 1px solid rgb(24, 106, 182);
`;
const FormCol = styled(Col)`
  h1.ant-typography {
    font-size: 16px;
    margin-bottom: 0px;
  }
`;

const NewTitle = styled(Title)`
  &.ant-typography {
    font-size: 16px;
    font-weight: 700;
    color: rgb(24, 106, 182);
    margin-bottom: 10px;
  }
`;

export const Styled = {
  Wrapper,
  Row: FormRow,
  Col: FormCol,
  Title: NewTitle,
};
