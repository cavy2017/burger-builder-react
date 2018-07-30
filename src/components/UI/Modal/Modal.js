import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.backdropClicked}/>
            <div 
                className={classes.Modal}
                style={props.show ? {transform: 'translateY(0)', opacity: 1} : {transfrom: 'translateY(-100vh)', opacity: 0}}
                >
                {props.children}
            </div>
        </Aux>
    )
}

export default modal;