const getResource = async (url) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/${url}`)
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, recivied ${res.status}`)
    }
    return await res.json();
};



const getFilterUsersData = async (partOfName) => {
    if (!partOfName) {
        return
    }
    const
        res = await getResource(`users?name_like=${partOfName}`),
        hintsList = await Promise.all(res.map(transformUserData)),
        data = {
            partOfName: partOfName,
            hintsList: hintsList
        };
    return data

}

const transformUserData = async (data) => {
    const photosData = await getResource(`photos/${data.id}`);

    return {
        id: data.id,
        name: data.name,
        avatarLink: photosData.thumbnailUrl
    }
}

export default getFilterUsersData;