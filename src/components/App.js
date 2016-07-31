import React, { Component } from 'react';
import Rebase from 're-base';
import config from '../config';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import MenuItem from './MenuItem';

import sampleMenuItems from '../sample-menu';

const base = Rebase.createClass(config.firebase_url);

class App extends Component {
  constructor() {
    super();
    this.state = {
      menuItems: {},
      order: {}
    };

    this.handleAddToOrder = this.handleAddToOrder.bind(this);
    this.handleRemoveFromOrder = this.handleRemoveFromOrder.bind(this);
    this.handleAddMenuItem = this.handleAddMenuItem.bind(this);
    this.handleRemoveMenuItem = this.handleRemoveMenuItem.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.handleLoadSampleMenu = this.handleLoadSampleMenu.bind(this);
    this.handleMenuItemChange = this.handleMenuItemChange.bind(this);
  }

  componentDidMount() {
    base.syncState(`${this.props.params.restaurantId}/menuItems`, {
      context: this,
      state: 'menuItems'
    });

    const localStorageRef = localStorage.getItem(`order-${this.props.params.restaurantId}`);

    if (localStorageRef) {
      // Update component state to reflect local storage
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.restaurantId}`, JSON.stringify(nextState.order));
  }

  handleAddToOrder(key) {
    let order = Object.assign({}, this.state.order);
    order[key] = order[key] + 1 || 1;
    this.setState({
      order: order
    });
  }

  handleRemoveFromOrder(key) {
    console.log(key);
    const order = Object.assign({}, this.state.order);
    delete order[key];
    console.log(order);
    this.setState({
      order: order
    });
  }

  handleAddMenuItem(menuItem) {
    var timestamp = (new Date()).getTime();
    let menuItems = Object.assign({}, this.state.menuItems);
    // Update state object
    menuItems[`menuItem-${timestamp}`] = menuItem;
    // Set the state
    this.setState({
      menuItems: menuItems
    });
  }

  handleRemoveMenuItem(key) {
    if (confirm('Are you sure?')) {
      // Remove from the state object
      let menuItems = Object.assign({}, this.state.menuItems);
      menuItems[key] = null;
      // Set the state
      this.setState({
        menuItems: menuItems
      });
    }
  }

  handleMenuItemChange(key, field, event) {
    var menuItems = Object.assign({}, this.state.menuItems);
    menuItems[key][field] = event.target.value;
    this.setState({
      menuItems: menuItems
    });
  }

  handleLoadSampleMenu() {
    this.setState({
      menuItems: sampleMenuItems
    });
  }

  renderMenuItem(key) {
    return (
      <MenuItem
        key={key}
        index={key}
        details={this.state.menuItems[key]}
        onAddToOrder={this.handleAddToOrder}
        />
    );
  }

  render() {
    return (
      <div className="menu-manager">
        <div className="menu">
          <Header tagline="A New Menu Every Day" />
          <ul className="list-of-items">
            {Object.keys(this.state.menuItems).map(this.renderMenuItem) }
          </ul>
        </div>
        <Order
          menuItems={this.state.menuItems}
          order={this.state.order}
          onRemoveFromOrder={this.handleRemoveFromOrder}
          />
        <Inventory
          onAddMenuItem={this.handleAddMenuItem} 
          onLoadSampleMenu={this.handleLoadSampleMenu}
          menuItems={this.state.menuItems}
          onMenuItemChange={this.handleMenuItemChange}
          onRemoveMenuItem={this.handleRemoveMenuItem}
          {...this.props}
          />
      </div>
    );
  }
}

export default App;
