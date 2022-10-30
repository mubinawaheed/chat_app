const socket = io("http://localhost:8000", { transports: ['websocket', 'polling', 'flashsocket'] })

const form = document.getElementById('form-con')
const msginput = document.getElementById('inp')
const msgcontainer = document.querySelector('.container1')
const send_btn = document.getElementById('send_btn')
const nname = prompt("Enter your name to join")

const appenduser = (msg, position) => {
    const msgelement = document.createElement('div')
    msgelement.innerText = msg
    msgelement.classList.add('msg')
    if (position === 'left') {

        msgelement.classList.add(position)
    } else if (position === 'right') {

        msgelement.classList.add(position)
    } else {

        msgelement.classList.add('center')
    }
    msgcontainer.append(msgelement)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const newmsg = msginput.value;
    if (newmsg.length != 0) {

        appenduser(`You: ${newmsg}`, 'right')
        socket.emit('send', newmsg)
        msginput.value = ''
    }

})

socket.emit('new-user-joined', nname)

socket.on('user-joined', nname => {
    appenduser(`${nname} joined the chat`, 'none')
})

socket.on('message recieved', data => {

    appenduser(`${data.name}: ${data.message}`, 'left')
    localStorage.setItem('username', data.name)
    localStorage.setItem('msg', data.message)

})

const host = "http://localhost:5000"
const add_record = async(username, msg) => {
    const response = await fetch(`${host}/api/chat/storemsg`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, msg })
    });
    const json = await response.json();
    console.log(json)
}

const person_name = localStorage.getItem('username')
const rec_msg = localStorage.getItem('msg')

send_btn.addEventListener("click",
    add_record(localStorage.getItem('username'), localStorage.getItem('msg')))