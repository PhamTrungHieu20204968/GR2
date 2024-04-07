import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import React from "react";
import Home from "features/home/Home";
import Login from "features/auth/pages/Login";
import Signup from "features/auth/pages/Signup";
import HomeAdmin from "features/admin/pages/HomeAdmin";
import CreateProduct from "features/admin/pages/CreateProduct";
import UpdateProduct from "features/admin/pages/UpdateProduct";
import ListProducts from "features/admin/pages/ListProducts";
import ListOrders from "features/admin/pages/ListOrders";
import Products from "features/products/pages/Products";
import ProductDetail from "features/products/pages/ProductDetail";
import GoogleLoginSuccess from "features/auth/pages/GoogleLoginSuccess";
import Cart from "features/pay/pages/PayCart";
import Pay from "features/pay/pages/PayForm";
import Blogs from "features/blog/pages/Blogs";
import ListBlogs from 'features/admin/pages/ListBlogs';
function App() {
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
          <Route path='/cart' element={<Cart />} />
          <Route path='/pay' element={<Pay />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route
            path='/google-login-success'
            element={<GoogleLoginSuccess />}
          />
          <Route path='/products/:category' element={<Products />} />
          <Route path='/products/:category/:name' element={<ProductDetail />} />

          <Route path='admin'>
            <Route index element={<HomeAdmin />} />
            <Route path='update-product/:id' element={<UpdateProduct />} />
            <Route path='create-product' element={<CreateProduct />} />
            <Route path='list-products' element={<ListProducts />} />
            <Route path='list-orders' element={<ListOrders />} />
            <Route path='list-blogs' element={<ListBlogs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
