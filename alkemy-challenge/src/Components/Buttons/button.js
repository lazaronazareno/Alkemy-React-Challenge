import React from 'react';
import './buttonStyles.scss';

function GeneralButton(props) {
    return (
        <button onClick={props.onClick} id={props.id} className="generalButton">
            <img className="img" src={props.image} id={props.id}/>
            {props.name}
        </button>
    )
}

export default GeneralButton;
