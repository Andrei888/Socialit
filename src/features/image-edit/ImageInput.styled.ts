import styled from "styled-components";

import { Row, Col } from "antd";

const ImageWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  width: 140px;
  height: 140px;
  border: 1px solid grey;
  margin-bottom: 15px;
`;

const ImageInputWrapper = styled.div`
  margin-bottom: 15px;
`;

export const Styled = {
  ImageWrapper,
  ImageInputWrapper,
};
