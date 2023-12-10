import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import React, { useEffect } from "react";
import { message } from "antd";
import Home from "features/home/Home";
import Login from "features/auth/pages/Login";
import Signup from "features/auth/pages/Signup";
import HomeAdmin from "features/admin/pages/HomeAdmin";
function App() {
  useEffect(() => {
    const getToken = () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/users/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", JSON.stringify(response));
          } else throw new Error("Đăng nhập thất bại!");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getToken();
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#30b5b2",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='admin'>
            <Route index element={<HomeAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
