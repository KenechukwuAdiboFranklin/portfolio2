const userName = document.querySelector("#user-name")
const password = document.querySelector("#password")
const loginForm = document.querySelector("#login-form")


loginForm.addEventListener("submit", async(e) => {
    e.preventDefault()
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({

            username: userName.Value,
            password: password.Value,
            expiresInMins: 30,
        })
    })

    const data = await response.json()

    console.log(response, data)
    if (response.ok) {
        window.location.assign("http://127.0.0.1:5500/product.html")
    }
})

loginForm.addEventListener('submit', () => {
    console.log(userName.value)
    console.log("yes")
})