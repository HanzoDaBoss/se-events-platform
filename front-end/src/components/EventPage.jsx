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
          <Card className="h-100 p-0 shadow-sm">
            <Card.Img
              variant="top"
              src="https://placehold.co/600x400/000000/FFF"
              alt={event.title}
            />
            <Card.Body>
              <Card.Title className="text-center fw-bold">
                {event.title}
              </Card.Title>
              <div className="d-flex justify-content-center my-2">
                <Button variant={event.is_attending ? "success" : "primary"}>
                  {event.is_attending ? "Attending" : "Attend"}
                </Button>
              </div>
              <Card.Text className="text-muted text-center">
                {event.summary}
              </Card.Text>
              <div className="mt-3">
                <h5>
                  <i className="bi bi-calendar-event me-2"></i>
                  {moment(event.date).format("Do MMMM YYYY")}
                </h5>
                <h5>
                  <i className="bi bi-clock me-2"></i>
                  {moment(event.start_time).format("h:mm a")} -{" "}
                  {moment(event.end_time).format("h:mm a")}
                </h5>
                <h5>
                  <i className="bi bi-geo-alt me-2"></i>
                  {event.location}
                </h5>
              </div>
              <hr />
              <h5 className="fw-bold">Details</h5>
              <p>{event.description}</p>
            </Card.Body>
          </Card>
        </Col>
      </main>
    </>
  );
}
