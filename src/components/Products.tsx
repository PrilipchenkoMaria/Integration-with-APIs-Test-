import React from "react";
import {Card, Button, CardDeck, Container} from "react-bootstrap";


class Products extends React.Component {
    state = {
        products: [
            {
                name: "test",
                price: 4,
            },
            {
                name: "testtest",
                price: 6245234523452345234523453,
            },
            {
                name: "testtesttesttesttest",
                price: 4,
            },
            {
                name: "test",
                price: 6,
            }
        ]
    };

    render() {
        return (
            <Container fluid>
                <CardDeck>
                    {this.renderProducts()}
                </CardDeck>
            </Container>
        )
    }

    renderProducts() {
        return this.state.products.map(product => {
            return <Card style={{width: '250px', flex: "inherit"}} className="text-center">
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.price}$</Card.Subtitle>
                    <Button variant="primary">Buy</Button>
                </Card.Body>
            </Card>
        })
    }
}

export default Products;
