import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "./contexts/User";
import { getEvents } from "../api";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

export default function ProfilePage() {
  let navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEvents().then((response) => {
      setLoading(false);
      if (response.status !== 200) {
        navigate("/login");
      } else {
        setUser(response.data.user);
      }
    });
  }, []);

  const accountDetailsArray = [
    { title: "Email", key: "email" },
    { title: "First Name", key: "first_name" },
    { title: "Last Name", key: "last_name" },
    { title: "Role", key: "role" },
  ];

  return loading ? (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
      className="me-1"
    />
  ) : (
    <Container className="mt-2">
      <Row className="justify-content-center">
        <Card>
          <Card.Header as="h5" className="text-center">
            Welcome,
            <Card.Title className="mt-2 purple-text">
              {user.username}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Title>Account Details</Card.Title>
            {accountDetailsArray.map((accountDetail, id) => (
              <Card.Text key={id}>
                <strong>{accountDetail.title}:</strong>{" "}
                {user[accountDetail.key]}
              </Card.Text>
            ))}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
