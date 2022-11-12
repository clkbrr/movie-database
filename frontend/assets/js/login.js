let statusCode;

export async function login(username, password) {
    // POST request using fetch()
    return fetch('http://localhost:8080/user/login', {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            username: username,
            password: password
        }),

        // Adding headers to the request
        headers: {
            'Accept': 'application/json, text/plain',
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE"
        },
    })
        .then(function (response) {
            if (!response.ok) {
                localStorage.removeItem("tokenKey");
                localStorage.removeItem('currentUser');
                localStorage.removeItem('username');
            }

            statusCode = response.ok;
            return response.json();
        })
        .then((result) => {
            if (statusCode) {
                localStorage.setItem("tokenKey", result.message);
                localStorage.setItem('currentUser', result.userId);
                localStorage.setItem('username', username);
                localStorage.setItem('avatar', result.avatar);
            }
        })
        .catch(err => console.log(err))
}

export function returnStatus() {
    return statusCode;
}

window.addEventListener("load", () => {
    if (localStorage.getItem('currentUser') != null) {
        location.href = 'http://localhost:8000/dev/index.html';
    }
});