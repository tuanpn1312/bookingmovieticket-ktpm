import React, { useEffect, useState } from "react";
import Router from 'next/router';
import Link from 'next/link'
import { Layout, Menu, Input, Button, Dropdown, message } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import FooterWeb from "./footer";

import { userState } from "../store/userState";
import apiService from "../utils/api/apiService";
const { Header, Footer, Content } = Layout;

export default function DefaultLayout({ children }) {
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (user._id) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user])

  const handleLogout = async () => {
    try {
      const response = await apiService.get('/users/logout');
      message.success(response.data.message);
      setUser({})
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  }

  const handleChangeTab = (tab) => {
    switch (tab) {
      case 'admin':
        Router.push('/admin');
        break;

      default:
        break;
    }
  }

  const handleRedirect = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    Router.push('/userdetail');
  }

  const menu = (
    <Menu onClick={({ key: tab }) => handleChangeTab(tab)} inlineCollapsed="false">
      <Menu.Item key="0" disabled>
        <a className="text-black">Xin chào, {user.fullName} </a>
      </Menu.Item>
      {user?.role === "admin" && <Menu.Item key="admin">
        <a>Trang quản trị</a>
      </Menu.Item>}
      <Menu.Item key="1">
        <a>Xem hóa đơn</a>
      </Menu.Item>
      <Menu.Item key="2"  onClick={() => handleRedirect(user)}>
        <a>Sửa thông tin</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}><a>Đăng xuất</a></Menu.Item>
    </Menu>
  );

  return (
    <Layout className="rounded-xl p-8 md:p-0 ">
      <div className="sticky z-50 top-0">
        <Header className="flex justify-between items-center shadow-xl text-black bg-white opacity-90">
          <div className=" flex space-x-6 items-center">
            <div className="text-xl">
              <Link href="/">
                <a >Movie</a>
              </Link>
            </div>
            <div className=" flex">
              <Input
                className=" h-auto w-36 rounded-l-xl"
                placeholder="Tìm kiếm"
              />
              <Button
                className=" w-8 rounded-r-xl bg-gray-300 border-none"
                type="primary"
                icon={<SearchOutlined style={{ color: "Black", fontSize: 13 }} />}
              />
            </div>
          </div>
          <Menu
            className="Menu"
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">
              Lịch chiếu
            </Menu.Item>
            <Menu.Item key="2">
              Cụm rạp
            </Menu.Item>
            <Menu.Item key="3">
              Tin tức
            </Menu.Item>
          </Menu>
          {!isLogin && <div className=" flex space-x-3">
            <Button onClick={() => Router.push('/login')} className="LogIn rounded-full h-9 border-solid border-2 border-light-gray-600">
              Đăng nhập
            </Button>
            <Button onClick={() => Router.push('/register')} className="SignUp rounded-full h-9 text-white bg-blue-500 border-solid border-2 border-light-gray-600">
              Đăng kí
            </Button>
          </div>}

          {isLogin && <div className="justify-items-center" >
            <Dropdown overlay={menu} placement="bottomRight">
              <Button className="ant-dropdown-link rounded-full w-9 h-9  text-white  bg-green-500" icon={<SettingOutlined style={{ fontSize: 18 }} />} onClick={e => e.preventDefault()}>
              </Button>
            </Dropdown>
          </div>}
        </Header>
      </div>

      <Content>
        <div className="bg-white pb-32">
          <div style={{ minHeight: 650 }} className=" w-10/12 mx-auto">
            {children}
          </div>
        </div>
      </Content>
      <Footer>
        <FooterWeb/>
        <div className="pt-20 text-center">
        ©Trang web của project Movies
        </div>
      </Footer>
    </Layout>
  );
}
