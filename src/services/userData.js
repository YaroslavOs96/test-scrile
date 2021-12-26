export default class UserData {
    constructor() {
        this._apiBase = 'https://jsonplaceholder.typicode.com/'
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, recivied ${res.status}`)
        }
        return await res.json();
    }

    getFilterUsersData = async (partOfName) => {
        if (!partOfName) {
            return
        }
        let res = await this.getResource(`users?name_like=${partOfName}`);

        return await Promise.all(res.map(this.transformUserData))

    }

    transformUserData = async (data) => {
        const photosData = await this.getResource(`photos/${data.id}`);

        return {
            id: data.id,
            name: data.name,
            avatarLink: photosData.thumbnailUrl
        }
    }
}