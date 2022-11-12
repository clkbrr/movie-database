export async function ifUserExists(username) {
    let url = `http://localhost:8080/user/findbyusername/${username}`;

    try {
        let res = await fetch(url);
        if (res.json.length != 0) {
            return await res.json();
        }
        else {
            return null;
        }

    } catch (error) {
        console.log(error);
    }
}

export async function registerUser(username, password, mail, avatar) {
    // POST request using fetch()
    fetch('http://localhost:8080/user/register', {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            username: username,
            password: password,
            email: mail,
            avatar: avatar
        }),

        // Adding headers to the request
        headers: {
            'Accept': 'application/json, text/plain',
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE"
        }
    })
        .then(res => res.json())
        .then((result) => {
            localStorage.setItem("tokeKey", result.message);
            localStorage.setItem('currentUser', result.userId);
            localStorage.setItem('username', username);
        })
        .catch(err => console.log(err))
}

window.addEventListener("load", () => {
    if (localStorage.getItem('currentUser') != null) {
        location.href = 'http://localhost:8000/dev/index.html';
    }
});
