import React from "react";
import { Carousel, Spin } from "antd";

import Layout from "components/Layout";
import ListCard from "components/ListCard";
import slider1 from "assets/imgs/slider-111.jpg";
import slider2 from "assets/imgs/slider-222.jpg";
import slider3 from "assets/imgs/slider-333.jpg";
import banner1 from "assets/imgs/banner1.jpg";
import banner2 from "assets/imgs/banner2.jpg";

import { useGetAllProductsQuery } from "app/api/productService";

function Home() {
  const { data, isError, isLoading } = useGetAllProductsQuery({
    accessToken: JSON.parse(localStorage.getItem("token")),
  });

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Layout>
      <div className='home'>
        <Carousel autoplay className='text-2xl'>
          <div>
            <img src={slider1} alt='slider1' />
          </div>
          <div>
            <img src={slider2} alt='slider2' />
          </div>
          <div>
            <img src={slider3} alt='slider3' />
          </div>
        </Carousel>
        <section className='container mx-auto mt-8 overflow-hidden'>
          <div className='home__title fly-in'>Thú cưng</div>
          <ListCard
            list={data?.filter(
              (item) =>
                item.category.name !== "ĐỒ ĂN" &&
                item.category.name !== "PHỤ KIỆN"
            )}
          ></ListCard>
        </section>

        <img src={banner1} alt='banner1' className='banner' />

        <section className='container mx-auto mt-8 overflow-hidden'>
          <div className='home__title fly-in'>Đồ Ăn</div>
          <ListCard
            list={data?.filter((item) => item.category.name === "ĐỒ ĂN")}
          ></ListCard>
        </section>

        <img src={banner2} alt='banner1' className='banner' />

        <section className='container mx-auto mt-8 overflow-hidden'>
          <div className='home__title fly-in'>Phụ kiện</div>
          <ListCard
            list={data?.filter((item) => item.category.name === "PHỤ KIỆN")}
          ></ListCard>
        </section>
      </div>
    </Layout>
  );
}

export default Home;
