import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Card, Button,message } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrailerModal from "./Trailer";
import Router from 'next/router';

import { PlayCircleOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { movieState } from "../../store/movieState";
import { userState } from "../../store/userState";

const { Meta } = Card;

export default function DangChieu({ movies }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trailer, setTrailer] = useState('');
  const [movieDetail, setMovieDetail] = useRecoilState(movieState)
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (user._id) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user])
  const handleRedirect = (movie) => {
    setMovieDetail(movie);
    localStorage.setItem('movieDetail', JSON.stringify(movie));
    localStorage.setItem('dangChieu', JSON.stringify(true));
    Router.push('/moviedetail');
  }

  const handleRedirectBook = (movie) => {
    if(isLogin)
    {
      setMovieDetail(movie);
      localStorage.setItem('movieDetail', JSON.stringify(movie));
      Router.push('/bookticket')
    }
      else{
        message.error({ content: "Đăng nhập tài khoản để mua vé"})
      }
    
  }

  const handleShowTrailer = (event, trailer) => {
    event.stopPropagation();
    setTrailer(trailer);
    setIsModalVisible(true);
  }

  // const movies = [
  //   {
  //     title: "Lời kết bạn chết chóc",
  //     movieDuration: 120,
  //     movieImg: "http://www.movienewsletters.net/photos/VNM_276153R1.jpg",
  //     trailerUrl: "https://www.youtube.com/embed/1an-lzxR-_I",
  //   },
  //   {
  //     title: "Little Woods",
  //     movieDuration: 140,
  //     movieImg: "https://images.moviepostershop.com/little-woods-movie-poster-1000779349.jpg",
  //     trailerUrl: "https://www.youtube.com/embed/gKCxFp262uY",
  //   },
  //   {
  //     title: "After",
  //     movieDuration: 160,
  //     movieImg: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362",
  //     trailerUrl: "https://www.youtube.com/embed/rPTf0Gw5-Bg",
  //   },
  //   {
  //     title: "Doremon",
  //     movieDuration: 160,
  //     movieImg: "https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/d/o/dora2020_poster_localized-01.jpg",
  //     trailerUrl: "https://www.youtube.com/embed/rPTf0Gw5-Bg",
  //   }
  // ]
  console.log(movies);


  return (
    <>
      <Slider {...settings}>

        {movies.map(movie => {
          return (
            <div>
              <Card
                className="group mb-12"
                hoverable
                style={{ width: 240, boxShadow: "none" }}
                
                cover={
                  <div className="relative">
                    <div className="w-full bg-cover" style={{ height: 340, backgroundImage: `url(${movie.movieImg})` }}>

                    </div>

                    <div onClick={() => handleRedirect(movie)} className="bg-gray-700 absolute opacity-70 top-0 w-full h-full z-20 hidden group-hover:flex justify-center items-center">
                      <div className="text-white cursor-pointer text-xl hover:text-yellow-400"
                        onClick={(event) => handleShowTrailer(event, movie.trailerUrl)}
                      ><PlayCircleOutlined style={{ fontSize: 40 }} /></div>
                    </div>

                  </div>
                }
              >
                <Button onClick={() => handleRedirectBook(movie)} className="bg-red-500 absolute  bottom-3 left-0 w-full h-1/6 z-20 hidden group-hover:flex justify-center items-center rounded-b-2xl text-xl text-white   hover:border-red-500 border-4 border-red-500  hover:text-red-500">
                  Mua vé
                </Button>
                <Meta title={movie.title} description={`${movie.movieDuration} phút`} />
              </Card>

            </div>
          )
        })}

      </Slider>

      <TrailerModal show={isModalVisible} setShow={setIsModalVisible} trailer={trailer} />

      {/* <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        
      >
       
      </Modal> */}
    </>
  );
}
