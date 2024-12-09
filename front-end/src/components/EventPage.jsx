import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getEventById } from "../api";
import Button from "react-bootstrap/Button";
import moment from "moment";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function EventPage() {
  const { event_id } = useParams();

  let navigate = useNavigate();

  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEventById(event_id).then((response) => {
      setLoading(false);
      if (response.status !== 200) {
        navigate("/login");
      } else {
        setEvent(response.data.event);
      }
    });
  }, []);

  return (
    <>
      <main>
        <Col>
          <Card className="h-100 p-0">
            <Card.Title>{event.title}</Card.Title>
            <Card.Img
              variant="top"
              src="https://placehold.co/600x400/000000/FFF"
            />
            <Button>{event.is_attending ? "Attending" : "Attend"}</Button>
            <Card.Body>
              <Card.Text>{event.summary}</Card.Text>
              <h3>{moment(event.date).format("Do MMMM YYYY")}</h3>
              <h3>
                <i class="bi bi-clock"> </i>
                {moment(event.start_time).format("h:mm a")} -{" "}
                {moment(event.end_time).format("h:mm a")}
              </h3>
              <h3>
                <i className="bi bi-geo-alt"> </i>
                {event.location}
              </h3>
              <h3>Details</h3>
              <p>{event.description}</p>
            </Card.Body>
          </Card>
        </Col>
      </main>
    </>
  );
}
