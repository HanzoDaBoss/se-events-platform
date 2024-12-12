import { useContext } from "react";
import { Link, Navigate } from "react-router";
import { UserContext } from "./contexts/User";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function StaffDashboard() {
  const { user } = useContext(UserContext);

  return user.role === "staff" ? (
    <>
      <h1>Staff Dashboard</h1>
      <Row xs={1} md={2} lg={2} className="g-4 mt-2 mx-5 px-5">
        {[
          { name: "Events", url: "events" },
          { name: "Users", url: "users" },
        ].map((item, index) => (
          <Col key={index}>
            <Link to={`/admin/${item.url}`} style={{ textDecoration: "none" }}>
              <Card className="h-100 p-0 zoom">
                <Card.Img
                  variant="top"
                  src="https://placehold.co/600x400/000000/FFF"
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Manage {item.url} {">"}
                </Card.Footer>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
