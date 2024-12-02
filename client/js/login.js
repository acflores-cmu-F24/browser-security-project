const username = document.getElementById('username')
const password = document.getElementById('password')
const logInButton = document.getElementById('login-button')
const registerButton = document.getElementById('register-button')

logInButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect-url') || '/chat';
    await fetch('/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        })
    })
    window.location.href = redirectUrl;
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
            //throw new Error(`Error registering! status: ${response.status}`)
        }
        //sessionStorage.setItem('username', username)
        window.location.href = '/chat'
    } catch (error) {
        console.error('Registration error:', error)
        alert('Registration failed.')
    }
})
