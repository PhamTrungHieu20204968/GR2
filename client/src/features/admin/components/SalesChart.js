import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Select, Spin } from "antd";
import { useSelector } from "react-redux";
import { useGetStatisticsQuery } from "app/api/orderService";

const days = [7, 30, 90];
function SalesChart() {
  const [type, setType] = useState(0);
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  const { data, isError, isLoading } = useGetStatisticsQuery({
    accessToken,
  });

  useEffect(() => {
    if (data && !data.error) {
      const time = new Date();
      const arr = Array(days[type]).fill(0);
      time.setDate(time.getDate() - days[type]);
      data?.forEach((element) => {
        const orderTime = new Date(element.updatedAt);
        const diffTime = Math.abs(orderTime - time);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < days[type]) {
          arr[diffDays] += element.totalMoney;
        }
      });
      setYValues(arr);
      setXValues(
        arr.reduce((res, item, index) => {
          return [...res, `Ngày ${index + 1}`];
        }, [])
      );
    }
  }, [data, type]);

  if (isLoading) {
    return <Spin />;
  }
  return (
    <div className='w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
      <div className='w-full flex items-center justify-between mb-4'>
        <div className='flex-shrink-0'>
          <span className='text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white'>
            {yValues
              .reduce((res, item) => {
                return (res += item);
              }, 0)
              .toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
          </span>
        </div>
        <div className='flex items-center justify-end flex-1 text-base font-medium text-green-500 dark:text-green-400'>
          <h3 className='text-base font-light text-gray-500 dark:text-gray-400 mt-2'>
            <Select
              defaultValue={0}
              style={{
                width: 160,
              }}
              onChange={(value) => setType(value)}
              options={[
                {
                  value: 0,
                  label: "7 ngày gần nhất",
                },
                {
                  value: 1,
                  label: "30 ngày gần nhất",
                },
                {
                  value: 2,
                  label: "90 ngày gần nhất",
                },
              ]}
            />
          </h3>
        </div>
      </div>
      <Chart
        options={{
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: xValues,
            tickAmount: 7,
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "12px",
                fontWeight: 500,
              },
              formatter: function (value) {
                return value.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                });
              },
            },
          },
          title: {
            text: "Doanh thu cửa hàng",
            style: {
              fontFamily: "Roboto",
            },
          },
        }}
        series={[
          {
            name: "price",
            data: yValues,
          },
        ]}
        type='line'
        height='300'
      />
    </div>
  );
}

export default SalesChart;
