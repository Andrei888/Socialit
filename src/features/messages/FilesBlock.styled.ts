import styled from "styled-components";

import { Row, Col } from "antd";

const Wrapper = styled(Row)`
  width: 100%;
`;

const CustomCol = styled(Col)`
  padding-bottom: 20px;
  text-align: center;
`;

const ImageBlock = styled.div`
  width: 100;
  max-width: 150px;
  min-height: 170px;
  background-size: contain;
  margin: 0 auto;
  background-color: rgba(24, 106, 182, 0.3);
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 10px;
  box-shadow: rgba(24, 106, 182, 0.5) 0 0 20px;
`;

export const Styled = {
  Wrapper,
  CustomCol,
  ImageBlock,
};
