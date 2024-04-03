import React from "react";

import Blog from "./Blog";
function ListBlog({ data = [] }) {
  return (
    <div>
      {data?.length > 0 ? (
        <div className='mx-auto'>
          {data?.map((item) => {
            return <Blog key={item.id} blog={item}/>;
          })}
        </div>
      ) : (
        <div className='w-fit mx-auto text-2xl font-semibold'>
          Không tìm thấy bài viết nào
        </div>
      )}
    </div>
  );
}

export default ListBlog;
