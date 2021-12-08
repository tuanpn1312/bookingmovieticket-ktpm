import React from "react";

import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  AndroidOutlined,
  AppleOutlined
} from "@ant-design/icons";

import Link from "next/link";

export default function FooterWeb() {
  return (
    <div className="flex flex-row space-x-16 text-xl font-semibold ">
      <div className="flex-1 space-y-4">
        <Link href="/">
          <a className="text-3xl ">Movie</a>
        </Link>
        <p className=" text-base font-normal">
          Sản phẩm từ những sinh viên để đặt vé xem phim bom tấn 1 cách dễ dàng
          và tối ưu nhất
        </p>
        <div className=" flex flex-row space-x-3 ">
          <Link href="/">
            <FacebookOutlined style={{ fontSize: 36, color: "#3b5999" }} />
          </Link>
          <Link href="/">
            <GoogleOutlined style={{ fontSize: 36, color: "#cd201f" }} />
          </Link>
          <Link href="/">
            <YoutubeOutlined style={{ fontSize: 36, color: "#cd201f" }} />
          </Link>
          <Link href="/">
            <TwitterOutlined style={{ fontSize: 36, color: "#55acee" }} />
          </Link>
        </div>
      </div>
      <div className="flex-1">
      <a >Link</a>
      <div className="pt-4 text-base flex flex-col space-y-1 font-normal ">
          <Link href="/">
          <a >FAQ</a>
        </Link>
        <Link href="/">
          <a >Brand Guidelines</a>
        </Link>
        <Link href="/">
          <a >Thỏa thuận sử dụng</a>
        </Link>
        <Link href="/">
          <a >Chính sách bảo mật</a>
        </Link>
        </div>
      
      </div>
      <div className="flex-1">
      <a >Đối tác</a>
      <div className="pt-4 flex flex-row space-x-3 ">
      <div
              className="bg-cover"
              style={{
                width: 50,
                height: 50,
                backgroundImage: `url(https://assets.glxplay.io/images/plain/categories/1000x1000.png)`,
              }}
            ></div>
           <div
              className="bg-cover"
              style={{
                width: 50,
                height: 50,
                backgroundImage: `url(https://s3img.vcdn.vn/123phim/2018/09/404b8c4b80d77732e7426cdb7e24be20.png)`,
              }}
            ></div>
          <div
              className="bg-cover"
              style={{
                width: 50,
                height: 50,
                backgroundImage: `url(https://gigamall.com.vn/data/2019/05/06/11365490_logo-cgv-500x500.jpg)`,
              }}
            ></div>
          <div
              className="bg-cover"
              style={{
                width: 50,
                height: 50,
                backgroundImage: `url(https://s3img.vcdn.vn/123phim/2021/11/CINESTAR-5bea0d.jpg)`,
              }}
            ></div>
        </div>
      </div>
      <div className="flex-1">
      <a >Mobile App</a>
      <div className="pt-4 space-x-3"> 
          <AndroidOutlined style={{ fontSize: 36, color: "#00FF00" }}/>
          <AppleOutlined style={{ fontSize: 36}}/></div>
      
      </div>
    </div>
  );
}
