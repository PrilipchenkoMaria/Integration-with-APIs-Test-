import React from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import CreateProduct from "./components/CreateProduct";
import Products from "./components/Products";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/sign-in" component={CreateProduct}/>
                    <Route path="/sign-up" component={CreateProduct}/>
                    <Route path="/create-product" component={CreateProduct}/>
                    <Route path="/" component={Products}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
