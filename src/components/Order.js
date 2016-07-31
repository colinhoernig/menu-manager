import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import h from '../helpers';

class Order extends Component {

  constructor() {
    super();

    this.renderOrder = this.renderOrder.bind(this);
    this.renderOrderDetails = this.renderOrderDetails.bind(this);
  }

  renderOrder(key) {
    var menuItem = this.props.menuItems[key];
    var count = this.props.order[key];
    var removeButton = <button onClick={() => this.props.onRemoveFromOrder(key)}>&times;</button>

    if (!menuItem) {
      return <li key={key}>Sorry, menu item no longer available. {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>
        <CSSTransitionGroup
            component="span"
            transitionName="count"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
            className="count"
          >
          <span key={count}>{count}</span>
        </CSSTransitionGroup>
        lbs {menuItem.name} {removeButton}
        </span>
        <span className="price">{h.formatPrice(count * menuItem.price)}</span>
      </li>
    );
  }

  renderOrderDetails() {
    var orderIds = Object.keys(this.props.order);
    var total = orderIds.reduce((prevTotal, key) => {
      var menuItem = this.props.menuItems[key];
      var count = this.props.order[key];
      var isAvailable = menuItem && menuItem.status === 'available';

      if (menuItem && isAvailable) {
        return prevTotal + (count * parseInt(menuItem.price, 10) || 0);
      }

      return prevTotal;
    }, 0);

    if (orderIds.length) {
      return (
        <CSSTransitionGroup
              className="order"
              component="ul"
              transitionName="order"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total</strong>
            {h.formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      );
    } else {
      return <h3>Your order is empty.</h3>;
    }
  }

  render() {
    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        {this.renderOrderDetails()}
      </div>
    );
  }

};

Order.propTypes = {
  menuItems: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  onRemoveFromOrder: React.PropTypes.func.isRequired
};

export default Order;
