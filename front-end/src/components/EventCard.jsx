import moment from "moment";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

export default function EventCard({ event }) {
  return (
    <Card className="h-100 p-0 zoom">
      <Card.Img
        variant="top"
        src={`${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/images/events/${event.image_dir}`}
      />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.summary}</Card.Text>
      </Card.Body>
      <Card.Footer>{moment(event.date).format("MMM Do YYYY")}</Card.Footer>
      <Card.Footer className="text-muted d-flex justify-content-between">
        {moment(event.start_time).format("h:mm a")}
        {event.is_attending ? <Badge bg="success">Attending</Badge> : <></>}
      </Card.Footer>
    </Card>
  );
}
