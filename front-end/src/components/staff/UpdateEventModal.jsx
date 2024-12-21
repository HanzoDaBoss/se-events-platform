import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { updateEventById } from "../../api";
import moment from "moment";
import EventForm from "./EventForm";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export default function UpdateEventModal({
  showUpdateModal,
  onHideUpdateModal,
  setDeleteEventModalShow,
  prevEvent,
}) {
  const supabase = useSupabaseClient();
  let navigate = useNavigate();

  const eventLocationArray = prevEvent.location.split(", ");

  const [eventInput, setEventInput] = useState({
    title: prevEvent.title,
    city: eventLocationArray[0],
    postcode: eventLocationArray[1],
    date: moment(prevEvent.date).format("YYYY-MM-DD"),
    start_time: moment(prevEvent.start_time).format("HH:mm"),
    end_time: moment(prevEvent.end_time).format("HH:mm"),
    summary: prevEvent.summary,
    description: prevEvent.description,
    created_at: prevEvent.created_at,
    created_by: prevEvent.created_by,
    imageFileName: prevEvent.image_dir,
  });
  const [imageFileInput, setImageFileInput] = useState({});
  const [updateEventFailure, setUpdateEventFailure] = useState(false);
  const [updateEventFailureMsg, setUpdateEventFailureMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEventInputChange = (e) => {
    setEventInput((currEvent) => {
      return { ...currEvent, [e.target.name]: e.target.value };
    });
  };

  const handleImageFileInputChange = (e) => {
    setImageFileInput(e.target.files[0]);
  };

  const submitUpdatedEvent = (e) => {
    e.preventDefault();
    setLoading(true);

    const eventObj = {
      title: eventInput.title,
      location: `${eventInput.city}, ${eventInput.postcode}`,
      date: eventInput.date,
      start_time: `${eventInput.date}T${eventInput.start_time}:00`,
      end_time: `${eventInput.date}T${eventInput.end_time}:00`,
      summary: eventInput.summary,
      description: eventInput.description,
      created_at: eventInput.created_at,
      created_by: eventInput.created_by,
      image_dir: eventInput.imageFileName,
    };

    if (eventInput.start_time > eventInput.end_time) {
      setLoading(false);
      setUpdateEventFailure(true);
      setUpdateEventFailureMsg(
        "Event end time cannot be before start time. Please change these details and try again."
      );
    } else {
      return updateEventById(prevEvent.id, eventObj)
        .then(() => {
          if (imageFileInput.name) {
            return supabase.storage
              .from("images")
              .update("events/" + eventInput.imageFileName, imageFileInput, {
                cacheControl: "10",
                upsert: true,
              })
              .then(() => {
                setLoading(false);
                setUpdateEventFailure(false);
                onHideUpdateModal();
                navigate("/staff/events");
              });
          }
          setLoading(false);
          setUpdateEventFailure(false);
          onHideUpdateModal();
          navigate("/staff/events");
        })
        .catch((error) => {
          setLoading(false);
          setUpdateEventFailure(true);
          setUpdateEventFailureMsg(
            "There was an error processing your submission. Please verify the event details and try again."
          );
          return error;
        });
    }
  };
  return (
    <Modal show={showUpdateModal} onHide={onHideUpdateModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update this event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EventForm
          eventInput={eventInput}
          handleEventInputChange={handleEventInputChange}
          handleImageFileInputChange={handleImageFileInputChange}
        />
      </Modal.Body>
      <Modal.Footer>
        {!updateEventFailure ? (
          <></>
        ) : (
          <Alert variant="danger" className="mb-2">
            <p>{updateEventFailureMsg}</p>
          </Alert>
        )}
        <Button variant="secondary" onClick={onHideUpdateModal}>
          Close
        </Button>
        <Button
          variant="danger"
          className="ms-auto"
          onClick={() => {
            setDeleteEventModalShow(true);
          }}
        >
          Delete Event
        </Button>
        <Button className="purple" onClick={submitUpdatedEvent}>
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
              <span>Updating</span>
            </>
          ) : (
            "Update event"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
