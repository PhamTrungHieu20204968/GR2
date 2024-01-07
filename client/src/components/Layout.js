import React from "react";

import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className='layout overflow-x-hidden'>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
}

export default Layout;
