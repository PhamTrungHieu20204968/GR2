import React from "react";
import { Carousel } from "antd";

import Layout from "components/Layout";
import ListCard from "components/ListCard";
import slider1 from "assets/imgs/slider-111.jpg";
import slider2 from "assets/imgs/slider-222.jpg";
import slider3 from "assets/imgs/slider-333.jpg";
import banner1 from "assets/imgs/banner1.jpg";
import banner2 from "assets/imgs/banner2.jpg";

function Home() {
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
          <ListCard category='pets'></ListCard>
        </section>

        <img src={banner1} alt='banner1' className='banner' />

        <section className='container mx-auto mt-8 overflow-hidden'>
          <div className='home__title fly-in'>Đồ Ăn</div>
          <ListCard category='foods'></ListCard>
        </section>

        <img src={banner2} alt='banner1' className='banner' />

        <section className='container mx-auto mt-8 overflow-hidden'>
          <div className='home__title fly-in'>Phụ kiện</div>
          <ListCard category='accessories'></ListCard>
        </section>
      </div>
    </Layout>
  );
}

export default Home;
