const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []

//adding the users to users array that arenot already in there
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId })
}


// function to remove the user if user is disconnected
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

//getting a user function
const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
}

//emittings
io.on("connection", (socket) => {
    // for connection
    console.log("a user connected")
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    });

    //for disconnection
    socket.on("disconnection", () => {
        console.log("a user disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    });

    //sending and getting messages
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        })
    })
})

