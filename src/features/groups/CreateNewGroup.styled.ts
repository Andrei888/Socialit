import styled from "styled-components";

import { Row, Col, Typography } from "antd";

const { Title } = Typography;

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
  margin-bottom: 0 !important;
  .ant-row {
    margin: 0;
  }
`;
const FormCol = styled(Col)`
  margin-bottom: 0 !important;
  .ant-typography {
    margin: 0;
  }
`;

const CustomTitle = styled(Title)`
  &.ant-typography {
    color: rgba(14, 166, 181, 1);
    font-size: 16px;
  }
`;

export const Styled = {
  Wrapper,
  FormRow,
  FormCol,
  Title: CustomTitle,
};
