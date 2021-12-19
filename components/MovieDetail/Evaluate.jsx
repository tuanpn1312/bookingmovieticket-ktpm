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
const { TextArea } = Input;

export default function Evaluate({ movieDetail, comments, user, getComment }) {


  const key = 'fetching';
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


  const onAddComment = async (values) => {
    try {
      message.loading({ content: "Đang cập nhật", key });
      await apiService.post(`/ratings`, { ...values, star: values.star * 2, movieId: movieDetail._id, account: user, rateDate: moment() });
      getComment();
      message.success({ content: `Đã thêm bình luận`, key });
    } catch (error) {
      message.error({ content: "Có lỗi xảy ra", key })
    }
  }


  return (
    <div>
      <Comment
        author={user.fullName}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
      />

      <Form onFinish={onAddComment} layout="vertical" className="mx-auto">
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
                datetime={moment(comment.rateDate).format("DD/MM/YYYY HH:mm")}
              />
              <div className="relative">
                <StarOutlined
                  style={{ color: "Yellow", fontSize: 55 }}
                />
                <a className="absolute text-xs transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{comment.star}/10</a>
              </div>
            </li>
          );
        })}
      </List>
    </div>
  );
}
