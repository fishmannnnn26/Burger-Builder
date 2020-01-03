import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

// to loop the buildcontrol
const controls = [
    { label: 'Salad', type: 'salad'}, 
    { label: 'Bacon', type: 'bacon'}, 
    { label: 'Cheese', type: 'cheese'}, 
    { label: 'Meat', type: 'meat'}, 
];

const buildControls = (props) => (
    <div className = { classes.BuildControls }> 
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong> </p>
        {controls.map(ctrl => (
            <BuildControl 
                key = {ctrl.label} 
                label = {ctrl.label}
                added = { () => props.ingredientAdded(ctrl.type) } 
                remove = { () => props.ingredientRemove(ctrl.type) } 
                disabled = {props.disabled[ctrl.type]} /> 
        ))}

        <button 
            className = { classes.OrderButton }
            disabled = { !props.purchaseable } 
            onClick = { props.ordered }>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;

// map each control, so each element of this array into a build control, where you set a key that is required. 