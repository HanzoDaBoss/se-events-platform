import Button from "react-bootstrap/Button";

export default function RegisterSuccessPage() {
  return (
    <article className="text-center">
      <h2>
        You have created a <span className="purple-text">WentEvent</span>{" "}
        account!
      </h2>
      <Button className="btn purple-outline btn-lg mt-3" href="/login">
        Back to login <i className="bi bi-arrow-right"></i>
      </Button>
    </article>
  );
}
