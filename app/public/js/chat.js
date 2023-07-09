const socket = io("http://192.168.43.58:2405/");

const urlSearch = new URLSearchParams(window.location.search);
const sala = urlSearch.get("sala");
const nome = urlSearch.get("nome");

const logOutButton = document.getElementById("log-out");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

const messageBox = document.getElementById("message-box");

socket.emit("enter-room", {
    sala,
    nome
}, messages => {
    console.log(messages);
})

socket.on("enter-room", data => {
    const alertContainer = document.createElement("div");
    alertContainer.classList.add("alert");

    alertContainer.innerText = `${data.newUser} entrou na sala!`;

    messageBox.appendChild(alertContainer);

    messageBox.scrollTop = messageBox.scrollHeight;
})

socket.on("leave-room", data => {
    const alertContainer = document.createElement("div");
    alertContainer.classList.add("alert");

    alertContainer.innerText = `${data.user} saiu da sala!`;

    messageBox.appendChild(alertContainer);

    messageBox.scrollTop = messageBox.scrollHeight;
})

socket.on("construct message", data => {
    const isSender = data.senderId === socket.id ? true : false;

    constructMessage(data.message, isSender);

    messageBox.scrollTop = messageBox.scrollHeight;
})

function constructMessage(message, isSender) {
    const messageContainer = document.createElement("div");
    const timeContainer = document.createElement("span");
    const nameContainer = document.createElement("span");

    messageContainer.classList.add("message");
    timeContainer.classList.add("time");
    nameContainer.classList.add("name");

    if (isSender) {
        messageContainer.classList.add("sender");
    } else {
        messageContainer.classList.add("receiver");
    };

    timeContainer.innerText = message.sendedAt;
    nameContainer.innerText = message.nome;

    messageContainer.appendChild(timeContainer);
    messageContainer.appendChild(nameContainer);
    messageContainer.append(message.message);

    messageBox.appendChild(messageContainer);
}

sendButton.addEventListener("click", () => {
    socket.emit("send message", {
        nome: nome,
        sala: sala,
        message: messageInput.value
    });

    messageInput.value = "";
});

messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        socket.emit("send message", {
            nome: nome,
            sala: sala,
            message: messageInput.value
        });

        messageInput.value = "";
    }
})

logOutButton.addEventListener("click", () => {
    window.location.href = "http://192.168.18.9:2405";
})