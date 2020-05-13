import React from 'react';
import {Form, Button, Container} from "react-bootstrap";


class CreateProduct extends React.Component {
    state = {
        name: "",
        price: "",
    };

    handleInputChange = (event: { target: any; }) => {
        const {target} = event;
        const {value, name} = target;
        this.setState({[name]: value});
    };


    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    render() {
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
                            placeholder="Enter product price"
                            onChange={this.handleInputChange}
                            name="price"
                            value={this.state.price}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Container>
        )
    }
}

export default CreateProduct;
