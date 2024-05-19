import { Row, Col, Button } from "antd";

//components
import Login from "../../features/login/GoogleLogin";
import logo from "../../images/logo.jpg";
const Header = () => {
  return (
    <Row justify={"space-between"} align={"middle"}>
      <Col>
        <img src={logo} className="App-logo" alt="logo" />
      </Col>
      <Col>
        <Login />
      </Col>
    </Row>
  );
};

export default Header;
