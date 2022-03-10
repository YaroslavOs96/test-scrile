import React from 'react';
import './spinner.css'
import spinner from './spinner.svg'

const Spinner = () => {
    return (
        <div className='flex spinner-container'>
            <img
                src={spinner}
                className='spinner-img'
                alt={"spinner"}>
            </img>
        </div>
    )
};

export default Spinner;