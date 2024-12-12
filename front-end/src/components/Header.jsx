import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { UserContext } from "./contexts/User";
import { deleteLogout } from "../api";
import { Link, useNavigate } from "react-router";

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
      <Navbar key="md" expand="md" className="bg-blur mb-3" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/home">
            Went<span className="purple-text">Event</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                WentEvent
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link to="/events" style={{ textDecoration: "none" }}>
                  <Nav.Link as="a">Events</Nav.Link>
                </Link>
                <Nav.Link>My Profile</Nav.Link>
                {user.role === "staff" ? (
                  <Link to="/staff" style={{ textDecoration: "none" }}>
                    <Nav.Link as="a">Staff</Nav.Link>
                  </Link>
                ) : (
                  <></>
                )}
                <Nav.Link onClick={handleLogoutUser}>Log out</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
