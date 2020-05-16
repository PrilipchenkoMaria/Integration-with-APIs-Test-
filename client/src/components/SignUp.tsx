import React from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthStore } from "../store/reducers/auth";
import { connect } from "react-redux";
import { AppStore } from "../store";
import { signUpUser } from "../store/actions";

interface SignUpProps extends AuthStore {
  signUpUser: (user: object) => any;
}

const SignUp = connect((state: AppStore) => ({
  isFetching: state.auth.signUpIsFetching,
  signUpErrorMessage: state.auth.signUpErrorMessage,
}), {
  signUpUser,
})(class extends React.Component <SignUpProps, any> {
  state = {
    email: "",
    username: "",
    password: "",
  };

  handleInputChange = (event: { target: any; }) => {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.signUpUser(this.state);
  }

  errorMessage() {
    const { signUpErrorMessage } = this.props;

    if (signUpErrorMessage) {
      return (
        <Alert variant="warning">
          {signUpErrorMessage}<br/>
        </Alert>
      );
    }
  }

  render() {
    return (
      <Container>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={this.handleInputChange}
              name="email"
              value={this.state.email}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={this.handleInputChange}
              name="username"
              value={this.state.username}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleInputChange}
              name="password"
              value={this.state.password}
            />
          </Form.Group>
          {this.errorMessage()}
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="light">
            <Link to="/sign-in" className="text-decoration-none">Sign in</Link>
          </Button>
        </form>
      </Container>
    );
  }
});

export default SignUp;
