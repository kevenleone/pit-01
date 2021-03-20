import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'

const Routes = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/wishlist' exact component={Wishlist} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;