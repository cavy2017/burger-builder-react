import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from './BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchase: false,
        purchasing: false
    }

    addHandler = (type) => {
        const count = this.state.ingredients[type] + 1;
        const cloned = {
            ...this.state.ingredients
        };
        cloned[type] = count;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

        this.setState({
            ingredients: cloned,
            totalPrice: newPrice
        });
        this.updatePurchase(cloned);
    }

    removeHandler = (type) => {
        const count = this.state.ingredients[type] - 1;
        if (count < 0) {
            return;
        }
        const cloned = {
            ...this.state.ingredients
        };
        cloned[type] = count;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

        this.setState({
            ingredients: cloned,
            totalPrice: newPrice
        });
        this.updatePurchase(cloned);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    backdropClickedHandler = () => {
        this.setState({purchasing: false});
    }

    continueHandler = () => {
        alert('You click continue');
    }

    updatePurchase(ingredients) {
        var sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, cur) => {
            return sum + cur;
        }, 0);


        this.setState({
            purchase: sum > 0
        })
    }

    render () {

        const disabledIng = {
            ...this.state.ingredients
        };

        for (var key in disabledIng) {
            disabledIng[key] = disabledIng[key] <= 0
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    backdropClicked={this.backdropClickedHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancel={this.backdropClickedHandler}
                        continue={this.continueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    add={this.addHandler} 
                    remove={this.removeHandler}
                    disabled={disabledIng}
                    price={this.state.totalPrice}
                    purchase={this.state.purchase}
                    onPurchase={this.purchaseHandler}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;