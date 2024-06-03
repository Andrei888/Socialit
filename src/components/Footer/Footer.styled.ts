import styled from "styled-components";

const Footer = styled.div`
  padding: 20px;
  width: 100%;
  background: rgb(24, 106, 182);

  .social-logo {
    max-width: 190px;
  }

  h1.ant-typography {
    color: #fff;
    font-size: 20px;
    margin-bottom: 25px;
  }
  a {
    color: #fff;
  }
  .copyright {
    text-align: center;
    color: #fff;
  }
`;
const Container = styled.div`
  width: 1020px;
  max-width: 100%;
  padding: 10px 20px;
  margin: 0 auto;
`;

export const Styled = {
  Footer,
  Container,
};
