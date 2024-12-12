import Button from "react-bootstrap/Button";

export default function RegisterSuccessPage() {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h2>
        You have created a Went<span className="purple-text">Event</span>{" "}
        account!
      </h2>
      <Button className="btn purple-outline btn-lg mt-3" href="/login">
        Back to login <i className="bi bi-arrow-right"></i>
      </Button>
    </article>
  );
}
