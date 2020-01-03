import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    // Map state to props
    const ings = useSelector( state => state.burgerBuilder.ingredients );
    const price2 = useSelector( state => state.burgerBuilder.totalPrice );
    const error = useSelector( state => state.burgerBuilder.error );
    const isAuthenticated = useSelector( state => state.burgerBuilder.token !== null );

    // Map dispatch to props
    const dispatch = useDispatch();
    const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const onIngredientRemove = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    // To check purchaseable, which is the "ORDER NOW" button
    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');   // history -- come from the react router
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    // Send an http request
    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) { 
        disabledInfo[key] = disabledInfo[key] <= 0; // it will return true or false
    }
    // {salad: true, meat: false, ...}

    let orderSummary = null;
    let burger = error ? <p> Ingredients can't be loaded! </p> : <Spinner />;

    // Two adjacent element in JSX needs to use AUX
    if ( ings ) {
        burger = (
            <Aux>
                <Burger ingredients = {ings} />
                <BuildControls 
                    ingredientAdded = {onIngredientAdded}
                    ingredientRemove = {onIngredientRemove} 
                    disabled = {disabledInfo} 
                    purchaseable = {updatePurchaseState(ings)}
                    ordered = {purchaseHandler}
                    isAuth = {isAuthenticated}
                    price = {price2} />
            </Aux>
        );

        orderSummary = <OrderSummary
            ingredients = {ings}
            price = {price2}
            purchaseCanceled = {purchaseCancelHandler} 
            purchaseContinued = {purchaseContinueHandler} />
    }

    return (
        <Aux>
            <Modal show = {purchasing} modalClosed = {purchaseCancelHandler} >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default withErrorHandler(burgerBuilder, axios);