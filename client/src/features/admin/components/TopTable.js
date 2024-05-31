import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { useGetTopSaleQuery } from "app/api/orderService";

import TopTableItem from "./TopTableItem";

function TopTable() {
  const [tab, setTab] = useState(0);
  const [tableData, setTableData] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  const { data, isError, isLoading } = useGetTopSaleQuery({
    accessToken,
  });
  useEffect(() => {
    if (data && !data.error) {
      const arr = [];
      if (tab === 0) {
        data?.forEach((element) => {
          let p = -1;
          arr.forEach((e, i) => {
            if (e.productId === element.productId) {
              p = i;
            }
          });
          if (p === -1) {
            arr.push({
              ...element,
              totalSale: element.quantity * parseInt(element.product.price),
            });
          } else {
            arr[p].totalSale +=
              element.quantity * parseInt(element.product.price);
          }
        });
      } else {
        data?.forEach((element) => {
          if (element?.order?.userId) {
            let p = -1;
            arr.forEach((e, i) => {
              if (e.order.userId === element.order.userId) {
                p = i;
              }
            });
            if (p === -1) {
              arr.push({
                ...element,
                totalSale: element.quantity * parseInt(element.product.price),
              });
            } else {
              arr[p].totalSale +=
                element.quantity * parseInt(element.product.price);
            }
          }
        });
      }
      setTableData(
        arr.sort(function (a, b) {
          return b.totalSale - a.totalSale;
        })
      );
    }
  }, [data, tab]);

  console.log(tableData);
  if (isLoading) {
    return <Spin />;
  }
  return (
    <div className='w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
      <h3 className='flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
        Thống kê tháng này
      </h3>
      <ul
        className='hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400'
        id='fullWidthTab'
        data-tabs-toggle='#fullWidthTabContent'
        role='tablist'
      >
        <li className='w-full'>
          <button
            id='faq-tab'
            data-tabs-target='#faq'
            type='button'
            role='tab'
            aria-controls='faq'
            aria-selected='false'
            className={
              tab === 0
                ? "inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none text-blue-500 hover:text-blue-600 dark:text-gray-400 border-gray-100 hover:border-gray-300"
                : "inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300"
            }
            onClick={() => setTab(0)}
          >
            Top products
          </button>
        </li>
        <li className='w-full'>
          <button
            id='about-tab'
            data-tabs-target='#about'
            type='button'
            role='tab'
            aria-controls='about'
            aria-selected='true'
            className={
              tab === 1
                ? "inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none text-blue-500 hover:text-blue-600 dark:text-gray-400 border-gray-100 hover:border-gray-300"
                : "inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300"
            }
            onClick={() => setTab(1)}
          >
            Top Customers
          </button>
        </li>
      </ul>
      <div className='mt-4'>
        {tableData?.map((item) => (
          <TopTableItem item={item} tab={tab} />
        ))}
      </div>
    </div>
  );
}

export default TopTable;
