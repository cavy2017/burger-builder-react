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
                style={props.show ? {display: ''} : {display: 'none'}}
                >
                {props.children}
            </div>
        </Aux>
    )
}

export default modal;