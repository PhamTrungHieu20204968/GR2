import React, { useState } from "react";
import { Avatar, Spin, message } from "antd";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";

import CommentItem from "./CommentItem";
import { useGetUserQuery } from "app/api/userService";
import { useCreateCommentMutation } from "app/api/commentService";
function BlogComments({ blogId, comments, handleCancel }) {
  const { accessToken, userId } = useSelector((state) => state.auth);
  const [createComment] = useCreateCommentMutation();
  const [content, setContent] = useState("");
  const { data, isLoading } = useGetUserQuery({
    accessToken: accessToken,
  });
  if (isLoading) {
    return <Spin />;
  }

  const handleSubmit = () => {
    if (content.trim()) {
      console.log("submit");
      createComment({
        data: {
          content: content.trim(),
          userId,
        },
        blogId,
        headers: {
          accessToken,
        },
      })
        .then((res) => {
          if (res.data?.error) {
            message.error(res.data.error);
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <div className='flex items-center'>
        <div className='flex-1 text-center text-2xl font-semibold'>
          Danh sách bình luận
        </div>
        <CloseOutlined
          className='text-base text-gray-500 p-2 rounded-full cursor-pointer hover:bg-gray-200 hover:text-black'
          onClick={handleCancel}
        />
      </div>
      <div className='mt-4'>
        {comments?.length > 0 ? (
          comments?.map((item) => <CommentItem key={item.id} comment={item} />)
        ) : (
          <div className='text-xl font-semibold text-gray-300 text-center'>
            Chưa có bình luận nào
          </div>
        )}
      </div>

      {data.name ? (
        <div className='mt-4 flex items-center relative'>
          {data?.avatar ? (
            <Avatar
              className='mr-4'
              size='default'
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              src={data?.avatar}
            ></Avatar>
          ) : (
            <Avatar
              className='mr-4'
              size='default'
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            >
              {data?.name[0]}
            </Avatar>
          )}
          <TextArea
            placeholder='Nhập bình luận của bạn ...'
            autoSize={{
              minRows: 1,
            }}
            className='flex-1 pr-8'
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          <SendOutlined
            className='ml-1 text-lg cursor-pointer text-primary absolute right-2 bottom-0 mb-2 hover:scale-110'
            onClick={handleSubmit}
          />
        </div>
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
    </div>
  );
}

export default BlogComments;
