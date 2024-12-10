import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  deleteUserEventByEventId,
  getEventById,
  postUserEventByEventId,
} from "../api";

import Button from "react-bootstrap/Button";
import moment from "moment";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

export default function EventPage() {
  const { event_id } = useParams();

  let navigate = useNavigate();

  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isAttending, setIsAttending] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEventById(event_id)
      .then((response) => {
        setLoading(false);
        if (response.status !== 200) {
          navigate("/login");
        } else {
          setEvent(response.data.event);
          return response.data.event;
        }
      })
      .then((event) => {
        setIsAttending(event.is_attending);
      });
  }, []);

  const submitEventAttendance = () => {
    setButtonLoading(true);
    postUserEventByEventId(event_id).then(() => {
      setIsAttending(true);
      setButtonLoading(false);
    });
  };

  const removeEventAttendance = () => {
    const element = document.getElementById("is-attending-btn");
    element.classList.remove("is-attending");

    setButtonLoading(true);
    deleteUserEventByEventId(event_id).then(() => {
      setIsAttending(false);
      setButtonLoading(false);
    });
  };

  return (
    <>
      <Col>
        <Card className="h-100 p-0 shadow-sm">
          <Card.Img
            variant="top"
            src="https://placehold.co/600x400/000000/FFF"
            alt={event.title}
          />
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Card.Title className="fw-bold">{event.title}</Card.Title>
              {isAttending ? (
                <Button
                  variant="success"
                  onClick={removeEventAttendance}
                  id="is-attending-btn"
                  className={"is-attending"}
                >
                  {buttonLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                      />
                      <span>Cancelling</span>
                    </>
                  ) : (
                    <span>✔ Attending</span>
                  )}
                </Button>
              ) : (
                <Button variant="primary" onClick={submitEventAttendance}>
                  {buttonLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                      />
                      <span>Confirming</span>
                    </>
                  ) : (
                    "Attend"
                  )}
                </Button>
              )}
            </div>
            <Card.Text className="text-muted mb-4">{event.summary}</Card.Text>
            <div>
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
    </>
  );
}
