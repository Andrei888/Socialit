import styled from "styled-components";

import { Row, Col } from "antd";

const Wrapper = styled.section`
  padding: 0 4em;
  background: rgb(3, 92, 242);
  background: linear-gradient(
    0deg,
    rgba(3, 92, 242, 1) 0%,
    rgba(14, 166, 181, 1) 100%,
    rgba(255, 0, 26, 0) 100%
  );
  width: 100%;
  height: 100vh;
`;

const TabHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const LoginBox = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 20px 10px;
  background: #fff;
  border: 2px solid #035cf2;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .ant-form-item {
    width: 100%;
  }
`;

const FormRow = styled(Row)``;
const FormCol = styled(Col)`
  padding: 0 10px;
`;

const LogOutBox = styled.div`
  padding: 20px;
  text-align: center;
`;
export const Styled = {
  Wrapper,
  TabHeader,
  LoginBox,
  FormRow,
  FormCol,
  LogOutBox,
};
