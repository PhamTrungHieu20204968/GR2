import { Avatar } from "antd";
import React from "react";

function TopTableItem({ item, tab }) {
  const avatar =
    tab === 0 ? item?.product?.images[0].url : item.order.user?.avatar;
  console.log(item);
  return (
    <div className='flex justify-between mb-2 pb-2 border-b-2 last:pb-0 last:border-b-0 items-center'>
      <div className='flex gap-2 items-center'>
        <div className=''>
          {avatar ? (
            <Avatar
              className='text-center self-center'
              size='large'
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              src={avatar}
            ></Avatar>
          ) : (
            <Avatar
              className='text-center self-center'
              size='large'
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            >
              U
            </Avatar>
          )}
        </div>
        <div className=''>
          <div className='line-clamp-1 max-w-52 font-semibold'>
            {tab === 0 ? item.product.name : item.order.user.name}
          </div>
          <div className=''>
            {tab === 0
              ? item.product.category.name
              : item.order.user?.email || "Không có"}
          </div>
        </div>
      </div>
      <div className='font-semibold'>
        {item.totalSale.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}
      </div>
    </div>
  );
}

export default TopTableItem;
