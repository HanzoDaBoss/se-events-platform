import { useState } from "react";
import EventsList from "../EventsList";
import AddEventModal from "./AddEventModal";

import Button from "react-bootstrap/Button";

export default function StaffEvents() {
  const [addEventmodalShow, setAddEventModalShow] = useState(false);
  return (
    <>
      <AddEventModal
        show={addEventmodalShow}
        onHide={() => setAddEventModalShow(false)}
      />
      <h1>Manage Events</h1>
      <div className="mt-4 d-flex justify-content-center">
        <Button
          className="btn purple btn-lg"
          onClick={() => setAddEventModalShow(true)}
        >
          <i className="bi bi-plus-lg"> </i>Add Event
        </Button>
      </div>
      <EventsList wrapper="button" />
    </>
  );
}
