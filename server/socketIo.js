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

    socket.on("add-user", (user) => {
      onlineUsers.push({ information: user, socketId: socket.id });
    });

    socket.on("new-notifications", ({ notifications }) => {
      onlineUsers
        .filter((user) => user.information.id === notifications.receiver_id)
        .forEach((followed) => {
          socket
            .to(followed.socketId)
            .emit("send-notifications", { notifications });
        });
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      console.log("Someone disconnected");
    });
  });
};
