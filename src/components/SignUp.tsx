import React from 'react';
import {Form, Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

class SignUp extends React.Component {
    state = {
        email: "",
        username: "",
        password: "",
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
                            name="fullName"
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="light">
                        <Link to="/sign-in">Sign in</Link>
                    </Button>
                </form>
            </Container>
        )
    }
}

export default SignUp;
