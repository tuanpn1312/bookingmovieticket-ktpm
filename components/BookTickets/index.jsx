import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/Default";
import Router from "next/router";
import { Modal, Radio, Button, Select, Descriptions, Space, message } from "antd";

import { useRecoilState } from "recoil";

import apiService from "../../utils/api/apiService";
import { movieState } from "../../store/movieState";
import moment from "moment";
import classNames from "classnames";

import numberFormat from '../../utils/modules/numberFormat';
import { userState } from "../../store/userState";
export default function BookTicket() {
  const [showtimes, setShowtimes] = useState([]);
  const [movieDetail, setMovieDetail] = useRecoilState(movieState);
  const [user, setUser] = useRecoilState(userState);
  const [validCinema, setValidCinema] = useState([]);
  const [selectCinema, setSelectCinema] = useState(null);
  const [infoselectCinema, setInfoSelectCinema] = useState([]);
  const [filterRoom, setFilterRoom] = useState([]);
  const [selectShowtimes, setSelectShowtimes] = useState(null);
  const [infoselectShowtimes, setInfoSelectShowtimes] = useState([]);
  const [seats, setSeats] = useState([]);
  const [price, setPrice] = useState(0);
  const [selectSeats, setSelectSeats] = useState([]);

  const key = 'fetching';

  const getShowtimes = async () => {
    try {
      const response = await apiService.get("/showtimes");
      setShowtimes(response.data);
      const filterCinema = response.data.map((showtime) => {
        return { ...showtime.cinemas[0] };
      })
      //lọc các rạp giống nhau cùng 1 bộ phim
      const removeDuplicateCinema = [];
      filterCinema.map((cinema) => {
        const isDuplicate = removeDuplicateCinema.find(item => item._id === cinema._id);
        if (!isDuplicate) {
          removeDuplicateCinema.push(cinema);
        }
      })

      setValidCinema(removeDuplicateCinema)
    } catch (error) {
      console.log(error);
    }
  };
  //chọn chỗ
  const handleSelectSeat = ({ id, status }) => {
    const temp = [...selectSeats];
    console.log(temp);
    console.log(seats);
    console.log(id);
    if (!seats[id - 1].status) {
      if (!temp.includes(id)) {
        temp.push(id);
      } else {
        temp.splice(temp.indexOf(id), 1);
      }
      setSelectSeats(temp);
    }

  }
  // bán vé
  const onAddBill = async () => {
    try {
      message.loading({ content: "Đang cập nhật", key });
      await apiService.post(`/bills`, {
        cinemaName: infoselectCinema.cinemaName, movieTitle: movieDetail.title, seat: selectSeats, room: infoselectShowtimes.nameRoom,
        showTimeId: selectShowtimes, price: (price * selectSeats.length), showTime: moment(infoselectShowtimes.startDate).format("DD/MM/YYYY HH:mm")
      });
      showModal();
      message.success({ content: `Đã mua vé thành công`, key });
    } catch (error) {
      message.error({ content: "Có lỗi xảy ra", key })
    }
  }
  //modal bill
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectShowtimes(null);
    setSelectCinema(null);
    setPrice(0);
    setSelectSeats([]);
  };

  useEffect(() => {
    const movie = JSON.parse(localStorage.getItem("movieDetail"));

    if (movie) {
      setMovieDetail(movie);
    }
  }, []);

  useEffect(() => {
    if (selectCinema) {
      const validRooms = showtimes.map((showtime) => {
        return { ...showtime.rooms[0], endDate: showtime.endDate, startDate: showtime.startDate, idShowTimes: showtime._id, seats: showtime.seats, price: showtime.price };
      })
      //lọc room của 1 rạp có suất chiếu duy nhất
      const filterRoom = validRooms.filter((room) => room.cinemas === selectCinema);
      const removeDuplicateRooms = [];
      filterRoom.map((room) => {
        const isDuplicate = removeDuplicateRooms.find(item => item._id === room._id && item.startDate === room.startDate && item.endDate === room.endDate);
        if (!isDuplicate) {
          removeDuplicateRooms.push(room);
        }
      })
      setFilterRoom(removeDuplicateRooms);
      // lấy thông tin của rạp đã chọn
      setInfoSelectCinema(...validCinema, ...selectCinema);
    }
  }, [selectCinema])

  useEffect(() => {
    if (selectShowtimes) {
      const room = filterRoom.find(room => room.idShowTimes === selectShowtimes);
      setSeats(room.seats);
      setPrice(room.price);
      const showtimesData = showtimes.map((showtime) => {
        return {
          ...showtime.rooms[0],
          ...showtime,
          rooms: showtime.rooms[0]?._id,
        };
      });
      setInfoSelectShowtimes(...showtimesData, ...selectShowtimes);
    }
  }, [selectShowtimes])

  useEffect(() => {
    getShowtimes();
  }, [movieDetail]);

  const options = [
    {

      label: "ZaloPay",
      value: "zalo",
    },
    { label: "ShopeePay", value: "shopee" },
    { label: "Momo", value: "momo" },
  ];

  const { Option } = Select;

  return (
    <DefaultLayout>
      <div className="flex font-sans">
        {/* left */}
        <div className="space-y-4 w-3/4">
          <div className="py-2 items-center border-blue-300 border-4 px-10 rounded-2xl mt-5">
            <Select value={selectCinema} placeholder="Chọn rạp" className="w-full my-2" onChange={(cinemaId) => {
              setSelectCinema(cinemaId)
              setSelectShowtimes(null)
            }}>
              {validCinema.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.cinemaName}
                </Option>
              ))}
            </Select>
            <Select placeholder="Chọn suất chiếu" className="w-full my-2"
              value={selectShowtimes}
              disabled={selectCinema ? false : true}
              onChange={(idShowtimes) => setSelectShowtimes(idShowtimes)}>
              {filterRoom.map((room) => (
                <Option key={room.idShowTimes} value={room.idShowTimes}>
                  {moment(room.startDate).format("DD/MM/YYYY HH:mm")} - {moment(room.endDate).format("HH:mm")}
                </Option>
              ))}
            </Select>
          </div>
          <div className="bg-gray-200 h-3/4 w-full flex-row pt-3 space-y-20 rounded-2xl">
            <div className="w-8/9 h-12 bg-gray-300 mx-36 text-center text-xl rounded-xl">
              Màn hình
            </div>
            {selectShowtimes && <Space className="px-20" size={[90, 50]} wrap>
              {seats.map((seat) => (
                <div
                  onClick={() => handleSelectSeat(seat)}
                  className={classNames("w-8 h-8 flex items-center justify-center rounded-lg", {
                    "cursor-not-allowed bg-red-300 text-gray-400 block": seat.status,
                    "cursor-pointer bg-gray-300 text-gray-600": !selectSeats.includes(seat.id),
                    "cursor-pointer bg-green-300 text-gray-500": selectSeats.includes(seat.id),
                  })}>
                  {seat.id}
                </div>
              ))}
            </Space>}
          </div>

          <div className="border-green-300 border-4 h-32 flex-row pt-3 rounded-2xl space-y-5">
            <div className="text-center text-lg">Thông tin chỗ ngồi</div>
            <div className="flex space-x-5 pl-20">
              <div className=" w-8 h-8 bg-gray-300 text-center rounded-lg" />
              <p className=" text-base pr-20">Ghế trống</p>
              <div className=" w-8 h-8 bg-green-300 text-center rounded-lg" />
              <p className=" text-base pr-20">Ghế bạn chọn</p>
              <div className=" w-8 h-8 bg-red-300 text-center rounded-lg" />
              <p className=" text-base">Ghế đã có người đặt</p>
            </div>

            <div className="flex space-x-6 mx-16"></div>
          </div>
        </div>

        {/* right */}
        <div className=" w-1/4 h-full mx-8 flex-row space-y-4">
          <div
            className=" bg-cover mt-5"
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
          <Radio.Group defaultValue="zalo" options={options} optionType="button" className="" />
          <div className="flex">
            <div className="flex-auto text-xl font-medium ">Giá</div>
            <div className="text-xl  ">{numberFormat(price * selectSeats.length)} đ</div>
          </div>
          <Button
            onClick={() => onAddBill()}
            htmlType="submit"
            disabled={selectSeats.length !== 0 ? false : true}
            className=" top-3 bg-red-500  left-0 w-full h-1/5 z-20 justify-center items-center rounded-2xl text-xl text-white   hover:border-red-500 border-4 border-red-500  hover:text-red-500"
          >
            Thanh toán
          </Button>
        </div>
        <Modal title="Hóa đơn" visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <Descriptions>
            <Descriptions.Item label="Tên" >{user.fullName}</Descriptions.Item>
            <Descriptions.Item label="Sđt" span={2}>{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Phim" span={3}>{movieDetail.title}</Descriptions.Item>
            <Descriptions.Item label="Rạp">{infoselectCinema && infoselectCinema.cinemaName}</Descriptions.Item>
            <Descriptions.Item label="Phòng" span={2}>
              {infoselectShowtimes && infoselectShowtimes.nameRoom}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày" span={3} >{infoselectShowtimes && moment(infoselectShowtimes.startDate).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Giờ Bắt đầu">{infoselectShowtimes && moment(infoselectShowtimes.startDate).format("HH:mm")}</Descriptions.Item>
            <Descriptions.Item label="Giờ Kết thúc" span={2}>{infoselectShowtimes && moment(infoselectShowtimes.endDate).format("HH:mm")}</Descriptions.Item>
            <Descriptions.Item label="Số vé" span={3}>{selectSeats.length}</Descriptions.Item>
            <Descriptions.Item label="Giá 1 vé" span={3}> {numberFormat(price)}</Descriptions.Item>
            <Descriptions.Item label="Giá">{numberFormat(price * selectSeats.length)}</Descriptions.Item>

          </Descriptions>
        </Modal>
      </div>
    </DefaultLayout>
  );
}
