import React from "react";
import { Avatar, Rate } from "antd";

function UserRate({ rate }) {
  console.log(rate);
  return (
    <div className='w-full flex border-b-2 py-4 first:pt-0 last:border-none'>
      {rate.user.avatar ? (
        <Avatar
          className='mr-4'
          size='large'
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          src={rate.user.avatar}
        ></Avatar>
      ) : (
        <Avatar
          className='mr-4'
          size='large'
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
        >
          {rate.user.name[0]}
        </Avatar>
      )}

      <div className='flex-1 text-sm'>
        <div className=''>{rate.user.name}</div>
        <Rate disabled defaultValue={rate.rate} />
        <div className=''>{rate.content}</div>
      </div>
    </div>
  );
}

export default UserRate;
