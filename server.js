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

server.listen(5000, ()=>{

    console.log("Server running on http://localhost:5000");
});