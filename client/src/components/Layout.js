import React from "react";

import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, page = ["home"] }) {
  return (
    <div className='layout overflow-x-hidden flex flex-col h-full w-full'>
      <Header page={page}></Header>
      <div className='mt-[70px] flex-1'>{children}</div>
      <Footer page={page}></Footer>
    </div>
  );
}

export default Layout;
