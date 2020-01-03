import * as actionType from './actionTypes';

// expect to get the id which was created on the backend (database)
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAILED,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionType.PURCHASE_BURGER,
        orderData: orderData,
        token: token
    };
};

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    };
};

// For Order
export const fetchOrdersSuccess = (orders1) => {
    return {
        type: actionType.FETCH_ORDER_SUCCESS,
        orders: orders1
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionType.FETCH_ORDER_FAILED,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionType.FETCH_ORDER_START
    };
};

export const fetchOrders = (token, userId) => {
    return {
        type: actionType.FETCH_ORDERS,
        token: token,
        userId: userId
    };
};