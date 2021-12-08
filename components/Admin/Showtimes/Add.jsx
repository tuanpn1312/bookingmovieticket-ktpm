import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Radio, Button, Select, message, RangePicker } from "antd";
import moment from 'moment';

import apiService from "../../../utils/api/apiService";

const { Option } = Select;

const AdminShowtimeAdd = () => {
  const [rooms, setRooms] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]);

  const key = "fetching";
  const onAddShowtime = async (values) => {
    try {
      message.loading({ content: "Đang cập nhật", key });
      await apiService.post(`/showtimes`, { ...values, status: true });
      message.success({ content: `Đã thêm suất chiếu`, key });
    } catch (error) {
      message.error({ content: "Có lỗi xảy ra", key });
    }
  };

  const getMovies = async () => {
    try {
      const response = await apiService.get("/movies/getallmovie");
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCinemas = async () => {
    try {
      const response = await apiService.get("/cinemas/getAllCinemas");
      setCinemas(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRooms = async () => {
    try {
      const response = await apiService.get("/rooms");
      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
    getCinemas();
    getRooms();
  }, []);
  return (
    <>
      <Form
        onFinish={onAddShowtime}
        layout="vertical"
        className="w-4/12 mx-auto"
      >
        <Form.Item
          label="Phim"
          name="movies"
          rules={[{ required: true, message: "Phim không được để trống!" }]}
        >
          <Select placeholder="Chọn phim">
            {movies.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Rạp"
          name="cinemas"
          rules={[{ required: true, message: "Rạp không được để trống!" }]}
        >
          <Select placeholder="Chọn rạp">
            {cinemas.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.cinemaName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Phòng"
          name="rooms"
          rules={[{ required: true, message: "Phòng không được để trống!" }]}
        >
          <Select placeholder="Chọn phòng">
            {rooms.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.nameRoom}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Giá không được để trống!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày công chiếu"
          name="startDate"
          rules={[
            { required: true, message: "Ngày công chiếu không được để trống!" },
          ]}
        >
          <DatePicker placeholder="Chọn ngày" format="DD/MM/YYYY HH:mm" showTime={{ format: 'HH:mm' }}
          />
        </Form.Item>
        <Form.Item
          label="Ngày ngừng chiếu"
          name="endDate"
          rules={[
            {
              required: true,
              message: "Ngày ngừng chiếu không được để trống!",
            },
          ]}
        >
          <DatePicker placeholder="Chọn ngày" format="DD/MM/YYYY HH:mm" showTime={{ format: 'HH:mm' }}
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit">
            Thêm suất chiếu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdminShowtimeAdd;
