import React, { Component } from 'react';
import h from '../helpers';

class MenuItem extends Component {

  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    var key = this.props.index;
    this.props.onAddToOrder(key);
  }

  render() {
    console.log(this.props);
    var details = this.props.details;
    var isAvailable = (details.status === 'available');
    var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
    return (
      <li className="menu-item">
        <img src={details.image} alt={details.name} />
        <h3 className="item-name">
          {details.name}
          <span className="price">{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.description}</p>
        <button disabled={!isAvailable} onClick={this.handleButtonClick}>{buttonText}</button>
      </li>
    );
  }

};

export default MenuItem;
