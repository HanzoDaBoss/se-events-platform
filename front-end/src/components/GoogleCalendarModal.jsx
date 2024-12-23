import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function GoogleCalendarModal({ show, onHide, event }) {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [loading, setLoading] = useState(false);
  const [addEventText, setAddEventText] = useState("Add Event");
  const [disableButton, setDisableButton] = useState(true);
  const [addToCalendarFailure, setAddToCalendarFailure] = useState(false);

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
          redirectTo: "https://wentevent.netlify.app/login-google/success",
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
    setLoading(true);
    setAddEventText("Adding to calendar");
    if (!session) {
      setAddToCalendarFailure(true);
      setLoading(false);
      setAddEventText("Add Event");
      setDisableButton(true);
    }
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
        setAddToCalendarFailure(false);
        setLoading(false);
        setAddEventText("Event added!");
        setDisableButton(true);
        return supabase.auth.signOut();
      })
      .catch((error) => {
        setAddToCalendarFailure(true);
        setLoading(false);
        setAddEventText("Add Event");
        setDisableButton(true);
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
        <h4 className="fw-bold mb-3">1. Sign in with Google</h4>
        <Button
          variant="outline-primary"
          className="w-100 mb-5"
          onClick={signInGoogle}
        >
          <i className="bi bi-google me-2"></i> Sign in with Google
        </Button>

        <h4 className="fw-bold mb-3">2. Add event to Google Calendar</h4>
        <Button
          variant="primary"
          className="w-100"
          onClick={addEventToCalendar}
          disabled={disableButton}
        >
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
              <span>{addEventText}</span>
            </>
          ) : (
            <>
              <i className="bi bi-calendar-plus me-2"></i> {addEventText}
            </>
          )}
        </Button>
      </Modal.Body>
      <Modal.Footer className="border-0">
        {!addToCalendarFailure ? (
          <></>
        ) : (
          <Alert variant="danger" className="mb-2">
            <p>
              There was an error adding this event to your calendar. Please make
              sure to sign in and try again.
            </p>
          </Alert>
        )}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
