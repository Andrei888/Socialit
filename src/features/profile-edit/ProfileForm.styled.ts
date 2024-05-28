import styled from "styled-components";

import { Row, Col } from "antd";

const Wrapper = styled.section`
  padding: 1em 0 4em 0;
  h1.ant-typography {
    font-size: 13px;
    margin-bottom: 15px;
  }
  .ant-typography {
    margin: 0;
  }
`;

const FormRow = styled(Row)`
  padding-right: 20px;
  label.label-wrap {
    margin: 0 20px 0 0;
  }
  textarea.ant-input {
    resize: none;
    min-height: 115px;
  }
`;
const FormCol = styled(Col)`
  .ant-typography {
    margin: 0;
  }
  textarea.ant-input {
    resize: none;
  }
`;

export const Styled = {
  Wrapper,
  FormRow,
  FormCol,
};
