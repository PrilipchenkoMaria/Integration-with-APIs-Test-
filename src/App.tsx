import React from 'react';
import './App.scss';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import CreateProduct from "./components/CreateProduct";
import Products from "./components/Products";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/CreateProduct" component={CreateProduct} />
          <Route path="/" component={Products} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
