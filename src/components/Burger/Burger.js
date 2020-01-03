import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    let transformIngredients = Object.keys(props.ingredients)     // keys return array
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => { // Spread a new array to construct with Array() method
                return <BurgerIngredient key = {igKey + i} type = {igKey} /> // Need to assign a key, because its an array of jsx
                                                                             // igKey = salad, i = 1/2/3/4
            });             
        })                                                         // map executes a function on each element in the input array
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []); // transform an array into something else  
        
    if (transformIngredients.length === 0) {
        transformIngredients = <p> Please start adding ingredients! </p>
    }
    //console.log(transformIngredients);

    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top" />
            {transformIngredients}
            <BurgerIngredient type = "bread-bottom" />
        </div>
    );
};

export default burger; 

// A way to transform an object of key value pairs into an array of burger ingredients where 
// the value of that object is important
// to decide how many ingredients and keys important to which type needed

// map() -> to transfer an array of objects to array of string

// Transform the string value into an array with as many elements as possible 