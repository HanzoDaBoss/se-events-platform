import EventsList from "./EventsList";

export default function EventsPage() {
  return (
    <>
      <h1>Events</h1>
      <EventsList eventPagePath="/events/" />
    </>
  );
}
