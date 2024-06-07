import React, { useState } from "react";
import { Row, Col, Radio } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "components/Layout";
import SideBar from "../components/SideBar";
import CreateBlog from "../components/CreateBlog";
import ListBlog from "../components/ListBlog";
import { useGetAllBlogsQuery } from "app/api/blogService";
function Blogs() {
  const [tab, setTab] = useState(1);
  const { accessToken, userId, language } = useSelector((state) => state.auth);
  const { data } = useGetAllBlogsQuery();
  const [filter, setFilter] = useState({ userName: "", title: "", tag: "" });
  return (
    <Layout page={["blogs"]}>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Row>
          <div className='uppercase text-xl'>
            <Link to='/' className='text-gray-400 font-bold hover:text-black'>
              {language === "vi" ? "Trang chủ" : "ホーム"}
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            <span className=' font-bold'>
              {language === "vi" ? "Bài viết" : "ブログ"}
            </span>
          </div>
        </Row>
        <Row className='mt-4' gutter={16}>
          <Col span={5}>
            <SideBar
              tab={tab}
              setTab={setTab}
              setFilter={setFilter}
              filter={filter}
            />
          </Col>
          <Col span={19}>
            {tab === 1 && (
              <div className='text-lg my-2 flex items-center gap-4 pb-2 border-b-2'>
                <div className=''>
                  {language === "vi" ? "Các tag phổ biến:" : "人気のタグ："}
                </div>
                <Radio.Group
                  onChange={(value) =>
                    setFilter((prev) => ({ ...prev, tag: value.target.value }))
                  }
                  value={filter.tag}
                >
                  <Radio value='Chăm sóc chó'>Chăm sóc chó</Radio>
                  <Radio value='Chăm sóc mèo'>Chăm sóc mèo</Radio>
                </Radio.Group>
              </div>
            )}

            {tab === 1 && <ListBlog key={1} data={data} filter={filter} />}
            {tab === 2 && (
              <ListBlog
                key={2}
                data={data.filter((item) => item.userId === userId)}
                filter={filter}
              />
            )}
            {tab === 3 && (
              <ListBlog
                key={3}
                data={data.filter(
                  (blog) =>
                    blog.likes.filter(
                      (item) =>
                        item.blogId === blog.id && item.userId === userId
                    ).length > 0
                )}
                filter={filter}
              />
            )}
            {tab === 4 && <CreateBlog accessToken={accessToken} />}
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Blogs;
