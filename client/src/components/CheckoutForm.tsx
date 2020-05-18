import { loadStripe } from "@stripe/stripe-js/pure";
import React from "react";
import { ElementsConsumer, CardElement, Elements } from "@stripe/react-stripe-js";
import "../CardSectionStyle.scss";
import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardSection from "./CardSection";
import { stripePC } from "../config";
import { connect } from "react-redux";
import { AppStore } from "../store";
import { Stripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(stripePC);

interface CheckoutProps {
  clientSecret?: string;
  stripe?: Stripe | null;
  elements: any;
}

const CheckoutForm = connect((state: AppStore) => ({
  clientSecret: state.paymentIntent.clientSecret,
}), null)(
  class extends React.Component<CheckoutProps, any> {
    state = {
      error: null,
      payment: false,
    };
    handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      const { stripe, elements } = this.props;
      if (!stripe || !elements) return;

      const result: any = await stripe.confirmCardPayment(this.props.clientSecret as string, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.error) {
        this.setState({ error: result.error.message });
      } else if (result.paymentIntent.status === "succeeded") {
        this.setState({ payment: true });
      }
    };

    response() {
      const { error } = this.state;
      const variant = error ? "warning" : "success";
      const message = error
        ? `${error}.`
        : "Product payment succeeded.";
      return (
        <Container>
          <Alert variant={variant}>
            {message}<br/>
            <Button variant="light">
              <Link to="/" className="text-decoration-none">Products</Link>
            </Button>
          </Alert>
        </Container>
      );
    }

    render() {
      if (this.state.error || this.state.payment) return this.response();
      return (
        <form onSubmit={this.handleSubmit}>
          <CardSection/>
          <button disabled={!this.props.stripe}>Confirm order</button>
          <Button variant="light">
            <Link to="/" className="text-decoration-none">Back</Link>
          </Button>
        </form>
      );
    }
  });

export default function InjectedCheckoutForm() {
  return (
    <Container>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ stripe, elements }) => (
            <CheckoutForm stripe={stripe} elements={elements}/>
          )}
        </ElementsConsumer>
      </Elements>
    </Container>
  );
}
