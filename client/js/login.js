const username = document.getElementById('username')
const password = document.getElementById('password')
const logInButton = document.getElementById('login-button')
const registerButton = document.getElementById('register-button')

logInButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
        const credentials = await response.json()
        if (!response.ok) {
            const errorMessage = await response.json()
            alert(errorMessage)
        }
        localStorage.setItem("username", username.value);
        window.location.href = '/chat'
    } catch(error) {
        console.error('Login error:', error)
        alert('Login failed.')
    }
})

registerButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
        if (!response.ok) {
            const errorMessage = await response.json()
            alert(errorMessage)
        }
        const credentials = await response.json()
        localStorage.setItem("username", username.value);
        window.location.href = '/chat'
    } catch(error) {
        console.error('Registration error:', error)
        alert('Registration failed.')
    }
})
