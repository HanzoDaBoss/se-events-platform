import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "./contexts/User";
import { getEvents } from "../api";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Placeholder from "react-bootstrap/Placeholder";
import EventCardWrapper from "./EventCardWrapper";

export default function EventsList({ wrapper, setUpdateEventModalShow }) {
  const [loading, setLoading] = useState(false);
  const [eventsList, setEventsList] = useState([]);

  let navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    getEvents().then((response) => {
      setLoading(false);
      if (response.status !== 200) {
        navigate("/login");
      } else {
        setUser(response.data.user);
        setEventsList(response.data.events);
      }
    });
  }, []);

  return (
    <Row xs={1} md={3} lg={4} className="g-4 mt-2 mx-5">
      {loading
        ? Array.from({ length: 9 }).map((_, index) => (
            <Col key={index}>
              <Card className="h-100 p-0">
                <Card.Img variant="top" src="https://placehold.co/600x400" />
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                    <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                    <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder.Button variant="primary" xs={6} />
                </Card.Body>
              </Card>
            </Col>
          ))
        : eventsList.map((event, index) => (
            <Col key={index}>
              <EventCardWrapper event={event} wrapper={wrapper} />
            </Col>
          ))}
    </Row>
  );
}
