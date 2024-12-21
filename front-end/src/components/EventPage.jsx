import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import {
  deleteUserEventByEventId,
  getEventById,
  postUserEventByEventId,
} from "../api";
import GoogleCalendarModal from "./GoogleCalendarModal";
import { UserContext } from "./contexts/User";
import moment from "moment";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Placeholder from "react-bootstrap/Placeholder";

export default function EventPage({ event, setEvent }) {
  const { event_id } = useParams();

  let navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isAttending, setIsAttending] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEventById(event_id)
      .then((response) => {
        setLoading(false);
        if (response.status !== 200) {
          navigate("/login");
        } else {
          setUser(response.data.user);
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
      setModalShow(true);
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

  return loading ? (
    <Col>
      <Card className="h-100 p-0">
        <Card.Img variant="top" src="https://placehold.co/600x400" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
    </Col>
  ) : (
    <>
      <GoogleCalendarModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        eventId={event_id}
        event={event}
      />
      <Col>
        <Card className="h-100 p-0 shadow-sm mx-5">
          <Card.Img
            variant="top"
            src={`${
              import.meta.env.VITE_SUPABASE_URL
            }/storage/v1/object/public/images/events/${event.image_dir}`}
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
