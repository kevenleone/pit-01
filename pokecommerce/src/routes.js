import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

import Home from './pages/Home'
import Cart from './pages/Cart'
import Pokemon from './pages/Pokemon'
import Wishlist from './pages/Wishlist'

const Routes = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/pokemon/:name' exact component={Pokemon} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/wishlist' exact component={Wishlist} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;