const socket = require("socket.io");
const schedule = require("node-schedule");
require("dotenv").config();
global.onlineUsers = [];

exports.connectSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "*",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Someone connected");
    socket.on("add-user", (id) => {
      onlineUsers.push({ id, socketId: socket.id });
      console.log(onlineUsers);
    });

    socket.on("new-notification", (notification) => {
      onlineUsers.forEach((user) => {
        if (user.id === notification.receiverId) {
          socket
            .to(user.socketId)
            .emit("receive-notification", { ...notification });
        }
      });
    });

    socket.on("schedule-notification", (notification) => {
      console.log(notification);
      let receiver;
      onlineUsers.forEach((user) => {
        if (user.id === notification.receiverId) {
          receiver = user.socketId;
        }
      });
      if (notification.repeatTime.includes("*")) {
        const job = schedule.scheduleJob(notification.repeatTime, function () {
          io.sockets.to(receiver).emit("one-time-notification", {
            ...notification,
            sendTime: job.nextInvocation()._date.ts,
          });
          job.cancel();
        });
        io.sockets.to(receiver).emit("repeat-notification", {
          ...notification,
          sendTime: job.nextInvocation()._date.ts,
        });
      } else {
        const arr = notification.sendTime.split("-");
        const date = new Date(
          parseInt(arr[0]),
          parseInt(arr[1]) - 1,
          parseInt(arr[2]),
          0,
          0,
          0
        );
        const job = schedule.scheduleJob(date, function () {
          io.sockets
            .to(receiver)
            .emit("one-time-notification", { ...notification });
        });
      }
    });

    socket.on("delete-notification", (notification) => {
      onlineUsers.forEach((user) => {
        if (user.id === notification.receiverId) {
          io.sockets
            .to(user.socketId)
            .emit("delete-notificationId", { ...notification });
        }
      });
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      console.log("Someone disconnected");
    });
  });
};
