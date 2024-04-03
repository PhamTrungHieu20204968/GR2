import { Avatar } from "antd";
import React from "react";

function CommentItem({ comment }) {
  console.log(comment);

  function getDate(time) {
    const today = new Date(time);
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  return (
    <div className='flex mb-4'>
      <div className=''>
        {comment.user.avatar ? (
          <Avatar
            className='mr-4'
            size='large'
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            src={comment.user.avatar}
          ></Avatar>
        ) : (
          <Avatar
            className='mr-4'
            size='large'
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          >
            {comment.user.name[0]}
          </Avatar>
        )}
      </div>
      <div className='flex-1'>
        <div className='bg-gray-200 rounded-lg p-2 text-base'>
          <div className='font-semibold'>{comment.user.name}</div>
          <div className=''>{comment.content}</div>
        </div>
        <div className='text-xs flex gap-2'>
          <span className=''>{getDate(comment.createdAt)}</span>
          <span className='font-bold hover:underline cursor-pointer'>
            Thích
          </span>
          <span className='font-bold hover:underline cursor-pointer'>
            Phản hồi
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
