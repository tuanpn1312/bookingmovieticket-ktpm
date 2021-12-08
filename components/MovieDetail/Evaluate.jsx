import React, { useState, useEffect } from "react";
import {
  Comment,
  Tooltip,
  List,
  Avatar,
  Form,
  Input,
  Button,
  Rate,
   message
} from "antd";
import { StarOutlined } from "@ant-design/icons";
import moment from "moment";
import { useRecoilState } from "recoil";

import apiService from "../../utils/api/apiService";
import { comment } from "postcss";
import { userState } from "../../store/userState";
const { TextArea } = Input;

export default function Evaluate({ movieDetail }) {
  const [comments, setComment] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  const key = 'fetching';
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const getComment = async () => {
    const response = await apiService.get(`/ratings/${movieDetail._id}`);
    setComment(response.data);
  };

  const onAddComment = async (values) => {
    try {
        message.loading({ content: "Đang cập nhật", key });
        await apiService.post(`/ratings`, { ...values, movieId: movieDetail._id, account: user, rateDate:moment().format('DD/MM/YYYY')  });
        getComment();
        message.success({ content: `Đã thêm bình luận`, key });
    } catch (error) {
        message.error({ content: "Có lỗi xảy ra", key })
    }
}

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUser(user);
    }
    getComment();
  }, []);
  return (
    <div>
      <Comment
        author={user.fullName}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
      />

      <Form   onFinish={onAddComment} layout="vertical" className="mx-auto">
        <Form.Item
         name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
         label="Điểm"
         name="star">
          {/* <InputNumber min="1" max="10" /> */}
          <Rate />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Add Comment
          </Button>
        </Form.Item>
      </Form>

      <List className="comment-list" itemLayout="horizontal">
        {comments.map((comment) => {
          return (
            <li className="flex items-center">
              <Comment
                className="flex-auto"
                author={comment.account[0].fullName}
                avatar={"https://joeschmoe.io/api/v1/random"}
                content={comment.description}
                datetime={comment.rateDate}
              />
              <div className="">
                <StarOutlined
                  className="absolute hidden"
                  style={{ color: "Yellow", fontSize: 50 }}
                />
                <a className="px-5">{comment.star*2}</a>
              </div>
            </li>
          );
        })}
      </List>
    </div>
  );
}
