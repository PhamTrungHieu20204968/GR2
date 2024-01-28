import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import React, { useEffect } from "react";
import Home from "features/home/Home";
import Login from "features/auth/pages/Login";
import Signup from "features/auth/pages/Signup";
import HomeAdmin from "features/admin/pages/HomeAdmin";
import CreateProduct from "features/admin/pages/CreateProduct";
import UpdateProduct from "features/admin/pages/UpdateProduct";
import ListProducts from "features/admin/pages/ListProducts";
import Products from "features/products/pages/Products";
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
            return response.json();
          } else throw new Error("Đăng nhập thất bại!");
        })
        .then((data) => {
          localStorage.setItem("token", JSON.stringify(data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (!JSON.parse(localStorage.getItem("token"))) {
      getToken();
    }
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
          <Route path='/products/:category' element={<Products />} />

          <Route path='admin'>
            <Route index element={<HomeAdmin />} />
            <Route path='update-product/:id' element={<UpdateProduct />} />
            <Route path='create-product' element={<CreateProduct />} />
            <Route path='list-products' element={<ListProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
