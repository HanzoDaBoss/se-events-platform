import Button from "react-bootstrap/Button";

export default function HomePage() {
  return (
    <div className="welcome-page text-center p-5">
      <header className="mb-4">
        <h1 className="display-4 fw-bold">WentEvent</h1>
        <p className="lead text-muted">
          An events platform to discover, join, and organize your favorite
          events effortlessly.
        </p>
      </header>
      <section className="mb-5">
        <p
          className="fw-bold p-2"
          style={{
            display: "inline-block",
            borderRadius: "8px",
            border: "2px solid",
            borderImage:
              "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet) 1",
          }}
        >
          Powered with Google Calendar
        </p>
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
