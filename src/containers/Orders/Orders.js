import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {
    const { onFetchOrders } = props;
    // To ensure that it only runs when this component mounts, pass an empty array as the second argument
    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders]); 

    let orders = <Spinner />;
    if (!props.loading) {
        orders = props.orders.map(order => (
                <Order 
                    key={order.id} 
                    ingredients={order.ingredients}
                    price={order.price} />
        ))
    }
    return (
        <div>
            {orders}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,              // state.order -- reaching out to the order reducer, orders -- to order property in the state of that reducer 
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));