import React from 'react';
import './spinner.css'
import spinner from './spinner.svg'

const Spinner = () => {
    return (
        <div>
            <img
                src={spinner}
                className='spinner'
                alt={"spinner"}>
            </img>
        </div>
    )
};

export default Spinner;