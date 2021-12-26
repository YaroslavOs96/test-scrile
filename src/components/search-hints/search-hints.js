import React from "react";
import { Component } from "react/cjs/react.production.min";
import Spinner from "../spinner/spinner";

import './search-hints.css'

export default class SearchHints extends Component {


    constructor(props) {
        super(props)

        this.listLoadedAvatars = []
    }

    addLoadedAvatar = (link) => {
        if (!this.listLoadedAvatars.includes(link)) {
            this.listLoadedAvatars = [...this.listLoadedAvatars, link]
        }
        this.checkAllAvatarsLoaded()
    };


    checkAllAvatarsLoaded = () => {
        const
            { listLoadedAvatars } = this,
            { hintList } = this.props,
            listAvatarsHint = hintList.map((item) => item.avatarLink),
            avatarLoaded = []

        console.log('Maccив загруженных', listLoadedAvatars);
        console.log('Maccив всех', listAvatarsHint);

        listAvatarsHint.forEach(function (item) {
            console.log('incloudes', item, listLoadedAvatars.includes(item));
            const compareLink = listLoadedAvatars.includes(item);
            avatarLoaded.push(compareLink)
        });
        console.log('Массив ответов на соответствие', avatarLoaded);

        console.log(avatarLoaded.every(item=>item));

        if (avatarLoaded.every(item=>item)) {
            this.props.toggleLoadStatus(false)
        }

    }

    renderHints(arr) {

        if (!arr) {
            return
        }

        this.checkAllAvatarsLoaded()

        return arr.map((item) => {
            const { id, name, avatarLink } = item;
            return (
                <div
                    onClick={() => { this.props.userSelect(name) }
                    }
                    key={id}>
                    <img
                        onLoad={() => { this.addLoadedAvatar(avatarLink) }}
                        src={avatarLink}
                        alt={`avatar ${id}`}>
                    </img>
                    <span>
                        {name}
                    </span>

                </div >
            )
        })
    }

    render() {
        const { hintList, statusLoading } = this.props;

        const hints = this.renderHints(hintList);

        return (
            <div>
                {statusLoading ? <Spinner /> : null}
                {hints}
            </div>
        );
    }

}