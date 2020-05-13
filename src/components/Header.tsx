import React from "react";
import { Link } from "react-router-dom";
import {Nav} from "react-bootstrap";

class Header extends React.Component {
    render() {
        return (
            <Nav variant="tabs" as="ul" expand>
                <Nav.Item as="li">
                    <Link to="/" className="nav-link">Products</Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link to="/create-product" className="nav-link">Create product</Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link to="/create-product" className="nav-link">Connect to my Stripe</Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link to="/sign-in" className="nav-link">Sign in</Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link to="/sign-up" className="nav-link" >Sign up</Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link to="/" className="nav-link" >Sign out</Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default Header;
