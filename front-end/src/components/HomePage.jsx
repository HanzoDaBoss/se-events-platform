import WentEvent from "../assets/WentEvent.svg";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function HomePage() {
  return (
    <Container className="welcome-page text-center">
      <header className="mb-4">
        <img className="w-50 h-25 mb-4" src={WentEvent} />
        <p className="lead text-muted">
          An events platform to discover, join, and organise your favourite
          events effortlessly.
        </p>
      </header>
      <p className="p-2 mx-5 google">Powered with Google</p>
      <Button className="btn purple btn-lg mx-2" href="/events">
        Events <i className="bi bi-arrow-right"></i>
      </Button>
      <Button className="btn purple-outline btn-lg mx-2" href="/login">
        Login <i className="bi bi-arrow-right"></i>
      </Button>
    </Container>
  );
}
