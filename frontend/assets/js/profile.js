export async function getUser() {
    let url = `http://localhost:8080/user/findbyusername/${localStorage.getItem('username')}`;

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function postAvatar(username, avatar) {
    // POST request using fetch()
    return fetch("http://localhost:8080/user/postAvatar", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            username: username,
            avatar: avatar
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token, Authorization, Origin",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
            "Authorization": localStorage.getItem('tokenKey')
        }
    })
}

export async function getFavourites() {
    let url = 'http://localhost:8080/filmdetail/getallfavs';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getUserDetails(username) {
    let url = `http://localhost:8080/user/getuserdetails/${username}`;

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getUserComments(username) {
    let url = `http://localhost:8080/user/getusercomments/${username}`;

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}