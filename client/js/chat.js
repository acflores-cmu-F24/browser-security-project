const message = document.getElementById('message')
const logOutButton = document.getElementById('logout-button')
const postButton = document.getElementById('post-button')
const messageInput = document.getElementById('messageInput')

var socket 
socket = io()

document.addEventListener('DOMContentLoaded', renderChatRoom)

function renderChatRoom() {
    //const username = sessionStorage.getItem('username')
    const username = "SCOOBY"

    function formatTimestamp(isoString) {
        const date = new Date(isoString)
        return date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
    }

    function renderMessage(chat) {
        const messageElement = document.createElement('div')
        //messageElement.classList.add('message')
        
        const senderElement = document.createElement('div')
        //senderElement.classList.add('sender')
        senderElement.textContent = `${chat.sender}`

        const textElement = document.createElement('div')
        //messageElement.classList.add('message')
        textElement.textContent = chat.text

        const timestampElement = document.createElement('div')
        //timestampElement.classList.add('time')
        timestampElement.textContent = formatTimestamp(chat.timestamp)

        const chatElementContainer = document.createElement('div')
        //metaContainer.classList.add('meta')
        chatElementContainer.appendChild(senderElement)
        chatElementContainer.appendChild(textElement)
        chatElementContainer.appendChild(timestampElement)

        messageElement.appendChild(chatElementContainer)
        messageElement.appendChild(textElement)
    }

    async () =>  {
        try {
            const response = await fetch(`/chats`)
            if (!response.ok) {
                throw new Error(`Error retrieving messages! status: ${response.status}`)
            }
            const chats = await response.json()
            chats.forEach((chat) => {
                renderMessage(chat)
            })
        } catch (error) {
            console.error('Error retrieving messages:', error)
        }
    }

    postButton.addEventListener('click', async () => {
        //const sender = sessionStorage.getItem('username')
        const sender = username;
        const text = messageInput.value
        const timestamp = new Date().toISOString()
        //const currentUser = usersList.find((user) => user.username === username)
        
        try {
            const response = await fetch('/chats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sender: sender.value,
                    text: text.value,
                    timestamp: timestamp.value
                })
            })
            if (!response.ok) {
                throw new Error(`Error persisting message. status: ${response.status}`)
            }
            // TODO: Do I need to .value the text and timestamp in the socket message? 
            socket.emit('newChat', 
                {
                    sender: sender.toString(),
                    text: text,
                    timestamp: timestamp
                });
            messageInput.value = ''
        } catch(error) {
            console.error('Message post error:', error)
        }
    })

    socket.on('chatUpdate', chat => { renderMessage(chat) });

    logOutButton.addEventListener('click', async () => {
        try {
            //let username = sessionStorage.getItem('username')
            let username =  "SCOOBY"
            if (username) {
                sessionStorage.removeItem('username')
                window.location.href = '/'
            }
        } catch (error) {
            console.error('Logout error:', error)
        }
    })


}
