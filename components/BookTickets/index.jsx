import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/Default";
import Router from "next/router";
import { Checkbox, Radio, Button, Form, Select, DatePicker, Space } from "antd";
import autoprefixer from "autoprefixer";

import { useRecoilState } from "recoil";

import apiService from "../../utils/api/apiService";
import { movieState } from "../../store/movieState";

export default function BookTicket() {
  const [showtimes, setShowtimes] = useState([]);
  const [movieDetail, setMovieDetail] = useRecoilState(movieState);
  const [seats, setSeat] = useState([]);

  const getShowtimes = async () => {
    try {
      const response = await apiService.get("/showtimes");
      const showtimesData = response.data.map((showtime) => {
        return {
          ...showtime.movies[0],
          ...showtime.cinemas[0],
          ...showtime.rooms[0],
          ...movieDetail,
          ...showtime,
          movieDetail: showtime.movies[0]?._id,
          cinemas: showtime.cinemas[0]?._id,
          rooms: showtime.rooms[0]?._id,
        };
      });
      setShowtimes(showtimesData);
    } catch (error) {
      console.log(error);
    }
  };

  const getSeat = (showtimes) => {
    // setSeat(showtimes.seats);
  };

  useEffect(() => {
    const movie = JSON.parse(localStorage.getItem("movieDetail"));

    if (movie) {
      setMovieDetail(movie);
    }
  }, []);

  useEffect(() => {
    getShowtimes();
  }, []);

  const options = [
    {
      image:
        "https://thuthuatmaytinh.vn/wp-content/uploads/2019/02/ZaloPay-logo.png",
      label: "ZaloPay",
      value: "Apple",
    },
    { label: "ShopeePay", value: "Pear" },
    { label: "Momo", value: "Orange" },
  ];

  const { Option } = Select;

  return (
    <DefaultLayout>
      <div className="flex font-sans">

        {/* left */}
        <div className="space-y-4 w-3/4">
          <Form
            layout="vertical"
            className="flex pt-5 items-center space-x-5 border-blue-300 border-4 px-5  rounded-2xl mt-5"
            onFinish={getSeat(showtimes)}
          >
            <Form.Item
              className="w-full"
              label="Suất chiếu"
              name="showtimes"
              rules={[{ required: true, message: "Phim không được để trống!" }]}
            >
              <Select placeholder="Chọn suất chiếu" className="w-full">
                {showtimes.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.title}, {item.startDate},{item.cinemaName},
                    {item.nameRoom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit">
                Chọn
              </Button>
            </Form.Item>
          </Form>

          <div className="bg-gray-200 h-3/4 w-full flex-row pt-3 space-y-20 rounded-2xl">
            <div className="w-8/9 h-12 bg-gray-300 mx-36 text-center text-xl rounded-xl">
              Màn hình
            </div>
            <Space className="mx-16" size={[20, 20]} wrap>
              {showtimes.map((item) => (
                <div className="w-8 h-8 bg-gray-300 text-center text-lg rounded-lg">
                  {item.seats[0].id}
                </div>
              ))}
            </Space>
          </div>

          <div className="border-green-300 border-4 h-32 flex-row pt-3 rounded-2xl space-y-5">
            <div className="text-center text-lg">Thông tin chỗ ngồi</div>
            <div className="flex space-x-5 px-72">
            <div className=" w-8 h-8 bg-gray-300 text-center rounded-lg"/>
            <p className=" text-base pr-20">Ghế trống</p>
            <div className=" w-8 h-8 bg-red-300 text-center rounded-lg"/>
            <p className=" text-base">Ghế đã có người đặt</p>
            </div>
           
            <div className="flex space-x-6 mx-16"></div>
          </div>
        </div>

        {/* right */}
        <div className=" w-1/4 h-full mx-8 flex-row space-y-4">
          <div
            className=" bg-cover"
            style={{
              width: 300,
              height: 450,
              backgroundImage: `url(${movieDetail.movieImg})`,
            }}
          ></div>

          <div className="text-3xl font-medium  text-center ">
            {movieDetail.title}
          </div>
          <div className="text-xl font-medium ">Thanh toán bằng ví</div>
          <Radio.Group options={options} optionType="button" className="" />
          <div className="flex">
            <div className="flex-auto text-xl font-medium ">Giá</div>
            <div className="text-xl  ">60.000</div>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className=" top-3 bg-red-500  left-0 w-full h-1/5 z-20 justify-center items-center rounded-2xl text-xl text-white   hover:border-red-500 border-4 border-red-500  hover:text-red-500"
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
}
