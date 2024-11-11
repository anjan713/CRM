import React from 'react';
import "./customerDisplay.scss";

const CustomerDisplay = ({ name, picURL }) => {
    return (
        <div className='customer-card'>
            <img className='customer-icon' src={picURL} alt='customer profile' />
            <span className='customer-name'>{name}</span>
        </div>
    )
}

export default CustomerDisplay