import { useState } from "react";
import EventsList from "../EventsList";
import AddEventModal from "./AddEventModal";

import Button from "react-bootstrap/Button";

export default function StaffEvents() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <AddEventModal show={modalShow} onHide={() => setModalShow(false)} />
      <h1>Manage Events</h1>
      <div className="mt-4 d-flex justify-content-center">
        <Button
          className="btn purple btn-lg"
          onClick={() => setModalShow(true)}
        >
          <i className="bi bi-plus-lg"> </i>Add Event
        </Button>
      </div>
      <EventsList eventPagePath="/staff/events-edit/" />
    </>
  );
}
