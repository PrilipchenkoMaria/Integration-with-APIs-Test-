import React from "react";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { AppStore } from "../store";
import { createProduct } from "../store/actions";
import { ProductCreationStore } from "../store/reducers/productCreation";

interface CreateProductProps extends ProductCreationStore {
  createProduct: (product: object) => void;
}

const CreateProduct = connect((state: AppStore) => ({
  isFetching: state.productCreation.isFetching,
  created: state.productCreation.created,
  error: state.productCreation.error,
}), {
  createProduct,
})(class extends React.Component <CreateProductProps, any> {
  state = {
    name: "",
    amount: "",
  };

  handleInputChange = (event: { target: any; }) => {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.createProduct(this.state);
  }

  message() {
    const { created, error } = this.props;
    if (!created && !error) return;
    const variant = error ? "warning" : "success";
    const message = error
      ? "An error occurred. Please, try again."
      : "Product created";
    return (
      <Alert variant={variant}>
        {message}
      </Alert>
    );
  }

  render() {
    if (this.props.isFetching) return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary"/>
      </div>
    );
    return (
      <Container>
        <form className="CreateProductForm" onSubmit={(event) => this.handleSubmit(event)}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              onChange={this.handleInputChange}
              name="name"
              value={this.state.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="999999"
              placeholder="Enter product price"
              onChange={this.handleInputChange}
              name="amount"
              value={this.state.amount}
            />
          </Form.Group>
          {this.message()}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    );
  }
});

export default CreateProduct;
