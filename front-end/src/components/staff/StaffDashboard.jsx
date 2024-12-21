import { useContext } from "react";
import { Link, Navigate } from "react-router";
import { UserContext } from "../contexts/User";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function StaffDashboard() {
  const { user } = useContext(UserContext);

  return !user ? (
    <Navigate to="/login" />
  ) : user.role === "staff" ? (
    <>
      <h1>Staff Dashboard</h1>
      <Row xs={1} md={2} lg={2} className="g-4 mt-2 mx-5">
        {[
          {
            name: "Events",
            url: "events",
            color: "primary",
            icon: "bi bi-calendar4-event",
          },
          {
            name: "Users",
            url: "users",
            color: "success",
            icon: "bi bi-people",
          },
        ].map((item, index) => (
          <Col key={index}>
            <Link to={`/staff/${item.url}`} style={{ textDecoration: "none" }}>
              <Card className="h-100 p-0 zoom" bg={item.color}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <h1>
                    <i className={item.icon}></i>
                  </h1>
                </Card.Body>
                <Card.Footer className="text-center">
                  Manage {item.url} <i className="bi bi-arrow-right-circle"></i>
                </Card.Footer>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  ) : (
    <Navigate to="/events" />
  );
}
