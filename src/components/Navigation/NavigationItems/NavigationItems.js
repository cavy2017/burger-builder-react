import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <div className={classes.NavigationItems}>
            <ul>
                <NavigationItem link="/" active>Burger Builder</NavigationItem>
                <NavigationItem link="/">Checkout</NavigationItem>
            </ul>
        </div>
    )
}

export default navigationItems;