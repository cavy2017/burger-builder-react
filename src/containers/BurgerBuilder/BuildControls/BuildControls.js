import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {
                controls.map((arg) => {
                    return <BuildControl 
                        key={arg.label} 
                        label={arg.label} 
                        add={() => props.add(arg.type)}
                        remove={() => props.remove(arg.type)}
                        disabled={props.disabled[arg.type]}/>
                })
            }
        </ div>
    )
}

export default buildControls;