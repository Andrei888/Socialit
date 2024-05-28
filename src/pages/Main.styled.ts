import styled from "styled-components";

const Main = styled.main`
  width: 100%;
  min-height: calc(100vh - 230px);
`;
const Container = styled.div`
  width: 1000px;
  max-width: 100%;
  padding: 10px 20px;
  margin: 0 auto;

  .ant-typography {
    display: block;
    margin-bottom: 15px;
  }
`;

export const Styled = {
  Container,
  Main,
};
