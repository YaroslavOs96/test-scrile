import React, { Component } from "react";
import './app.css'
import SearchPanel from "../search-panel/search-panel";
import SearchHints from "../search-hints/search-hints";
import UserData from "../../services/userData";

export default class App extends Component {
    userData = new UserData();
    constructor() {
        super();
        this.state = {
            statusLoading: false,
            hintList: "",
            selectedUser: ""
        };
    }

    onInputSearch = (partOfName) => {
        if (partOfName.length > 0) {
            this.toggleLoadStatus(true)
        }

        this.setState({ partOfName, selectedUser: "" })

        this.userData.getFilterUsersData(partOfName)
            .then((hintList) => {
                this.setState({ hintList })
            })
    };

    toggleLoadStatus = (status) => {
        if (!this.state.statusLoading === status) {
            this.setState({ statusLoading: status })
        }
    };

    userSelect = (name) => {
        this.setState({ selectedUser: name, hintList: '' })

    };

    render() {
        const { hintList, statusLoading, selectedUser } = this.state;

        return (
            <div className="app" >
                <SearchPanel
                    onInputSearch={this.onInputSearch}
                    selectedUser={selectedUser} />
                <SearchHints
                    toggleLoadStatus={this.toggleLoadStatus}
                    hintList={hintList}
                    statusLoading={statusLoading}
                    userSelect={this.userSelect} />
            </div>
        )
    }
}