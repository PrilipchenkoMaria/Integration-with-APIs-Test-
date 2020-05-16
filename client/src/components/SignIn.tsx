import React from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppStore } from "../store";
import { signInUser } from "../store/actions";
import { AuthStore } from "../store/reducers/auth";

interface SignInProps extends AuthStore {
  signInUser: (user: object) => void;
}

const SignIn = connect((state: AppStore) => ({
  isFetching: state.auth.signUpIsFetching,
  signInErrorMessage: state.auth.signInErrorMessage,
}), {
  signInUser,
})(class extends React.Component <SignInProps, any> {
  state = {
    email: "",
    password: "",
  };

  handleInputChange = (event: { target: any; }) => {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  };


  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.signInUser(this.state);
  }

  errorMessage() {
    const { signInErrorMessage } = this.props;
    if (signInErrorMessage) {
      return (
        <Alert variant="warning">
          {signInErrorMessage}<br/>
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
              placeholder="Enter email"
              onChange={this.handleInputChange}
              name="email"
              value={this.state.email}
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
            <Link to="/sign-up">Create account</Link>
          </Button>
        </form>
      </Container>
    );
  }
});

export default SignIn;
