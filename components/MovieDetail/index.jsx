import React, { useEffect, useState } from "react";
import Router from "next/router";
import classNames from "classnames";
import { Progress, Button, message } from "antd";
import { useRecoilState } from "recoil";

import DefaultLayout from "../../layouts/Default";
import Information from "./Information";
import Evaluate from "./Evaluate";

import { movieState } from "../../store/movieState";
import { userState } from "../../store/userState";

import apiService from "../../utils/api/apiService";

import numberFormat from '../../utils/modules/numberFormat';

export default function MovieDetail() {
  const [tab, setTab] = useState("noi-dung");
  const [hover, setHover] = useState(false);
  const [movieDetail, setMovieDetail] = useRecoilState(movieState);
  const [dangchieu, setDangchieu] = useState([]);
  const [comments, setComment] = useState([]);
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useState(false);
  //const [tbStar, setTbStar] = useState('');

  useEffect(() => {
    if (user._id) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user])

  const getComment = async () => {
    const response = await apiService.get(`/ratings/${movieDetail._id}`);
    setComment(response.data);
    // console.log(comments);
    // var total = 0;
    //    for (var i = 0; i < comments.length; i++) {
    //           total = total + comments[i].star;
    //         }
    // setTbStar( total*100/comments.length);
    // console.log(tbStart);
  };

  useEffect(() => {
    const movie = JSON.parse(localStorage.getItem("movieDetail"));

    if (!movie && !movieDetail._id) {
      Router.push("/");
    }
    getComment();
  }, [movieDetail]);

  useEffect(() => {
    const movie = JSON.parse(localStorage.getItem("movieDetail"));
    const dangchieu = JSON.parse(localStorage.getItem("dangChieu"));
    if (dangchieu) {
      setDangchieu(true);
    } else {
      setDangchieu(false);
    }
    if (movie) {
      setMovieDetail(movie);
    }
  }, []);

  const handleRedirectBook = (movie) => {
    if (isLogin) {
      setMovieDetail(movie);
      localStorage.setItem('movieDetail', JSON.stringify(movie));
      Router.push('/bookticket');
    }
    else {
      message.error({ content: "Đăng nhập tài khoản để mua vé" })
    }

  }

  const averageRating = comments.reduce((prev, curr) => prev + curr.star, 0) / comments.length;
  return (
    <DefaultLayout>
      <div className="pt-20 flex font-sans">
        <div
          className="ml-24 flex-none bg-cover"
          style={{
            width: 240,
            height: 340,
            backgroundImage: `url(${movieDetail.movieImg})`,
          }}
        ></div>
        <div className="p-5 flex-col">
          <div className="text-base">{movieDetail.startDate}</div>
          <div className="text-3xl font-medium">{movieDetail.title}</div>
          <div className="text-base">
            {movieDetail.movieDuration} phút - 0 IMDB -{" "}
            {movieDetail.movieFormat}
          </div>
          {dangchieu && (
            <Button onClick={() => handleRedirectBook(movieDetail)} className="top-3 bg-red-500  left-0 w-36 h-1/6 z-20 justify-center items-center rounded-2xl text-xl text-white   hover:border-red-500 border-4 border-red-500  hover:text-red-500" >
              Mua vé
            </Button>
          )}
          {!dangchieu && <></>}
        </div>
        <div className="flex-col pl-80">
          <Progress
            strokeWidth="8"
            width={170}
            className=" right-0 flex-1"
            type="circle"
            percent={averageRating * 10}
            format={percent => `${numberFormat(percent / 10, 1)}/10`}
          />
          <div className="px-10 pt-3 text-base">{comments.length} đánh giá</div>
        </div>
      </div>

      <div>
        <div
          className="mb-12 text-center text-xl font-normal"
          style={{ fontFamily: "muli,sans-serif" }}
        >
          <div className="inline-block mt-12 mr-10">
            <p
              className={classNames(
                "cursor-pointer",
                {
                  "text-2xl text-red-500": tab === "noi-dung",
                },
                {
                  "text-2xl": hover === "noi-dung",
                }
              )}
              onClick={() => setTab("noi-dung")}
            >
              Nội dung
            </p>
          </div>
          <div className="inline-block ">
            <p
              className={classNames("cursor-pointer", {
                "text-2xl text-red-500": tab === "danh-gia",
              })}
              onClick={() => setTab("danh-gia")}
            >
              Đánh giá
            </p>
          </div>
        </div>
        <div className="mx-16 px-16 py-16 text-base border-2 shadow-md">
          {tab === "noi-dung" && <Information movieDetail={movieDetail} />}
          {isLogin && tab === "danh-gia" && <Evaluate movieDetail={movieDetail} comments={comments} user={user} getComment={getComment} />}
          {!isLogin && tab === "danh-gia" && <div className="text-center text-xl">Đăng nhập để đánh giá</div>}
        </div>
      </div>
    </DefaultLayout>
  );
}
