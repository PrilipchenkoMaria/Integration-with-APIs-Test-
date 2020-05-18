import React from "react";
import { Card, Button, CardDeck, Container, Spinner } from "react-bootstrap";
import { ProductsStore } from "../store/reducers/products";
import { connect } from "react-redux";
import { AppStore } from "../store";
import { getProducts, createPaymentIntent } from "../store/actions";
import { PaymentIntentStore } from "../store/reducers/paymentIntent";

interface ProductsProps extends ProductsStore, PaymentIntentStore {
  getProducts: () => void;
  createPaymentIntent: (product: object) => void;
}

const Products = connect((state: AppStore) => ({
  products: state.products.products,
  isFetching: state.products.isFetching,
  intentIsFetching: state.paymentIntent.intentIsFetching,
}), {
  getProducts,
  createPaymentIntent,
})(class extends React.Component <ProductsProps, any> {

  componentDidMount() {
    const {
      products,
      isFetching,
      getProducts,
    } = this.props;
    if (!products && !isFetching) {
      getProducts();
    }
  }


  handleSubmit(event: { preventDefault: () => void; }, product: object) {
    event.preventDefault();
    this.props.createPaymentIntent(product);
  }

  render() {
    if (this.props.isFetching || this.props.intentIsFetching) return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary"/>
      </div>
    );
    return (
      <div>
        <Container fluid>
          <CardDeck>
            {this.renderProducts()}
          </CardDeck>
        </Container>
      </div>
    );
  }

  renderProducts() {
    if (this.props.products) return this.props.products.map(product => {
      return <Card
        style={{ width: "250px", flex: "inherit" }}
        className="text-center"
        key={product._id}
      >
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{product.amount}$</Card.Subtitle>
          <Button
            variant="primary"
            onClick={(event: { preventDefault: () => void; }) => this.handleSubmit(event, product)}
          >Buy</Button>
        </Card.Body>
      </Card>;
    });
  }
});

export default Products;
