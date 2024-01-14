import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import { useUserInfo } from "../../globalstate/context";
import AlertPopup from "../alerts/alertPopup";
import drcLogo from "../../assets/images/drcLogo.png"

const NavbarComponent = () => {
  const [alert, setAlert] = useState(false);
  const userInfo = useUserInfo();
  const { pathname } = useLocation();
  const [userData, setUserData] = useState({});
  const logoutFunc = () => {
    window.location.reload();
  };
  useEffect(() => {
    if (Object.keys(userInfo).length > 0) setUserData(userInfo);
    else setUserData({});
  }, [userInfo]);
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand id="navBrand" style={{ marginTop: "-0.25rem" }}><img src={drcLogo} alt="" /></Navbar.Brand>
          <Navbar.Toggle id="toggleBtn" aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {pathname === "/" && (
                <>
                  <Nav.Link href="#services">Services</Nav.Link>
                  <Nav.Link href="#contactus">Contact us</Nav.Link>
                  {/* <NavDropdown
                    title="Getting started"
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="#jobseeker">
                      Job seeker
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#jobprovider">
                      Job provider
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </>
              )}
            </Nav>
            <Nav>
              {pathname !== "/" && (
                <Nav.Link as="div" tabIndex="-1">
                  <Link className="text-light text-decoration-none" to={"/"}>
                    Home
                  </Link>
                </Nav.Link>
              )}
              {userData?.isLoggedIn ? (
                <>
                  {pathname !== "/dashboard" && !userData?.isAdmin && (
                    <Nav.Link as="div" tabIndex="-1">
                      <Link
                        className="text-light text-decoration-none"
                        to={"/dashboard"}
                      >
                        Dashboard
                      </Link>
                    </Nav.Link>
                  )}
                  {pathname !== "/admindb" && userData?.isAdmin && (
                    <Nav.Link as="div" tabIndex="-1">
                      <Link
                        className="text-light text-decoration-none"
                        to={"/admindb"}
                      >
                        Dashboard
                      </Link>
                    </Nav.Link>
                  )}
                  <NavDropdown
                    title={
                      (
                        <span
                          tabIndex="-1"
                          className="text-info d-inline-block text-truncate"
                          style={{ fontWeight: "bolder", maxWidth: "10rem" }}
                        >
                          {userData?.name.toUpperCase()}
                        </span>
                      ) || "logged-in"
                    }
                    id="user-collasible-nav-dropdown"
                  >
                    <NavDropdown.Item disabled>Edit profile</NavDropdown.Item>
                    {!userData?.isAdmin && <NavDropdown.Item disabled>My requests</NavDropdown.Item>}
                    <NavDropdown.Item onClick={() => { setAlert("Are you sure you to logout ?") }}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  {pathname !== "/signup" && (
                    <Nav.Link as="div" tabIndex="-1">
                      <Link
                        className="text-light text-decoration-none"
                        to={"/signup"}
                      >
                        Sign-up
                      </Link>
                    </Nav.Link>
                  )}
                  {pathname !== "/login" && (
                    <Nav.Link as="div" tabIndex="-1">
                      <Link
                        className="text-light text-decoration-none"
                        to={"/login"}
                      >
                        Login
                      </Link>
                    </Nav.Link>
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {!!alert && (
        <AlertPopup
          show={!!alert}
          setShow={setAlert}
          closeButton={false}
          footerBtnOptions={{
            positiveBtnLabel: "Logout",
            positiveBtnAction: () => {
              logoutFunc();
            },
            negativeBtnAction: () => {
              setAlert(false);
            },
          }}
        >
          {alert}
        </AlertPopup>
      )}
    </>
  );
};

export default NavbarComponent;
