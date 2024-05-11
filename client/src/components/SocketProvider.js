import { useDeleteNotificationMutation } from "app/api/notificationService";
import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const socketContext = createContext();

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [deleteNotification] = useDeleteNotificationMutation();
  const { userId } = useSelector((state) => state.auth);
  useEffect(() => {
    try {
      const _socket = io(process.env.REACT_APP_BASE_URL);
      setSocket(_socket);
    } catch (error) {
      console.error("Error connecting to socket:", error);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      socket?.emit("add-user", userId);
    }

    socket?.on("delete-notificationId", (notification) => {
      deleteNotification({
        id: notification.id,
      })
        .then((res) => {
          if (res.data?.error) {
            console.log(res.data?.error);
          } else
            socket?.emit("schedule-notification", {
              receiverId: userId,
              notificationId: res.data.notification.id,
              orderId: res.data.order.id,
              type: 3,
              sendTime: res.data.notification.sendTime,
              repeatTime: res.data.notification.repeatTime,
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [deleteNotification, socket, userId]);
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
}

export { SocketProvider, socketContext };
