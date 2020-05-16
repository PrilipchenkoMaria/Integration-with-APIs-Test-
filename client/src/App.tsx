import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "./history";
import CreateProduct from "./components/CreateProduct";
import Products from "./components/Products";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import StripeConnectionResponse from "./components/StripeConnectionResponse";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/create-product" component={CreateProduct}/>
          <Route path="/connect/oauth/" component={StripeConnectionResponse}/>
          <Route path="/" component={Products}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
