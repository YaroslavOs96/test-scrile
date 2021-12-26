import React from "react";
import { Component } from "react/cjs/react.production.min";

import './search-panel.css'
import magnifier from './magnifier.svg'

export default class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            partOfName: ""
        }
    }

    onInputSearch = (event) => {
        const partOfName = event.target.value;
        this.setState({ partOfName: partOfName })
        this.props.onInputSearch(partOfName)
    };

    render() {

        const { selectedUser } = this.props;

        const name = selectedUser ? selectedUser : this.state.partOfName;

        return (
            <>
                <img
                    src={magnifier}
                    alt={'magnifier'}>
                </img>

                <input
                    value={name}
                    className="form-control search-input"
                    type="text"
                    placeholder="Поиск по записям"
                    onChange={this.onInputSearch}
                />
            </>
        )
    }
}