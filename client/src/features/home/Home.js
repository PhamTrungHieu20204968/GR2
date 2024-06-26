import React from "react";
import { Carousel } from "antd";
import { useSelector } from "react-redux";

import Layout from "components/Layout";
import ListCard from "components/ListCard";
import slider1 from "assets/imgs/slider-111.jpg";
import slider2 from "assets/imgs/slider-222.jpg";
import slider3 from "assets/imgs/slider-333.jpg";
import banner1 from "assets/imgs/banner1.jpg";
import banner2 from "assets/imgs/banner2.jpg";
import ReCommentProducts from "./components/ReCommentProducts";

function Home() {
  const { language } = useSelector((state) => state.auth);
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
        <ReCommentProducts />
        <section className='container mx-auto mt-8 overflow-hidden'>
          <div className='home__title fly-in'>
            {language === "vi" ? "Thú cưng" : "ペット"}
          </div>
          <ListCard category='pets'></ListCard>
        </section>

        <img src={banner1} alt='banner1' className='banner' />

        <section className='container mx-auto mt-8 overflow-hidden'>
          <div className='home__title fly-in'>
            {language === "vi" ? "Đồ ăn" : "料理"}
          </div>
          <ListCard category='foods'></ListCard>
        </section>

        <img src={banner2} alt='banner1' className='banner' />

        <section className='container mx-auto mt-8 overflow-hidden'>
          <div className='home__title fly-in'>
            {language === "vi" ? "Phụ kiện" : "アクセサリー"}
          </div>
          <ListCard category='accessories'></ListCard>
        </section>
      </div>
    </Layout>
  );
}

export default Home;
