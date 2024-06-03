import { FC } from "react";
import styled from "styled-components";

import LogoutBtn from "@app/features/login/LogoutBtn";

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
const InfoBox = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 40px 40px;
  background: #fff;
  border: 2px solid #035cf2;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DisabledPage: FC = () => {
  return (
    <Wrapper>
      <InfoBox>
        User is Disabled, please email us for more informations:{" "}
        <a href="mailto:socialit@gmail.com">Email Admin</a>
        <br />
        <br />
        <LogoutBtn />
      </InfoBox>
    </Wrapper>
  );
};

export default DisabledPage;
