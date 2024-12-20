import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { postEvent } from "../../api";
import { v4 as uuidv4 } from "uuid";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import EventForm from "./EventForm";

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
        <EventForm
          eventInput={eventInput}
          handleEventInputChange={handleEventInputChange}
          handleImageFileInputChange={handleImageFileInputChange}
        />
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
