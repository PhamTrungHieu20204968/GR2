const socket = require("socket.io");

global.onlineUsers = [];

exports.connectSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Someone connected");
    socket.on("add-user", (id) => {
      onlineUsers.push({ id, socketId: socket.id });
    });

    socket.on("new-notification", (notification) => {
      console.log(notification);
      onlineUsers.forEach((user) => {
        if (user.id === notification.receiverId) {
          socket
            .to(user.socketId)
            .emit("receive-notification", { ...notification });
        }
      });
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      console.log("Someone disconnected");
    });
  });
};
