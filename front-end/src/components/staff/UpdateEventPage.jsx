import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import UpdateEventModal from "./UpdateEventModal";
import { getEventById } from "../../api";

import Spinner from "react-bootstrap/Spinner";
import DeleteEventModal from "./DeleteEventModal";

export default function UpdateEventPage() {
  const { event_id } = useParams();

  let navigate = useNavigate();

  const [prevEvent, setPrevEvent] = useState({
    title: "",
    location: "",
    date: "",
    start_time: "",
    end_time: "",
    summary: "",
    description: "",
    image_dir: "",
  });
  const [updateEventModalShow, setUpdateEventModalShow] = useState(false);
  const [deleteEventModalShow, setDeleteEventModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEventById(event_id)
      .then((response) => {
        setLoading(false);
        if (response.status !== 200) {
          navigate("/login");
        } else {
          setPrevEvent(response.data.event);
          return response.data.event;
        }
      })
      .then((event) => {
        setUpdateEventModalShow(true);
      });
  }, []);

  return loading ? (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
      className="me-1"
    />
  ) : (
    <>
      <UpdateEventModal
        showUpdateModal={updateEventModalShow}
        onHideUpdateModal={() => {
          setUpdateEventModalShow(false);
          navigate("/staff/events");
        }}
        setDeleteEventModalShow={setDeleteEventModalShow}
        prevEvent={prevEvent}
      />
      <DeleteEventModal
        showDeleteModal={deleteEventModalShow}
        onHideDeleteModal={() => {
          setDeleteEventModalShow(false);
        }}
      />
    </>
  );
}
