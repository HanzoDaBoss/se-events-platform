import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useState } from "react";
import { postRegister } from "../api";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [registerFailure, setRegisterFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleFirstNameInput = (e) => {
    setFirstNameInput(e.target.value);
  };
  const handleLastNameInput = (e) => {
    setLastNameInput(e.target.value);
  };
  const handleUsernameInput = (e) => {
    setUsernameInput(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    postRegister({
      first_name: firstNameInput,
      last_name: lastNameInput,
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    }).then((response) => {
      setLoading(false);
      if (response.status !== 201) {
        setRegisterFailure(true);
      } else {
        navigate("/register/success");
      }
    });
  };

  return (
    <Form
      onSubmit={handleSubmitRegister}
      className="d-flex flex-column justify-content-center"
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h2>
          Create a Went<span className="purple-text">Event</span> account
        </h2>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Han"
              onChange={handleFirstNameInput}
              value={firstNameInput}
            />
          </Col>
          <Col>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lee"
              onChange={handleLastNameInput}
              value={lastNameInput}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="mrcooldude"
          onChange={handleUsernameInput}
          value={usernameInput}
        />
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
      </Form.Group>
      {!registerFailure ? (
        <></>
      ) : (
        <Alert variant="danger">
          <p>An error occurred when creating your account. Please try again.</p>
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
            <span>Registering</span>
          </>
        ) : (
          "Register"
        )}
      </Button>
    </Form>
  );
}
