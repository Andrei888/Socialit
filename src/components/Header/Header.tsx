import { Row, Col } from "antd";

//components
import LogoutBtn from "../../features/login/LogoutBtn";
import logo from "../../images/logo.jpg";
import { Styled } from "./Header.styled";
const Header = () => {
  return (
    <Styled.Header justify={"space-between"} align={"middle"}>
      <Styled.Container>
        <Row justify="space-between" align="middle">
          <Col span={2}>
            <img src={logo} className="social-logo" alt="logo" />
          </Col>
          <Col>
            <LogoutBtn />
          </Col>
        </Row>
      </Styled.Container>
    </Styled.Header>
  );
};

export default Header;
