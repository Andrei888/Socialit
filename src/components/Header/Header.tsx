// @ts-nocheck
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux
import { getUserDetails } from "@features/login/redux/selectors";

//components
import LogoutBtn from "../../features/login/LogoutBtn";
import logo from "../../images/updatedLogo.jpg";
import { Styled } from "./Header.styled";

const Header = () => {
  const user = useSelector(getUserDetails);
  return (
    <Styled.Header justify={"space-between"} align={"middle"}>
      <Styled.Container>
        <Row justify="space-between" align="middle">
          <Col span={2}>
            <Link className="header-link" to={"/"}>
              <img src={logo} className="social-logo" alt="logo" />
            </Link>
          </Col>
          <Col>
            <Row align="middle">
              <Col>
                <Link className="header-link" to="/profile">
                  Profile
                </Link>
              </Col>
              <Col>
                <Link className="header-link" to="/messages">
                  Messages
                </Link>
              </Col>
              <Col>
                <Link className="header-link" to="/friends">
                  Friends
                </Link>
              </Col>
              <Col>
                <Link className="header-link" to="/groups">
                  My Groups
                </Link>
              </Col>
              {user.isAdmin && (
                <>
                  <Col>
                    <Link className="header-link" to="/all-users">
                      All Users
                    </Link>
                  </Col>
                  <Col>
                    <Link className="header-link" to="/all-groups">
                      All Groups
                    </Link>
                  </Col>
                </>
              )}
              <Col>
                <LogoutBtn />
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled.Container>
    </Styled.Header>
  );
};

export default Header;
