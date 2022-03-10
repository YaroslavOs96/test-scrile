import React, { useState } from "react";
import './app.css'
import SearchPanel from "../search-panel/search-panel";
import SearchHints from "../search-hints/search-hints";

export default function App() {

    const [searchData, setSearchData] = useState({ inputValue: '', partOfName: '' });

    const setPartOfName = (partOfName) => {
        setSearchData({ inputValue: partOfName, partOfName: partOfName })
    }

    const setSelectedUser = (selectedUser) => {
        setSearchData({ inputValue: selectedUser, partOfName: '' })
    }

    return (
        <div className="app" >
            <SearchPanel
                setPartName={setPartOfName}
                inputValue={searchData.inputValue} />
            <SearchHints
                selectUser={setSelectedUser}
                partOfName={searchData.partOfName} />
        </div>
    )
}