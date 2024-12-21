import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function DeleteEventModal({
  showDeleteModal,
  onHideDeleteModal,
}) {
  return (
    <Modal show={showDeleteModal} onHide={onHideDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
      <Modal.Footer>
        <Row>
          <Col>
            <Button variant="secondary" onClick={onHideDeleteModal}>
              No
            </Button>
          </Col>
          <Col>
            <Button className="purple" onClick={onHideDeleteModal}>
              Yes
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}
