import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { useContext, useState } from "react";
import { postLogin } from "../api";
import { UserContext } from "./contexts/User";
import { useNavigate } from "react-router";

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
          navigate("/home");
        }
      }
    );
  };

  return (
    <Container fluid="md">
      <Row>
        <Col>
          {" "}
          <Form
            onSubmit={handleSubmitLogin}
            className="d-flex flex-column justify-content-center"
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleEmailInput}
                value={emailInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handlePasswordInput}
                value={passwordInput}
              />
            </Form.Group>
            {!loginFailure ? (
              <></>
            ) : (
              <Alert variant="danger">
                <p>Email or password invalid</p>
              </Alert>
            )}
            <Button variant="outline-info" disabled={loading} type="submit">
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
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
