import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { UserContext } from "./contexts/User";

export default function Header() {
  const { user } = useContext(UserContext);
  return !user ? (
    <></>
  ) : (
    <>
      <Navbar
        key="md"
        expand="md"
        className="bg-body-tertiary mb-3"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand href="/home">WentEvent</Navbar.Brand>
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
                {["Home", "My Profile", "Log out"].map((navTitle, index) => (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-${navTitle}`}>
                        Go to <strong>{navTitle}</strong>.
                      </Tooltip>
                    }
                    key={index}
                  >
                    <Nav.Link>{navTitle}</Nav.Link>
                  </OverlayTrigger>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
