/**
 * Add MenuItem Form
 */
import React, { Component } from 'react';

class AddMenuItemForm extends Component {

  constructor() {
    super();

    this.defaultState = {
      name: '',
      price: '',
      status: 'available',
      description: '',
      image: ''
    };
    this.state = this.defaultState;

    this.handleCreateMenuItem = this.handleCreateMenuItem.bind(this);
  }

  handleCreateMenuItem(event) {
    event.preventDefault();
    const menuItem = {
      name: this.state.name,
      price: this.state.price,
      status: this.state.status,
      description: this.state.description,
      image: this.state.image,
    };
    this.props.onAddMenuItem(menuItem);
    this.setState(this.defaultState);
  }

  handleInputChange(key, event) {
    const newState = Object.assign(...this.state, { [key]: event.target.value });
    this.setState(newState);
  }

  render() {
    return (
      <form className="menuItem-edit" name="menuItemForm" onSubmit={this.handleCreateMenuItem}>
        <input type="text" name="name" placeholder="Menu Item Name" value={this.state.name} onChange={this.handleInputChange.bind(this, 'name')} />
        <input type="text" name="price" placeholder="Menu Item Price" value={this.state.price} onChange={this.handleInputChange.bind(this, 'price')} />
        <select name="status" value={this.state.status} onChange={this.handleInputChange.bind(this, 'status')}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange.bind(this, 'description')}></textarea>
        <input type="text" name="image" placeholder="URL to Image" value={this.state.image} onChange={this.handleInputChange.bind(this, 'image')} />
        <button type="submit">+ Add Item</button>
      </form>
    );
  }

}

AddMenuItemForm.propTypes = {
  onAddMenuItem: React.PropTypes.func.isRequired
};

export default AddMenuItemForm;
