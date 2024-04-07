import React, { useState } from "react";
import { Spin, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CommentItem from "./CommentItem";
import { useGetUserQuery } from "app/api/userService";
import UserComment from "../components/UserComment";

function BlogComments({ blogId, comments, handleCancel }) {
  const { accessToken } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState({ status: false, content: "", id: 0 });
  const { data, isLoading } = useGetUserQuery({
    accessToken: accessToken,
  });
  if (isLoading) {
    return <Spin />;
  }
  console.log(edit);
  return (
    <div className='overflow-hidden'>
      <div className='flex items-center'>
        <div className='flex-1 text-center text-2xl font-semibold'>
          Danh sách bình luận
        </div>
        <CloseOutlined
          className='text-base text-gray-500 p-2 rounded-full cursor-pointer hover:bg-gray-200 hover:text-black'
          onClick={handleCancel}
        />
      </div>
      <div className='mt-4 max-h-[60vh] overflow-auto border-b-2'>
        {comments?.length > 0 ? (
          comments?.map((item) => (
            <CommentItem
              user={data}
              key={item.id}
              comment={item}
              setEdit={setEdit}
            />
          ))
        ) : (
          <div className='text-xl my-4 font-semibold text-gray-300 text-center'>
            Chưa có bình luận nào
          </div>
        )}
      </div>

      {data.name ? (
        !edit.status && <UserComment user={data} blogId={blogId} />
      ) : (
        <div className='text-center mt-4 text-xs'>
          Bạn hãy{" "}
          <Link
            to='/login'
            className='underline text-blue-300 hover:underline hover:text-blue-500'
          >
            đăng nhập
          </Link>{" "}
          để bình luận!
        </div>
      )}
      {edit.status && (
        <div className='mt-4'>
          <div className='font-semibold text-base'>Chỉnh sửa bình luận</div>
          <div className=''>
            <UserComment
              user={data}
              blogId={blogId}
              edit={edit}
              setEdit={setEdit}
            />
          </div>
          <div className='flex justify-end'>
            <Button
              className='text-red-400 mt-2'
              onClick={() => setEdit({ status: false, content: "", id: 0 })}
            >
              Hủy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogComments;
