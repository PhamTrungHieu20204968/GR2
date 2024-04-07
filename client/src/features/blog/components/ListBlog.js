import React from "react";

import Blog from "./Blog";
function ListBlog({ data = [], filter }) {
  const filteredData = data
    .filter((item) =>
      item.user.name
        .toUpperCase()
        .includes(filter?.userName.trim().toUpperCase())
    )
    .filter((item) =>
      item.title.toUpperCase().includes(filter?.title.trim().toUpperCase())
    )
    .filter((item) =>
      item.tag.toUpperCase().includes(filter?.tag.trim().toUpperCase())
    );
  return (
    <div>
      {filteredData?.length > 0 ? (
        <div className='mx-auto'>
          {filteredData?.map((item) => {
            return <Blog key={item.id} blog={item} />;
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
