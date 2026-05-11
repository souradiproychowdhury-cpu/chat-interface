const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket)=>{

    console.log("User Connected");

    socket.on("user joined", (name)=>{

        io.emit("user joined", name);
    });

    socket.on("chat message", (data)=>{

        io.emit("chat message", data);
    });

    socket.on("disconnect", ()=>{

        console.log("User Disconnected");
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
