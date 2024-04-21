const {io} = require("./server");

const usersByRoom = [];

const messages = [];

io.on("connection", socket => {
    socket.on("enter-room", (data, callback) => {
        socket.join(data.sala);

        const userInRoom = usersByRoom.find(user => user.sala === data.sala && user.nome === data.nome);

        let newUser

        if (userInRoom) {
            userInRoom.id = socket.id;
            newUser = userInRoom.nome;
        } else {
            const user = {
                id: socket.id,
                sala: data.sala,
                nome: data.nome
            }

            usersByRoom.push(user);

            newUser = user.nome;
        }

        const messagesInRoom = messages.filter(message => message.sala === data.sala);
        callback(messagesInRoom);

        socket.to(data.sala).emit("enter-room", {
            newUser
        })

        socket.on("disconnect", () => {
            socket.to(data.sala).emit("leave-room", {
                user: data.nome
            })
        })
    })

    socket.on("send message", data => {
        const hora = new Date().getHours();
        const minuto = new Date().getMinutes();
        const horario = `${hora}h ${minuto}m`;

        const message = {
            nome: data.nome,
            sala: data.sala,
            message: data.message,
            sendedAt: horario
        };

        console.log(message);

        messages.push(message);

        io.to(data.sala).emit("construct message", {
            message: message,
            senderId: socket.id
        });
    })
})

