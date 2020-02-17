import React, {Component} from 'react';
import '../App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Consumer} from './Context';

import NavTop from './Navigation/NavTopContainer';
import NavSide from './Navigation/NavSide';
import CartContainer from './Cart/CartContainer';
import Gallery from './Gallery/Gallery';
import ProductDetails from './ProductDetails/ProductDetails';
import womData from '../data-women.json'; 
import menData from '../data-men.json';
import MobileNavMenu from './Navigation/MobileNavMenu';
import ErrorMessage from './ErrorMessage';

class App extends Component {

  state = {
    mobileMenu: false
  }

  componentDidMount() {
    window.onpopstate = function() {
      window.onpopstate = window.location.reload(false)
    };
  }

  toggleMenu = () => {
    this.setState({mobileMenu: !this.state.mobileMenu});
  }

  closeMenu = () => {
    this.setState({mobileMenu: false});
  }

  getWindowWidth = () => {
    return window.innerWidth;
  }

  womensData = womData.products;
  menData = menData.products;

  render() {
    return (
      <BrowserRouter>
        <div className="app-container">
          <NavTop toggleMenu={this.toggleMenu} getWindowWidth={this.getWindowWidth} />
          {this.state.mobileMenu === true ? <MobileNavMenu closeMenu={this.closeMenu} /> : null}
          <Consumer>
            {
              ({refreshPage}) =>
              <div className="content-container">
                <NavSide />
                <Switch>
                  <Route exact path="/" render={() => <Redirect to="/women" />} />
                  <Route exact path="/women" render={(context) => <Gallery womData={this.womensData} context={context} />} />
                  <Route exact path="/women/product/:id/:color/:size" render={(context) => <ProductDetails womData={this.womensData} refreshPage={refreshPage} context={context} />} />
                  <Route exact path="/men" render={(context) => <Gallery menData={this.menData} context={context} />} />
                  <Route exact path="/men/product/:id/:color/:size" render={(context) => <ProductDetails menData={this.menData} refreshPage={refreshPage} context={context} />} />
                  <Route exact path="/cart" render={() => <CartContainer />} />
                  <Route component={ErrorMessage} />
                </Switch>
              </div>
            }
          </Consumer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
