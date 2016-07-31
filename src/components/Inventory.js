import React, { Component } from 'react';
import config from '../config';
import AddMenuItemForm from './AddMenuItemForm';
import Firebase from 'firebase';

// Reference to Firebase obj
const ref = new Firebase(config.firebase_url);

class Inventory extends Component {

  constructor() {
    super();
    
    // Set initial state
    this.state = {
      uid: '' // store user ID for determining restaurant owner
    };

    // Explicit `this` context bindings
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.renderInventory = this.renderInventory.bind(this);
  }

  /**
   * Before component mounts, auth with token from
   * local storage if it exists
   */
  componentWillMount() {
    var token = localStorage.getItem('token');
    if (token) {
      ref.authWithCustomToken(token, this.authHandler);
    }
  }

  /**
   * Handle login button click to auth with Github credentials
   */
  handleLoginClick() {
    ref.authWithOAuthPopup('github', this.authHandler);
  }

  /**
   * Handle logout button click to deauthenticate
   */
  handleLogoutClick() {
    ref.unauth();
    localStorage.removeItem('token');
    this.setState({
      uid: null
    });
  }

  /**
   * Auth callback
   */
  authHandler(err, authData) {
    if (err) {
      console.err(err);
      return;
    }

    // Save the login token in browser via local storage
    localStorage.setItem('token', authData.token);

    // Get a Firebase reference to the restaurant
    const restaurantRef = ref.child(this.props.params.restaurantId);

    // On initial restaurant data and when any restaurant data changes
    restaurantRef.on('value', snapshot => {
      var data = snapshot.val() || {};

      // If restaurant doesn't have owner, make the restanr ours
      if (!data.owner) {
        restaurantRef.set({
          owner: authData.uid
        });
      }

      // Update state to reflect the current restaurant owner and user ID
      this.setState({
        uid: authData.uid,
        owner: data.owner || authData.uid
      });
    })
  }

  renderLogin() {
    return (
      <nav className="renderLogin">
        <h2>Inventory</h2>
        <p>Sign in to manage your restaurants's menu</p>
        <button className="github" onClick={this.handleLoginClick}>via @github</button>
      </nav>
    );
  }

  renderInventory(key) {
    return (
      <div className="menuitem-edit" key={key}>
        <input type="text" value={this.props.menuItems[key].name} onChange={this.props.onMenuItemChange.bind(this, key, 'name')} />
        <input type="text" value={this.props.menuItems[key].price} onChange={this.props.onMenuItemChange.bind(this, key, 'price')} />
        <select value={this.props.menuItems[key].status} onChange={this.props.onMenuItemChange.bind(this, key, 'status')}>
          <option value="unavailable">Sold out!</option>
          <option value="available">Fresh!</option>
        </select>
        <textarea value={this.props.menuItems[key].description} onChange={this.props.onMenuItemChange.bind(this, key, 'description')}></textarea>
        <input type="text" value={this.props.menuItems[key].image} onChange={this.props.onMenuItemChange.bind(this, key, 'image')} />
        <button onClick={this.props.onRemoveMenuItem.bind(null, key)}>Remove Menu Item</button>
      </div>
    );
  }

  render() {
    let logoutButton = <button className="logout" onClick={this.handleLogoutClick}>Log Out</button>

    if (!this.state.uid) {
      return (
        <div>{this.renderLogin()}</div>
      );
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Oops! You don't own this store.</p>
          {logoutButton}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>

        {logoutButton}

        {Object.keys(this.props.menuItems).map(this.renderInventory)}

        <AddMenuItemForm {...this.props} />
        <button onClick={this.props.onLoadSampleMenu}>Load Sample Menu</button>
      </div>
    );
  }

};

Inventory.propTypes = {
  onAddMenuItem: React.PropTypes.func.isRequired,
  onRemoveMenuItem: React.PropTypes.func.isRequired,
  onLoadSampleMenu: React.PropTypes.func.isRequired,
  menuItems: React.PropTypes.object.isRequired
};

export default Inventory;
