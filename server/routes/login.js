const username = document.getElementById('username')
const password = document.getElementById('password')
const logInButton = document.getElementById('login-button')
const registerButton = document.getElementById('register-button')

logInButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                username: username,
                password: password
            }
        })
        if (response.ok) {
            //sessionStorage.setItem('username', username)
            // render chat page
        } else {
            const errorMessage = await response.json()
            alert(errorMessage)
        }
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
            body: {
                username: username,
                password: password
            }
        })
        if (response.ok) {
            //sessionStorage.setItem('username', username)
            // render chat page
            
        } else {
            const errorMessage = await response.json()
            alert(errorMessage)
        }
    } catch(error) {
        console.error('Registration error:', error)
        alert('Registration failed.')
    }
})
