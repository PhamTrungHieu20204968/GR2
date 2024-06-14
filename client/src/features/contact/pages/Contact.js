import React from "react";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "components/Layout";

function Contact() {
  const { language } = useSelector((state) => state.auth);

  return (
    <Layout page={["contact"]}>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <div className='home__title font-semibold '>LIÊN HỆ MONA SHOP</div>
        {language === "vi" ? (
          <div className=''>
            <b className='text-red-500'>
              Số 16 ngõ 37, Lê Thanh Nghị, Hai Bà Trưng, Hà Nội
            </b>
            . Đi dọc đường Lê Thanh nghị sẽ thấy tổ dân phố 11. Đầu hẻm là
            <b className='text-blue-500'> Cửa hàng tiện lợi CircleK</b>. Bạn rẽ
            vào ngõ và đi sâu vào 300m là đến cửa hàng. Tới đây bạn sẽ thấy biển
            hiệu MonaShop.
          </div>
        ) : (
          <div>
            <b className='text-red-500'>
              ハノイ市ハイバーチュン区、レタインギー通り37番路地16番
            </b>
            。レタインギー通りを歩くと、住民組織11が見つかります。路地の入り口には
            <b className='text-blue-500'> CircleKコンビニ</b>
            があります。路地に入り、300メートル進むと店に到着します。ここでMonaShopの看板が見えるでしょう。
          </div>
        )}

        <iframe
          title='shop_map'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.824636998753!2d105.8461391317649!3d21.00103249322213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac73e2eba2cf%3A0x8e639371fcfc1fbc!2zMzcgUC4gTMOqIFRoYW5oIE5naOG7iywgQsOhY2ggS2hvYSwgSGFpIELDoCBUcsawbmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1718376664859!5m2!1svi!2s'
          className='border-none w-full h-[750px] mt-4'
          allowFullScreen=''
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />
        <div className='flex mt-16 gap-4'>
          <div className='flex-1 flex flex-col items-center'>
            <div className='group p-4 w-24 h-24 border-[3px] border-black rounded-full hover:bg-primary hover:border-primary flex items-center justify-center'>
              <EnvironmentOutlined className='text-4xl group-hover:text-white' />
            </div>
            <div className='mt-8 text-3xl font-semibold'>
              {language === "vi" ? "ĐỊA CHỈ" : "アドレス"}
            </div>
            <div className='mt-4 text-center'>
              {language === "vi"
                ? "Số 16 ngõ 37 Lê Thanh Nghị Hai Bà Trưng Hà Nội"
                : "ハノイ市ハイバーチュン区、レタインギー通り37番路地16番"}
            </div>
          </div>

          <div className='flex-1 flex flex-col items-center'>
            <div className='group p-4 w-24 h-24 border-[3px] border-black rounded-full hover:bg-primary hover:border-primary flex items-center justify-center'>
              <PhoneOutlined className='text-4xl group-hover:text-white' />
            </div>
            <div className='mt-8 text-3xl font-semibold'>
              {language === "vi" ? "ĐIỆN THOẠI" : "電話番号"}
            </div>
            <div className='mt-4 text-center'>
              {language === "vi"
                ? "HOTLINE: (+84) 965 504 095"
                : "ホットライン: (+84) 965 504 095"}
            </div>
          </div>

          <div className='flex-1 flex flex-col items-center'>
            <div className='group p-4 w-24 h-24 border-[3px] border-black rounded-full hover:bg-primary hover:border-primary flex items-center justify-center'>
              <FacebookOutlined className='text-4xl group-hover:text-white' />
            </div>
            <div className='mt-8 text-3xl font-semibold'>FACEBOOK</div>
            <div className='mt-4 text-center'>
              <Link
                to={"https://www.facebook.com/profile.php?id=61559722628923"}
              >
                FB Mona Shop
              </Link>
            </div>
          </div>

          <div className='flex-1 flex flex-col items-center'>
            <div className='group p-4 w-24 h-24 border-[3px] border-black rounded-full hover:bg-primary hover:border-primary flex items-center justify-center'>
              <MailOutlined className='text-4xl group-hover:text-white' />
            </div>
            <div className='mt-8 text-3xl font-semibold'>メール</div>
            <div className='mt-4 text-center'>phamhieu15082002@gmail.com</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
