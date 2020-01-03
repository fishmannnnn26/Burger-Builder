import * as actionType from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionType.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return { 
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return {
        type: actionType.INIT_INGREDIENTS
    };
};