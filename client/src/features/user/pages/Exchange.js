import React from "react";
import { Row, Spin, message } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "components/Layout";
import { useGetUserQuery } from "app/api/userService";
import { useUpdateUserMutation } from "app/api/userService";
import ExchangeItem from "../components/ExchangeItem";

const items = {
  silver: [
    {
      name: "Nhà phê bình",
      price: 0,
      type: 0, //0: title, 1: items, 2: voucher
    },
    {
      name: "Blogger",
      price: 0,
      type: 0,
    },
    {
      name: "Móc khóa",
      id: 21,
      price: 10,
      type: 1,
    },
    {
      name: "Phiếu giảm giá 5%",
      price: 50,
      percent: 5,
      type: 2,
    },
  ],
  gold: [
    {
      name: "Chiến thần mua sắm",
      price: 0,
      type: 0,
    },
    {
      name: "Phiếu giảm giá 10%",
      price: 100,
      percent: 10,
      type: 2,
    },
  ],
  platinum: [
    {
      name: "VIP",
      price: 0,
      type: 0,
    },
    {
      name: "Phiếu giảm giá 20%",
      price: 200,
      percent: 20,
      type: 2,
    },
  ],
};
const hide =
  "before:absolute before:opacity-50 before:rounded-md before:h-full before:bg-black before:z-40";
function Exchange() {
  const { accessToken, userId } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserQuery({
    accessToken: accessToken,
  });
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <Spin />;
  }

  const handleExchange = (_point, values) => {
    if (data.point < _point) {
      message.error("Bạn không đủ điểm");
      return;
    }
    update({
      data: { ...values, point: data.point - _point },
      id: userId,
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data.error);
        } else {
          message.success("Mở khóa thành công!");
        }
      })
      .catch((err) => {
        message.error("Mở khóa thất bại!");
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Row>
          <div className='uppercase text-xl'>
            <Link to='/' className='text-gray-400 font-bold hover:text-black'>
              Trang chủ
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            <span className=' font-bold'>Đổi điểm tích lũy</span>
          </div>
        </Row>
        <Row className='mt-4 mx-16 flex justify-center'>
          <div className='w-full mb-6 last:mb-0'>
            <div className='w-full text-3xl font-bold pb-2 border-b-2 flex'>
              Cấp Bạc
              {data?.rank < 1 && (
                <div className='flex'>
                  <span className='mx-2'> - </span>
                  <div
                    className='cursor-pointer hover:text-primary mr-1'
                    onClick={() => handleExchange(200, { rank: 1 })}
                  >
                    Mở khóa
                  </div>
                  <div className=''>- 200 điểm</div>
                </div>
              )}
            </div>
            <div
              className={`w-full mt-4 flex flex-wrap items-center gap-4 relative before:w-full ${
                data?.rank < 1 && hide
              }`}
            >
              {items.silver.map((item, index) => (
                <ExchangeItem
                  key={index}
                  item={item}
                  ExchangeItem={handleExchange}
                  user={data}
                />
              ))}
            </div>
          </div>
          <div className='w-full mb-6 last:mb-0'>
            <div className='w-full text-3xl font-bold pb-2 border-b-2 flex'>
              <div className=''>Cấp Vàng</div>
              {data?.rank < 2 && (
                <div className='flex'>
                  <span className='mx-2'> - </span>
                  <div
                    className='cursor-pointer hover:text-primary mr-1'
                    onClick={() => handleExchange(500, { rank: 2 })}
                  >
                    Mở khóa
                  </div>
                  <div className=''>- 500 điểm</div>
                </div>
              )}
            </div>
            <div
              className={`w-full mt-4 flex flex-wrap items-center gap-4 relative before:w-full ${
                data?.rank < 2 && hide
              }`}
            >
              {items.gold.map((item, index) => (
                <ExchangeItem
                  key={index}
                  item={item}
                  user={data}
                  ExchangeItem={handleExchange}
                />
              ))}
            </div>
          </div>
          <div className='w-full mb-6 last:mb-0'>
            <div className='w-full text-3xl font-bold pb-2 border-b-2 flex'>
              Cấp Bạch Kim
              {data?.rank < 3 && (
                <div className='flex'>
                  <div className='mx-2'> - </div>
                  <div
                    className='cursor-pointer hover:text-primary mr-1'
                    onClick={() => handleExchange(1000, { rank: 3 })}
                  >
                    Mở khóa
                  </div>
                  <div className=''>- 1000 điểm</div>
                </div>
              )}
            </div>
            <div
              className={`w-full mt-4 flex flex-wrap items-center gap-4 relative before:w-full ${
                data?.rank < 3 && hide
              }`}
            >
              {items.platinum.map((item, index) => (
                <ExchangeItem
                  key={index}
                  item={item}
                  user={data}
                  ExchangeItem={handleExchange}
                />
              ))}
            </div>
          </div>
        </Row>
      </div>
    </Layout>
  );
}

export default Exchange;
