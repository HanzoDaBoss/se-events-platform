import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getEvents } from "../api";
import { UserContext } from "./contexts/User";

export default function EventsList() {
  const [userAuthFailure, setUserAuthFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventsList, setEventsList] = useState([]);

  let navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    getEvents().then((response) => {
      if (response.status !== 200) {
        navigate("/login");
      } else {
        setUser(response.data.user);
        setEventsList(response.data.events);
      }
    });
  }, []);

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {eventsList.map((event, index) => (
        <Col key={index}>
          <Card className="h-100 p-0">
            <Card.Img variant="top" src="https://placehold.co/600x400" />
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{event.summary}</Card.Text>
            </Card.Body>
            <Card.Footer>{event.date.slice(0, 10)}</Card.Footer>
            <Card.Footer className="text-muted">
              {event.start_time.slice(11, 16)}
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
