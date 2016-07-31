import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import h from '../helpers';

class RestaurantPicker extends Component {
    handleGoToRestaurant(e) {
        e.preventDefault();
        const restaurantId = e.target.elements[0].value;
        browserHistory.push(`/restaurant/${restaurantId}`);
    }

    render() {
        return (
            <form className="restaurant-selector" onSubmit={this.handleGoToRestaurant}>
                <h2>Please Enter a Restaurant</h2>
                <input type="text" ref="restaurantId" defaultValue={h.getRandomRestaurantName()} required />
                <input type="Submit" value="View Restaurant Menu" readOnly />
            </form>
        );
    }
}

export default RestaurantPicker;