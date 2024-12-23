import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { useContext, useState } from "react";
import { postLogin } from "../api";
import { UserContext } from "./contexts/User";
import { Link, useNavigate } from "react-router";

export default function LoginPage() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginFailure, setLoginFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    postLogin({ email: emailInput, password: passwordInput }).then(
      (response) => {
        setLoading(false);
        if (response.status !== 201) {
          setLoginFailure(true);
        } else {
          setUser(response.data.user_data);
          navigate("/events");
        }
      }
    );
  };

  return (
    <Form
      onSubmit={handleSubmitLogin}
      className="d-flex flex-column justify-content-center"
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h2>
          Login to <span className="purple-text">WentEvent</span>
        </h2>
        <Form.Label>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#7d0cd4" }}
          >
            Sign Up
          </Link>
        </Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="wentevent@example.com"
          onChange={handleEmailInput}
          value={emailInput}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="••••••••••"
          onChange={handlePasswordInput}
          value={passwordInput}
        />
        <Form.Label className="purple-text">Forgot Password?</Form.Label>
      </Form.Group>
      {!loginFailure ? (
        <></>
      ) : (
        <Alert variant="danger">
          <p>Email or password invalid</p>
        </Alert>
      )}
      <Button disabled={loading} type="submit" className="btn purple-outline">
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-1"
            />
            <span>Logging in</span>
          </>
        ) : (
          "Login"
        )}
      </Button>
      {/* <Button variant="outline-primary" className="w-100 mt-3">
        <i className="bi bi-google me-2"></i> Sign in with Google
      </Button> */}
    </Form>
  );
}
