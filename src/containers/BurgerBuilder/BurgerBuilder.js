import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from './BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchase: false,
        purchasing: false,
        loading: false,
        error: false
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
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Oksana',
                address: {
                    street: 'Teststreet',
                    zipcode: '12345',
                    country: 'Russia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch( error => {
                this.setState({loading: false, purchasing: false});
            } );
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

    componentDidMount () {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    render () {

        const disabledIng = {
            ...this.state.ingredients
        };

        for (var key in disabledIng) {
            disabledIng[key] = disabledIng[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can not be loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    add={this.addHandler} 
                    remove={this.removeHandler}
                    disabled={disabledIng}
                    price={this.state.totalPrice}
                    purchase={this.state.purchase}
                    onPurchase={this.purchaseHandler}
                    />
            </Aux>;

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                cancel={this.backdropClickedHandler}
                continue={this.continueHandler}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    backdropClicked={this.backdropClickedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);