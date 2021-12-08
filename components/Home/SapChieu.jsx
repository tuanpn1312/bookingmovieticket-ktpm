import React, { useState } from "react";
import Slider from "react-slick";
import { Button, Card } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrailerModal from "./Trailer";
import Router from 'next/router';

import { PlayCircleOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { movieState } from "../../store/movieState";

const { Meta } = Card;

export default function SapChieu({ movies }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows:2,
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trailer, setTrailer] = useState('');
  const [movieDetail, setMovieDetail] = useRecoilState(movieState)

  const handleRedirect = (movie) => {
    setMovieDetail(movie);
    localStorage.setItem('movieDetail', JSON.stringify(movie));
    localStorage.setItem('dangChieu', JSON.stringify(false));
    Router.push('/moviedetail');
  }

  const handleShowTrailer = (event, trailer) => {
    event.stopPropagation();
    setTrailer(trailer);
    setIsModalVisible(true);
  }

 

  return (
    <>
      <Slider  {...settings}>

        {movies.map(movie => {
          return (
            <div>
              <Card
                className="group mb-12"
                hoverable
                style={{ width: 240 }}
                onClick={() => handleRedirect(movie)}
                cover={
                  <div className="relative">
                    <div className="w-full bg-cover" style={{ height: 340, backgroundImage: `url(${movie.movieImg})` }}>

                    </div>
                    <div className="bg-gray-700 absolute opacity-70 top-0 w-full h-full z-20 hidden group-hover:flex justify-center items-center">
                      <div className="text-white cursor-pointer text-xl hover:text-yellow-400"
                        onClick={(event) => handleShowTrailer(event, movie.trailerUrl)}
                      ><PlayCircleOutlined style={{ fontSize: 40 }} /></div>
                    </div>
                  </div>
                }
              >
                    
                <Meta title={movie.title} description={`${movie.movieDuration} phút`} >
                </Meta>
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