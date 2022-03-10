import React, { useState, useEffect } from "react";
import Spinner from "../spinner/spinner";
import getFilterUsersData from "../../services/userData";
import { debounce } from "lodash";
import './search-hints.css'

export default function SearchHints({ selectUser, partOfName }) {
    const
        debouncedUpdateHintsData = debounce((partOfName) => updateHintsData(partOfName), 300),
        [hintsData, setHintsData] = useState({ partOfName: '', hintsList: '' }),
        [statusLoaded, setStatusLoaded] = useState(true),
        [listLoadedAvatars, setListLoadedAvatars] = useState([]);

    const updateHintsData = (partOfName) => {
        if (!partOfName) {
            setHintsData({ partOfName: '', hintsList: '' })
            setStatusLoaded(true)
            return
        }
        setHintsData({ partOfName: partOfName, hintsList: '' })
        setStatusLoaded(false)
        getFilterUsersData(partOfName, hintsData.partOfName)
            .then((receivedHintsData) => {
                if (receivedHintsData.hintsList.length === 0) {
                    setHintsData({ partOfName: receivedHintsData.partOfName, hintsList: '' })
                    setStatusLoaded(true)
                    return
                }
                setHintsData({ partOfName: receivedHintsData.partOfName, hintsList: receivedHintsData.hintsList })
            })
            .catch(() => {
                setStatusLoaded(true)
                setHintsData({ partOfName: partOfName, hintsList: 'error' })
            })
    };

    useEffect(() => {
        const timerID = setTimeout(fixPhotoLoadError, 5000);
        if (partOfName !== hintsData.partOfName) {
            if (!partOfName) {
                updateHintsData()
            } else { debouncedUpdateHintsData(partOfName) }
        }
        return () => clearTimeout(timerID)
    })

    const fixPhotoLoadError = () => {
        setStatusLoaded(true)
    }

    const addLoadedAvatar = (link) => {
        const list = listLoadedAvatars;
        list.push(link)
        if (!listLoadedAvatars.includes(link)) { setListLoadedAvatars(list) }
        checkAllAvatarsLoaded()
    };

    const checkAllAvatarsLoaded = () => {
        if (statusLoaded) { return }
        const
            listAvatarsHint = hintsData.hintsList.map((item) => item.avatarLink),
            avatarLoadedStatus = [];
        listAvatarsHint.forEach(function (item) {
            avatarLoadedStatus.push(listLoadedAvatars.includes(item))
        });
        if (avatarLoadedStatus.every(item => item)) { setStatusLoaded(true) }
    }

    const renderHints = (arr) => {
        if (arr === 'error') {
            return (
                <div className="flex hint">
                    <span>Что-то пошло не так, попробуйте обновить страницу</span>
                </div >
            )
        }
        if (!arr) { return }
        if (!statusLoaded) { checkAllAvatarsLoaded() }
        return arr.map((item) => {
            const { id, name, avatarLink } = item;
            return (
                <div
                    className="flex hint"
                    onClick={() => { selectUser(name) }
                    }
                    key={id}>
                    <img
                        className="avatar"
                        onLoad={() => { addLoadedAvatar(avatarLink) }}
                        // src={avatarLink}
                        alt={`avatar ${id}`}>
                    </img>
                    <span>
                        {name}
                    </span>
                </div >
            )
        })
    }

    return (
        <div className="search hint-list">
            {!statusLoaded ? <Spinner /> : null}
            {renderHints(hintsData.hintsList)}
        </div>
    );
}