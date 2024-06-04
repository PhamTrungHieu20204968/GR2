import React from "react";
import { Button, Popconfirm, Row, Spin, message } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "components/Layout";
import { useGetUserQuery } from "app/api/userService";
import { useUpdateUserMutation } from "app/api/userService";
import ExchangeItem from "../components/ExchangeItem";
import silver from "assets/imgs/silver.png";
import gold from "assets/imgs/gold.png";
import diamond from "assets/imgs/diamond.png";
import lock from "assets/imgs/lock.png";

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
      name: "Cốc nước",
      id: 22,
      price: 10,
      type: 1,
    },
    {
      name: "Phiếu giảm giá 10%",
      price: 100,
      percent: 10,
      type: 2,
    },
  ],
  diamond: [
    {
      name: "VIP",
      price: 0,
      type: 0,
    },
    {
      name: "Bát ăn",
      id: 23,
      price: 10,
      type: 1,
    },
    {
      name: "Phiếu giảm giá 20%",
      price: 200,
      percent: 20,
      type: 2,
    },
  ],
};

function Exchange() {
  const { accessToken, userId, language } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserQuery({
    accessToken: accessToken,
  });
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <Spin />;
  }

  const handleExchange = (_point, values) => {
    if (data.point < _point) {
      message.error(
        language === "vi" ? "Bạn không đủ điểm" : "ポイントが足りません"
      );
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
          if (language === "vi") {
            message.error(res.data.error);
          } else message.error("アンロックに失敗しました！");
        } else {
          message.success(
            language === "vi"
              ? "Mở khóa thành công!"
              : "アンロックに成功しました！"
          );
        }
      })
      .catch((err) => {
        message.error(
          language === "vi" ? "Mở khóa thất bại!" : "アンロックに失敗しました！"
        );
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Row>
          <div className='uppercase text-xl'>
            <Link to='/' className='text-gray-400 font-bold hover:text-black'>
              {language === "vi" ? "Trang chủ" : "ホーム"}
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            <span className=' font-bold'>
              {language === "vi" ? "Đổi điểm tích lũy" : "ポイント交換"}
            </span>
          </div>
        </Row>
      </div>
      <Row className='mt-4 p-10 flex justify-center min-h-[718px] bg-[url("https://cdn.pixabay.com/photo/2024/04/05/20/17/ai-generated-8678181_1280.jpg")] bg-no-repeat bg-cover bg-center'>
        <div className='container mx-auto mt-8 overflow-hidden'>
          <div className='w-full h-full p-6 bg-gradient-to-b from-white from-20% to-transparent rounded-3xl text-center'>
            <div className='home__title font-bold'>
              {language === "vi"
                ? "Đặc quyền thành viên"
                : "メンバーシップ特典"}
            </div>
            <div className='bg-primary/80 rounded-3xl p-4 text-white text-lg'>
              <p>
                {language === "vi"
                  ? "Hãy sử dụng điểm tích lũy để mở khóa và đổi các phần quà giá trị"
                  : "ポイントを使用して価値のある賞品をアンロックして交換しましょう"}
              </p>

              <p>
                {language === "vi"
                  ? "Điểm của bạn sẽ được quy đổi theo giá trị đơn hàng: 100.000đ = 1 điểm"
                  : "ポイントは注文金額に基づいて交換されます: 100,000 VND = 1 ポイント"}
              </p>
            </div>

            <div className='mt-4 flex gap-8'>
              <div className='flex-1 bg-gradient-to-b from-[#A9BFDF]/65 to-[#324157]/35 rounded-3xl'>
                <div className='w-full bg-gradient-to-br from-[#324157] from-15%% to-[#A9BFDF] rounded-3xl custom-shadow p-4'>
                  <div className='px-4 bg-white text-[#324157] font-bold uppercase w-fit rounded-3xl'>
                    {language === "vi" ? "Bạc" : "シルバー"}
                  </div>
                  <div className='w-full flex justify-center'>
                    <img src={silver} alt='silver' className='w-36 h-28' />
                  </div>
                </div>
                <div className='bg-white mt-6 p-2 mx-4 mb-4 rounded-3xl font-bold relative'>
                  <div className='mb-4 last:mb-0'>
                    <div className='text-primary border-b-2 border-primary pb-2 mx-2'>
                      {language === "vi" ? "Danh hiệu" : "称号"}
                    </div>
                    <div className='flex flex-wrap gap-4 mt-2'>
                      {items.silver
                        .filter((item) => item.type === 0)
                        .map((item) => (
                          <ExchangeItem
                            key={item.name}
                            item={item}
                            user={data}
                            ExchangeItem={handleExchange}
                          />
                        ))}
                    </div>
                  </div>
                  <div className='mb-4 last:mb-0'>
                    <div className='text-primary border-b-2 border-primary pb-2 mx-2'>
                      {language === "vi" ? "Vật phẩm" : "アイテム"}
                    </div>
                    <div className='flex flex-wrap gap-4 mt-2'>
                      {items.silver
                        .filter((item) => item.type === 1)
                        .map((item) => (
                          <ExchangeItem
                            key={item.name}
                            item={item}
                            user={data}
                            ExchangeItem={handleExchange}
                          />
                        ))}
                    </div>
                  </div>
                  <div className='mb-4 last:mb-0'>
                    <div className='text-primary border-b-2 border-primary pb-2 mx-2'>
                      {language === "vi" ? "Mã giảm giá" : "割引コード"}
                    </div>
                    <div className='flex flex-wrap gap-4 mt-2'>
                      {items.silver
                        .filter((item) => item.type === 2)
                        .map((item) => (
                          <ExchangeItem
                            key={item.name}
                            item={item}
                            user={data}
                            ExchangeItem={handleExchange}
                          />
                        ))}
                    </div>
                  </div>
                  {data?.rank < 1 && (
                    <div className='absolute top-0 left-0 w-full h-full bg-white/80 rounded-3xl flex items-center justify-center'>
                      <div className='w-full'>
                        <img
                          src={lock}
                          alt='lock'
                          className='h-14 mx-auto mb-4'
                        />
                        <Popconfirm
                          title={
                            language === "vi"
                              ? "Mở khóa cấp bậc"
                              : "ランクのアンロック"
                          }
                          description={
                            language === "vi"
                              ? "Bạn có muốn dùng 200 điểm để mở khóa không?"
                              : "200ポイントを使用してアンロックしますか？"
                          }
                          onConfirm={() => handleExchange(200, { rank: 1 })}
                          okText={language === "vi" ? "Có" : "はい"}
                          cancelText={language === "vi" ? "Không" : "いいえ"}
                        >
                          <Button type='primary' className='font-semibold '>
                            {language === "vi" ? "Mở khóa" : "アンロック"}
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex-1 bg-[#FFD85D]/35 rounded-3xl'>
                <div className='w-full bg-gradient-to-br from-[#D8780A] to-[#FFD85D] rounded-3xl custom-shadow p-4'>
                  <div className='px-4 bg-white text-[#D8780A] font-bold uppercase w-fit rounded-3xl'>
                    {language === "vi" ? "gold" : "ゴールド"}
                  </div>
                  <div className='w-full flex justify-center'>
                    <img src={gold} alt='gold' className='w-36 h-28' />
                  </div>
                </div>
                <div className='bg-white mt-6 p-2 mx-4 mb-4 rounded-3xl font-bold relative'>
                  <div className='mb-4 last:mb-0'>
                    <div className='text-primary border-b-2 border-primary pb-2 mx-2'>
                      {language === "vi" ? "Danh hiệu" : "称号"}
                    </div>
                    <div className='flex flex-wrap gap-4 mt-2'>
                      {items.gold
                        .filter((item) => item.type === 0)
                        .map((item) => (
                          <ExchangeItem
                            key={item.name}
                            item={item}
                            user={data}
                            ExchangeItem={handleExchange}
                          />
                        ))}
                    </div>
                  </div>
                  <div className='mb-4 last:mb-0'>
                    <div className='text-primary border-b-2 border-primary pb-2 mx-2'>
                      {language === "vi" ? "Vật phẩm" : "アイテム"}
                    </div>
                    <div className='flex flex-wrap gap-4 mt-2'>
                      {items.gold
                        .filter((item) => item.type === 1)
                        .map((item) => (
                          <ExchangeItem
                            key={item.name}
                            item={item}
                            user={data}
                            ExchangeItem={handleExchange}
                          />
                        ))}
                    </div>
                  </div>
                  <div className='mb-4 last:mb-0'>
                    <div className='text-primary border-b-2 border-primary pb-2 mx-2'>
                      {language === "vi" ? "Mã giảm giá" : "割引コード"}
                    </div>
                    <div className='flex flex-wrap gap-4 mt-2'>
                      {items.gold
                        .filter((item) => item.type === 2)
                        .map((item) => (
                          <ExchangeItem
                            key={item.name}
                            item={item}
                            user={data}
                            ExchangeItem={handleExchange}
                          />
                        ))}
                    </div>
                  </div>
                  {data?.rank < 2 && (
                    <div className='absolute top-0 left-0 w-full h-full bg-white/80 rounded-3xl flex items-center justify-center'>
                      <div className='w-full'>
                        <img
                          src={lock}
                          alt='lock'
                          className='h-14 mx-auto mb-4'
                        />
                        <Popconfirm
                          title={
                            language === "vi"
                              ? "Mở khóa cấp bậc"
                              : "ランクのアンロック"
                          }
                          description={
                            language === "vi"
                              ? "Bạn có muốn dùng 500 điểm để mở khóa không?"
                              : "500ポイントを使用してアンロックしますか？"
                          }
                          onConfirm={() => handleExchange(500, { rank: 2 })}
                          okText={language === "vi" ? "Có" : "はい"}
                          cancelText={language === "vi" ? "Không" : "いいえ"}
                        >
                          <Button type='primary' className='font-semibold '>
                            {language === "vi" ? "Mở khóa" : "アンロック"}
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex-1 bg-gradient-to-b from-[#1176B5]/10 to-[#DA05E6]/15 rounded-3xl'>
                <div className='w-full bg-gradient-to-br from-[#DA05E6] from-15%% to-[#1176B5] rounded-3xl custom-shadow p-4'>
                  <div className='px-4 bg-white text-[#1176B5] font-bold uppercase w-fit rounded-3xl'>
                    {language === "vi" ? "diamond" : "ダイヤモンド"}
                  </div>
                  <div className='w-full flex justify-center'>
                    <img src={diamond} alt='diamond' className='w-36 h-28' />
                  </div>
                </div>
                <div className='bg-white mt-6 p-2 mx-4 mb-4 rounded-3xl font-bold relative'>
                  <div className='mb-4 last:mb-0'>
                    <div className='text-primary border-b-2 border-primary pb-2 mx-2'>
                      {language === "vi" ? "Danh hiệu" : "称号"}
                    </div>
                    <div className='flex flex-wrap gap-4 mt-2'>
                      {items.diamond
                        .filter((item) => item.type === 0)
                        .map((item) => (
                          <ExchangeItem
                            key={item.name}
                            item={item}
                            user={data}
                            ExchangeItem={handleExchange}
                          />
                        ))}
                    </div>
                  </div>
                  <div className='mb-4 last:mb-0'>
                    <div className='text-primary border-b-2 border-primary pb-2 mx-2'>
                      {language === "vi" ? "Vật phẩm" : "アイテム"}
                    </div>
                    <div className='flex flex-wrap gap-4 mt-2'>
                      {items.diamond
                        .filter((item) => item.type === 1)
                        .map((item) => (
                          <ExchangeItem
                            key={item.name}
                            item={item}
                            user={data}
                            ExchangeItem={handleExchange}
                          />
                        ))}
                    </div>
                  </div>
                  <div className='mb-4 last:mb-0'>
                    <div className='text-primary border-b-2 border-primary pb-2 mx-2'>
                      {language === "vi" ? "Mã giảm giá" : "割引コード"}
                    </div>
                    <div className='flex flex-wrap gap-4 mt-2'>
                      {items.diamond
                        .filter((item) => item.type === 2)
                        .map((item) => (
                          <ExchangeItem
                            key={item.name}
                            item={item}
                            user={data}
                            ExchangeItem={handleExchange}
                          />
                        ))}
                    </div>
                  </div>
                  {data?.rank < 3 && (
                    <div className='absolute top-0 left-0 w-full h-full bg-white/80 rounded-3xl flex items-center justify-center'>
                      <div className='w-full'>
                        <img
                          src={lock}
                          alt='lock'
                          className='h-14 mx-auto mb-4'
                        />
                        <Popconfirm
                          title={
                            language === "vi"
                              ? "Mở khóa cấp bậc"
                              : "ランクのアンロック"
                          }
                          description={
                            language === "vi"
                              ? "Bạn có muốn dùng 1000 điểm để mở khóa không?"
                              : "1000ポイントを使用してアンロックしますか？"
                          }
                          onConfirm={() => handleExchange(1000, { rank: 3 })}
                          okText={language === "vi" ? "Có" : "はい"}
                          cancelText={language === "vi" ? "Không" : "いいえ"}
                        >
                          <Button type='primary' className='font-semibold '>
                            {language === "vi" ? "Mở khóa" : "アンロック"}
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Layout>
  );
}

export default Exchange;
