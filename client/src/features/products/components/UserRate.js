import React from "react";
import { Avatar, Rate } from "antd";

function UserRate() {
  return (
    <div className='w-full flex border-b-2 py-4 first:pt-0 last:border-none'>
      <Avatar
        className='mr-4'
        size="large"
        style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
      >
        H
      </Avatar>

      <div className='flex-1 text-sm'>
        <div className=''>H@gmail.com</div>
        <Rate disabled defaultValue={2} />
        <div className=''>content</div>
      </div>
    </div>
  );
}

export default UserRate;
