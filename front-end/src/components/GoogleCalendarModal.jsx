import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function GoogleCalendarModal({ show, onHide, eventId, event }) {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [disableButton, setDisableButton] = useState(true);

  const eventObjForCalendar = {
    summary: event.title,
    description: event.summary,
    start: {
      dateTime: event.start_time,
    },
    end: {
      dateTime: event.end_time,
    },
  };

  const signInGoogle = () => {
    return supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar",
          redirectTo: "http://localhost:5173/login-google/success",
          skipBrowserRedirect: true,
        },
      })
      .then(({ data, error }) => {
        if (error) {
          return error;
        }
        const windowFeatures = "left=100,top=100,width=500,height=600";
        const popupWindow = window.open(
          data.url,
          "Google Sign-In",
          windowFeatures
        );
        setDisableButton(false);
      });
  };

  const addEventToCalendar = () => {
    return axios
      .post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        eventObjForCalendar,
        {
          headers: {
            Authorization: "Bearer " + session.provider_token,
          },
        }
      )
      .then(() => {
        setDisableButton(true);
        return supabase.auth.signOut();
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-dark"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
          Add to Google Calendar?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="px-3">
          {/* Step 1 */}
          <div className="mb-4">
            <h4 className="fw-bold">1. Sign in with Google</h4>
            <Button
              variant="outline-primary"
              className="w-100"
              onClick={signInGoogle}
            >
              <i className="bi bi-google me-2"></i> Sign in with Google
            </Button>
          </div>

          {/* Step 2 */}
          <div className="mb-4">
            <h4 className="fw-bold">2. Add event to Google Calendar</h4>
            <Button
              variant="primary"
              className="w-100"
              onClick={addEventToCalendar}
              disabled={disableButton}
            >
              <i className="bi bi-calendar-plus me-2"></i> Add Event
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
