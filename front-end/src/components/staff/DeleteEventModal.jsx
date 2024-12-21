import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router";
import { deleteEventById } from "../../api";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export default function DeleteEventModal({
  eventId,
  imageFileName,
  showDeleteModal,
  onHideDeleteModal,
}) {
  const supabase = useSupabaseClient();

  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [deleteEventFailure, setDeleteEventFailure] = useState(false);

  const submitDeleteEvent = () => {
    const deleteEventPromise = deleteEventById(eventId);
    const deleteImagePromise = supabase.storage
      .from("images")
      .remove([`events/${imageFileName}`]);

    setLoading(true);
    return Promise.all([deleteEventPromise, deleteImagePromise])
      .then(() => {
        setLoading(false);
        setDeleteEventFailure(false);
        onHideDeleteModal();
        navigate("/staff/events");
      })
      .catch((error) => {
        setLoading(false);
        setDeleteEventFailure(true);
        return error;
      });
  };
  return (
    <Modal show={showDeleteModal} onHide={onHideDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
      <Modal.Footer>
        {!deleteEventFailure ? (
          <></>
        ) : (
          <Alert variant="danger" className="mb-2">
            <p>There was an error deleting this event. Please try again.</p>
          </Alert>
        )}
        <Button variant="secondary" onClick={onHideDeleteModal}>
          No
        </Button>

        <Button className="purple" onClick={submitDeleteEvent}>
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
              <span>Deleting</span>
            </>
          ) : (
            "Yes"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
