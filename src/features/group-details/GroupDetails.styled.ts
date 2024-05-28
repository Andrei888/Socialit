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
const ChatBlock = styled.div`
  padding: 10px;
  border: 2px solid rgba(14, 166, 181, 1);
  border-radius: 5px;
`;
const MsgBlock = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgba(14, 166, 181, 1);
`;
const User = styled.div`
  margin-bottom: 10px;
`;
const Message = styled.div`
  padding: 10px;
  border: 2px solid rgba(14, 166, 181, 1);
  border-radius: 5px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 15px;
    top: -7px;
    border-left: 2px solid rgba(14, 166, 181, 1);
    border-top: 2px solid rgba(14, 166, 181, 1);
    width: 10px;
    height: 10px;
    background: #fff;
    transform: rotate(45deg);
  }
`;

export const Styled = {
  Wrapper,
  Row: FormRow,
  Col: FormCol,
  ChatBlock,
  UsersBlock,
  User,
  Message,
  MsgBlock,
};
