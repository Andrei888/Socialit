import styled from "styled-components";

import { Row, Col, Typography } from "antd";

const FormRow = styled(Row)``;
const FormCol = styled(Col)`
  h1.ant-typography {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

const ChatBlock = styled.div`
  padding: 10px;
  border: 2px solid rgba(14, 166, 181, 1);
  border-radius: 5px;
  .submit-btn {
    width: 100%;
  }
`;
const MsgBlock = styled.div`
  padding: 10px 10px 15px 10px;
  border-bottom: 1px solid rgba(14, 166, 181, 1);
  margin-bottom: 15px;

  .message {
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
    img {
      max-width: 100%;
      max-height: 100px;
    }
  }

  &.message-block-user {
    direction: rtl;

    .message:before {
      left: auto;
      right: 15px;
    }
  }
`;
const User = styled.div`
  margin-bottom: 10px;
`;
const Message = styled.div``;

export const Styled = {
  Row: FormRow,
  Col: FormCol,
  ChatBlock,
  User,
  Message,
  MsgBlock,
};
