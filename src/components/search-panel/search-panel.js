import React from "react";
import './search-panel.css'
import magnifier from './magnifier.svg'

export default function SearchPanel({ inputValue, setPartName }) {
    const onInput = (event) => {
        setPartName(event.target.value)
    }
    return (
        <div className="search flex search-input-container">
            <Magnifier />
            <input
                className="search-input"
                type="text"
                placeholder="Search"
                onChange={onInput}
                value={inputValue}
            />
        </div >
    )
}

const Magnifier = () => (
    <img
        className="magnifier"
        src={magnifier}
        alt={'magnifier'}>
    </img>
)