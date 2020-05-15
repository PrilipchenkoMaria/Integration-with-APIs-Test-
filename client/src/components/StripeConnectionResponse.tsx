import React from "react";
import { connect } from "react-redux";
import { Spinner, Alert, Button, Container } from "react-bootstrap";
import { stripeSignInValidation } from "../store/actions";
import { Link } from "react-router-dom";
import { AppStore } from "../store";
import { AuthStore } from "../store/reducers/auth";

interface StripeConnectionProps extends AuthStore {
  stripeSignInValidation: (query: string) => any;
  location: any;
}

const StripeConnectionResponse = connect((state: AppStore) => ({
  stripeConnected: state.auth.stripeConnected,
  stripeIsFetching: state.auth.stripeIsFetching,
  stripeErrorMessage: state.auth.stripeErrorMessage,
}), {
  stripeSignInValidation,
})(class extends React.Component<StripeConnectionProps, any> {
  componentDidMount() {
    const {
      stripeConnected,
      stripeIsFetching,
      stripeErrorMessage,
      stripeSignInValidation,
    } = this.props;
    if (!stripeConnected && !stripeIsFetching && !stripeErrorMessage) {
      stripeSignInValidation(this.props.location.search);
    }
  }

  response() {
    const stripeConnect = process.env.REACT_APP_CONNECT_URI;
    const { stripeErrorMessage } = this.props;
    const variant = stripeErrorMessage ? "warning" : "success";
    const message = stripeErrorMessage
      ? `${stripeErrorMessage}. You can try to connect to Stripe again or return to products.`
      : "Stripe connection established. Now you can create products.";
    const link = stripeErrorMessage ? <a href={stripeConnect} className="text-decoration-none">Try again </a>
      : <Link to="/create-product" className="text-decoration-none">Create product</Link>;
    return (
      <Container>
        <Alert variant={variant}>
          {message}<br/>
          <Button variant={variant}>
            {link}
          </Button>
          <Button variant="light">
            <Link to="/" className="text-decoration-none">Products</Link>
          </Button>
        </Alert>
      </Container>
    );
  }

  render() {
    const { stripeIsFetching } = this.props;
    if (stripeIsFetching) return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary"/>
      </div>
    );
    return this.response();
  }
});

export default StripeConnectionResponse;
