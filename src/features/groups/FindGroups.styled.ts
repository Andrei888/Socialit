import styled from "styled-components";

import { Row, Col, Typography } from "antd";

const Wrapper = styled.section`
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid rgb(24, 106, 182);
  border-radius: 10px;

  h1.ant-typography {
    font-size: 13px;
    margin-bottom: 15px;
    color: rgb(24, 106, 182);
  }
  .ant-typography {
    margin: 0;
  }

  .new-group-btn {
    padding: 4px 10px;
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    display: inline-block;
    line-height: 22px;

    &:hover {
      color: rgb(64, 169, 255);
      border-color: rgb(64, 169, 255);
    }
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
