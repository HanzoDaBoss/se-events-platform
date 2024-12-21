import { useContext } from "react";
import { UserContext } from "./contexts/User";
import { deleteLogout } from "../api";
import { Link, useNavigate } from "react-router";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";

export default function Header() {
  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogoutUser = () => {
    return deleteLogout().then(() => {
      setUser();
      navigate("/login");
    });
  };

  return !user ? (
    <></>
  ) : (
    <>
      <Navbar collapseOnSelect expand="md" className="bg-blur mb-3" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/home">
            <Image
              className="d-inline-block align-top"
              width="200"
              src="images/header-logo.png"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            className="navbar-dark burger-icon"
            aria-controls={`offcanvasNavbar-expand-md`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                <Image
                  className="d-inline-block align-top"
                  width="200"
                  src="images/header-logo.png"
                />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link to="/events" style={{ textDecoration: "none" }}>
                  <Nav.Link href="/events" className="purple-header-text">
                    Events
                  </Nav.Link>
                </Link>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <Nav.Link
                    href="/profile"
                    as="li"
                    className="purple-header-text"
                  >
                    My Profile
                  </Nav.Link>
                </Link>
                {user.role === "staff" ? (
                  <Link to="/staff" style={{ textDecoration: "none" }}>
                    <Nav.Link
                      href="/staff"
                      as="li"
                      className="purple-header-text"
                    >
                      Staff
                    </Nav.Link>
                  </Link>
                ) : (
                  <></>
                )}
                <Nav.Link onClick={handleLogoutUser}>
                  <span className="purple-header-text">Log out</span>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
