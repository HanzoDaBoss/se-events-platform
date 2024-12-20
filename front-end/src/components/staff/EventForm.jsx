import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function EventForm({
  eventInput,
  handleEventInputChange,
  handleImageFileInputChange,
}) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Event Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Tech Event"
          onChange={handleEventInputChange}
          value={eventInput.title}
          name="title"
          required
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Event Date</Form.Label>
        <Form.Control
          type="date"
          onChange={handleEventInputChange}
          value={eventInput.date}
          name="date"
          required
        />
        <Form.Control.Feedback type="invalid" tooltip>
          Please provide a valid date.
        </Form.Control.Feedback>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            onChange={handleEventInputChange}
            value={eventInput.start_time}
            name="start_time"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid start time.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            onChange={handleEventInputChange}
            value={eventInput.end_time}
            name="end_time"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid end time.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="London"
            onChange={handleEventInputChange}
            value={eventInput.city}
            name="city"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="AA11 1AA"
            onChange={handleEventInputChange}
            value={eventInput.postcode}
            name="postcode"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid postcode.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Event Summary</Form.Label>
        <Form.Control
          type="text"
          placeholder="A summary of the event"
          onChange={handleEventInputChange}
          value={eventInput.summary}
          name="summary"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Event Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="A full description of the event..."
          onChange={handleEventInputChange}
          value={eventInput.description}
          name="description"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Event Thumbnail</Form.Label>
        <Form.Control
          type="file"
          required
          onChange={handleImageFileInputChange}
          name="file"
        />
        <Form.Control.Feedback type="invalid" tooltip>
          Please provide a valid image file.
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}
