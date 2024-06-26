import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import React from "react";
import Home from "features/home/Home";
import Login from "features/auth/pages/Login";
import Signup from "features/auth/pages/Signup";
import ListUser from "features/admin/pages/ListUser";
import HomeAdmin from "features/admin/pages/HomeAdmin";
import CreateProduct from "features/admin/pages/CreateProduct";
import UpdateProduct from "features/admin/pages/UpdateProduct";
import ListProducts from "features/admin/pages/ListProducts";
import ListOrders from "features/admin/pages/ListOrders";
import Products from "features/products/pages/Products";
import ProductDetail from "features/products/pages/ProductDetail";
import Cart from "features/pay/pages/PayCart";
import Pay from "features/pay/pages/PayForm";
import UserPay from "features/pay/pages/UserPay";
import Blogs from "features/blog/pages/Blogs";
import BlogDetail from "features/blog/pages/BlogDetail";
import UpdateBlog from "features/blog/pages/UpdateBlog";
import ListBlogs from "features/admin/pages/ListBlogs";
import UserInfor from "features/user/pages/UserInfor";
import Exchange from "features/user/pages/Exchange";
import Policy from "features/policy/pages/Policy";
import AboutUs from "features/about-us/pages/AboutUs";
import Contact from "features/contact/pages/Contact";

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
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/pay' element={<Pay />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/user-pay/:id' element={<UserPay />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/detail/:id' element={<BlogDetail />} />
          <Route path='/blogs/:id' element={<UpdateBlog />} />
          <Route path='/user' element={<UserInfor />} />
          <Route path='/user/exchange' element={<Exchange />} />
          <Route path='/products/:category' element={<Products />} />
          <Route path='/products/:category/:name' element={<ProductDetail />} />

          <Route path='admin'>
            <Route index element={<HomeAdmin />} />
            <Route path='list-users' element={<ListUser />} />
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
