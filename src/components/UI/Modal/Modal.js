import React from 'react';
import classes from './Modal.css';

const modal = (props) => {
    return (
        <div 
            className={classes.Modal}
            style={props.show ? {transform: 'translateY(0)', opacity: 1} : {transfrom: 'translateY(-100vh)', opacity: 0}}
            >
            {props.children}
        </div>
    )
}

export default modal;