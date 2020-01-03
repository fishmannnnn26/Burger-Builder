import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'; 

const checkout = props => {
    const checkoutCancelledHanlder = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data/');
    }

    let summary = <Redirect to="/"/>
    if (props.ingss) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={props.ingss} 
                    onCheckoutCancelled={checkoutCancelledHanlder} 
                    checkoutContinued={checkoutContinuedHandler} />
                <Route 
                    path={props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        );
    }
    return summary;
}

const mapStatesToProps = state => {
    return {
        ingss: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStatesToProps)(checkout);