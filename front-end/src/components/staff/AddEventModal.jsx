import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { postEvent } from "../../api";
import { v4 as uuidv4 } from "uuid";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export default function AddEventModal({ show, onHide }) {
  const supabase = useSupabaseClient();

  const { user } = useContext(UserContext);

  const [eventInput, setEventInput] = useState({
    title: "",
    city: "",
    postcode: "",
    date: "",
    start_time: "",
    end_time: "",
    summary: "",
    description: "",
  });
  const [imageFileInput, setImageFileInput] = useState({});
  const [submitEventFailure, setSubmitEventFailure] = useState(false);
  const [submitEventFailureMsg, setSubmitEventFailureMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEventInputChange = (e) => {
    setEventInput((prevEvent) => {
      return { ...prevEvent, [e.target.name]: e.target.value };
    });
  };

  const handleImageFileInputChange = (e) => {
    setImageFileInput(e.target.files[0]);
  };

  const submitNewEvent = (e) => {
    e.preventDefault();
    setLoading(true);

    const imageFileName = uuidv4();

    const eventObj = {
      title: eventInput.title,
      location: `${eventInput.city}, ${eventInput.postcode}`,
      date: eventInput.date,
      start_time: `${eventInput.date}T${eventInput.start_time}:00`,
      end_time: `${eventInput.date}T${eventInput.end_time}:00`,
      summary: eventInput.summary,
      description: eventInput.description,
      created_by: user.email,
      image_dir: imageFileName,
    };

    if (eventInput.start_time > eventInput.end_time) {
      setLoading(false);
      setSubmitEventFailure(true);
      setSubmitEventFailureMsg(
        "Event end time cannot be before start time. Please change these details and try again."
      );
    } else {
      const submitEventPromise = postEvent(eventObj);
      const uploadImagePromise = supabase.storage
        .from("images")
        .upload("events/" + imageFileName, imageFileInput);
      return Promise.all([submitEventPromise, uploadImagePromise])
        .then((promises) => {
          setLoading(false);
          setSubmitEventFailure(false);
          onHide();
          window.location.reload();
        })
        .catch((error) => {
          setLoading(false);
          setSubmitEventFailure(true);
          setSubmitEventFailureMsg(
            "There was an error processing your submission. Please verify the event details and try again."
          );
          return error;
        });
    }
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tech Event"
              onChange={handleEventInputChange}
              value={eventInput.title}
              name="title"
              required
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Event Date</Form.Label>
            <Form.Control
              type="date"
              onChange={handleEventInputChange}
              value={eventInput.date}
              name="date"
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Please provide a valid date.
            </Form.Control.Feedback>
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                onChange={handleEventInputChange}
                value={eventInput.start_time}
                name="start_time"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid start time.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                onChange={handleEventInputChange}
                value={eventInput.end_time}
                name="end_time"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid end time.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="London"
                onChange={handleEventInputChange}
                value={eventInput.city}
                name="city"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="AA11 1AA"
                onChange={handleEventInputChange}
                value={eventInput.postcode}
                name="postcode"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid postcode.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Event Summary</Form.Label>
            <Form.Control
              type="text"
              placeholder="A summary of the event"
              onChange={handleEventInputChange}
              value={eventInput.summary}
              name="summary"
              required
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="A full description of the event..."
              onChange={handleEventInputChange}
              value={eventInput.description}
              name="description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Event Thumbnail</Form.Label>
            <Form.Control
              type="file"
              required
              onChange={handleImageFileInputChange}
              name="file"
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Please provide a valid image file.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {!submitEventFailure ? (
          <></>
        ) : (
          <Alert variant="danger" className="mb-2">
            <p>{submitEventFailureMsg}</p>
          </Alert>
        )}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button className="purple" onClick={submitNewEvent}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-1"
              />
              <span>Posting</span>
            </>
          ) : (
            "Post event"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
