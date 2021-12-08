import React, { useState, useEffect }  from "react";
import { Carousel } from "antd";
import apiService from "../../utils/api/apiService";
import TrailerModal from "./Trailer";
import { PlayCircleOutlined } from "@ant-design/icons";

export default function HomeBanner() {
  const [topMovies, setTopMovies] = useState([]);


  const getTopMovies = async () => {
    if (topMovies.length === 0) {
      const response = await apiService.get("/movies/topmovies");
      setTopMovies(response.data);
    }
  };
  useEffect(() => {
    getTopMovies();
  });



  const handleShowTrailer = (event, trailer) => {
    event.stopPropagation();
    setTrailer(trailer);
    setIsModalVisible(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trailer, setTrailer] = useState("");

  return (
    <div>
      <Carousel autoplay dots="false">
        {topMovies.map((movie) => {
          return (
            <div>
              <div className="relative">
                <div
                  className="bg-cover z-30"
                  hoverable
                  style={{
                    width: 'auto',
                    height: "650px",
                    color: "#fff",
                    lineHeight: "160px",
                    textAlign: "center",
                    backgroundImage: `url(${movie.bannerImg})`,
                  }}
                ></div>
                <div className="bg-gray-700 absolute opacity-70 top-0 w-full h-full z-40 hidden group-hover:flex justify-center items-center">
                  <div
                    className="text-white cursor-pointer text-xl hover:text-yellow-400"
                    onClick={(event) =>
                      handleShowTrailer(event, movie.trailerUrl)
                    }
                  >
                    <PlayCircleOutlined style={{ fontSize: 40 }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
      <TrailerModal
        show={isModalVisible}
        setShow={setIsModalVisible}
        trailer={trailer}
      />
    </div>
  );
}
