const express = require("express");
const http = require("http");
const cors = require("cors");
const PORT = 5000 || process.env.PORT;
const app = express();
app.use(cors());

const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);

io.on("connection", (socket) => {
   console.log("new user connected to our app");

   socket.send("Welcome to Socket MAMO");
   socket.on("textEvent", (message) => {
      console.log(message);
   });

   // disconnect the user ---
   socket.on("disconnect", (socket) => {
      // console.log("user disconnect");
   });

   // socket.on("testEvent", (data) => {
   //   console.log(data);

   // });
   //   socket.on("chatEvent", (data) => {
   //     console.log(data);
   //     io.emit("chatShow", data);
   //   });

   socket.on("joinRoom", (data) => {
      socket.join(data);
   });

   socket.on("reactEvent", (data) => {
      // socket.broadcast.emit("showMessage", data);
      socket.to(data.room).emit("showMessage", data);
   });
});

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/app.html");
});

httpServer.listen(PORT, function () {
   console.log("hello server is running at 5000");
});
