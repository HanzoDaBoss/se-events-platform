import Button from "react-bootstrap/Button";
import WentEvent from "../assets/WentEvent.svg";

export default function HomePage() {
  return (
    <div className="welcome-page text-center p-5">
      <header className="mb-4">
        <img className="w-50 h-25 mb-4" src={WentEvent} />
        <p className="lead text-muted">
          An events platform to discover, join, and organise your favourite
          events effortlessly.
        </p>
      </header>
      <section className="mb-5">
        <p className="p-2 mx-5 google">Powered with Google</p>
      </section>
      <section className="d-flex justify-content-center gap-3">
        <Button className="btn purple btn-lg" href="/events">
          Events <i className="bi bi-arrow-right"></i>
        </Button>
        <Button className="btn purple-outline btn-lg" href="/login">
          Login <i className="bi bi-arrow-right"></i>
        </Button>
      </section>
    </div>
  );
}
