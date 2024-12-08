import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export default function SubmitButton({ loading }) {
  return (
    <>
      <Button variant="outline-info" disabled={!loading} type="submit">
        {!loading ? (
          <>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span>Loading...</span>
          </>
        ) : (
          "Login"
        )}
      </Button>
    </>
  );
}
