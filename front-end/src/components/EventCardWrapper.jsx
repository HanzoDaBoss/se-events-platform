import { Link } from "react-router";
import EventCard from "./EventCard";

export default function EventCardWrapper({ event, wrapper }) {
  return wrapper === "link" ? (
    <Link to={`/events/${event.id}`} style={{ textDecoration: "none" }}>
      <EventCard event={event} />
    </Link>
  ) : (
    <Link to={`/staff/events/${event.id}`} style={{ textDecoration: "none" }}>
      <EventCard event={event} />
    </Link>
  );
}
