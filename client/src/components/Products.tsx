import React from "react";
import { Card, Button, CardDeck, Container, Spinner } from "react-bootstrap";
import { ProductsStore } from "../store/reducers/products";
import { connect } from "react-redux";
import { AppStore } from "../store";
import { getProducts } from "../store/actions";

interface ProductsProps extends ProductsStore {
  getProducts: () => void;
}

const Products = connect((state: AppStore) => ({
  products: state.products.products,
  isFetching: state.products.isFetching,
}), {
  getProducts,
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

  render() {
    if (this.props.isFetching) return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary"/>
      </div>
    );
    return (
      <Container fluid>
        <CardDeck>
          {this.renderProducts()}
        </CardDeck>
      </Container>
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
          <Button variant="primary">Buy</Button>
        </Card.Body>
      </Card>;
    });
  }
});

export default Products;
