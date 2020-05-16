import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { stripeConnect } from "../config";
import { connect } from "react-redux";
import { AppStore } from "../store";
import { signOutUser } from "../store/actions";


export interface HeaderProps {
  token?: string,
  stripeConnected: boolean,
  signOutUser: () => void,
}

const Header = connect((state: AppStore) => ({
  token: state.auth.token,
  stripeConnected: state.auth.stripeConnected,
}), {
  signOutUser,
})(class extends React.Component <HeaderProps, any> {

  onClickSignOut() {
    this.props.signOutUser();
  }

  authButtons() {
    if (this.props.token) {
      return <Nav.Item as="li">
        <Link to="/" className="nav-link" onClick={() => this.onClickSignOut()}>Sign out</Link>
      </Nav.Item>;
    }
    return <><Nav.Item as="li">
      <Link to="/sign-in" className="nav-link">Sign in</Link>
    </Nav.Item>
      <Nav.Item as="li">
        <Link to="/sign-up" className="nav-link">Sign up</Link>
      </Nav.Item></>;
  }

  stripeButtons() {
    if (this.props.token) return <Nav.Item as="li">
      <Nav.Link href={stripeConnect}>Connect to my Stripe</Nav.Link>
    </Nav.Item>;
    if (this.props.stripeConnected) {
      return <><Nav.Item as="li">
        <Link to="/create-product" className="nav-link">Create product</Link>
      </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href={stripeConnect}>Switch Stripe account</Nav.Link>
        </Nav.Item></>;
    }
  }

  render() {
    return (
      <Nav variant="tabs" as="ul" expand>
        <Nav.Item as="li">
          <Link to="/" className="nav-link">Products</Link>
        </Nav.Item>
        {this.stripeButtons()}
        {this.authButtons()}
      </Nav>
    );
  }
});

export default Header;
