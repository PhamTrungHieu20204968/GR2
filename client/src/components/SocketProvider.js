import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const socketContext = createContext();

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
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
  }, [socket, userId]);
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
}

export { SocketProvider, socketContext };
