import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";


export default function Information({ movieDetail }) {
  return (
    <div >
      <Row>
        <Col flex="40%">
          <Row>
            <Col className="font-medium" flex="40%">Ngày công chiếu</Col>
            <Col flex="auto">{movieDetail.startDate}</Col>
          </Row>
          <Row>
            <Col className="font-medium" flex="40%">Đạo diễn</Col>
            <Col flex="auto">{movieDetail.direction}</Col>
          </Row>
          <Row>
            <Col className="font-medium" flex="40%">Diễn viên</Col>
            <Col flex="auto">{movieDetail.cast}</Col>
          </Row>
          <Row>
            <Col className="font-medium" flex="40%">Thể Loại</Col>
            <Col flex="auto">{movieDetail.category}</Col>
          </Row>
          <Row>
            <Col className="font-medium" flex="40%">Định dạng</Col>
            <Col flex="auto">{movieDetail.movieFormat}</Col>
          </Row>
          <Row>
            <Col className="font-medium" flex="40%">Quốc Gia SX</Col>
            <Col flex="auto">{movieDetail.national}</Col>
          </Row>

        </Col>
        <Col flex="60%">
          <Row className="pl-40">
            <Col span={18} push={6}>
              {movieDetail.description}
            </Col>
            <Col className="font-medium" span={6} pull={18}>Nội dung</Col>
          </Row>
        </Col>

      </Row>
    </div>
  );
}
