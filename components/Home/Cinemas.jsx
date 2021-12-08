import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import apiService from "../../utils/api/apiService";

const { TabPane } = Tabs;
export default function Cinemas() {
  const [tab, setTab] = useState("Galaxy");
  const [cinemas, setCinemas] = useState([]);
  const [tab1, setTab1] = useState("");
  const [showtimes, setShowtimes] = useState([]);

  const getCinemas = async () => {

    const response = await apiService.get("/cinemas/getAllCinemas");
    setCinemas(response.data);
    // console.log(response.data);
  };
  const getShowtimes = async () => {

    const response = await apiService.get("/showtimes");
    setShowtimes(response.data);
    console.log(response.data);
  };

  const handleChangeTab = (key) => {
    setTab(key);
  }
  const handleChangeTab1 = (key) => {
    setTab1(key);
  }
  useEffect(() => {
    getCinemas();
    getShowtimes();
  }, []);

  return (
    <>
      <Tabs defaultActiveKey={tab} type="card" centered onChange={handleChangeTab}>
        <TabPane
          tab={
            <div
              className="bg-cover"
              style={{
                width: 60,
                height: 60,
                backgroundImage: `url(https://assets.glxplay.io/images/plain/categories/1000x1000.png)`,
              }}
            ></div>
          }
          key="Galaxy"
        >
        </TabPane>
        <TabPane
          tab={
            <div
              className="bg-cover"
              style={{
                width: 60,
                height: 60,
                backgroundImage: `url(https://s3img.vcdn.vn/123phim/2018/09/404b8c4b80d77732e7426cdb7e24be20.png)`,
              }}
            ></div>
          }
          key="Lotte"
        ></TabPane>
        <TabPane
          tab={
            <div
              className="bg-cover"
              style={{
                width: 60,
                height: 60,
                backgroundImage: `url(https://gigamall.com.vn/data/2019/05/06/11365490_logo-cgv-500x500.jpg)`,
              }}
            ></div>
          }
          key="CGV"
        ></TabPane>
        <TabPane
          tab={
            <div
              className="bg-cover"
              style={{
                width: 60,
                height: 60,
                backgroundImage: `url(https://s3img.vcdn.vn/123phim/2021/11/CINESTAR-5bea0d.jpg)`,
              }}
            ></div>
          }
          key="CineStar"
        ></TabPane>
      </Tabs>
      <Tabs defaultActiveKey={tab1} type="card" tabPosition="left" onChange={handleChangeTab1}>
        {cinemas.filter(cinema => cinema.cinemaType === tab).map((cinema) => {
          console.log(cinema);
          return (
            <TabPane
              tab={
                <div className=" flex font-sans">
                  <div
                    className=" bg-cover"
                    style={{
                      width: 60,
                      height: 60,
                      backgroundImage: `url(${cinema.imgUrl})`,
                    }}
                  ></div>
                  <div className="pl-5 flex-col">
                    <div className="text-sm font-medium">
                      {cinema.cinemaName}
                    </div>
                    <div className="text-sm">
                      {cinema.cinemaAddress}
                    </div>

                  </div>
                </div>
              }
              key={cinema._id}
            >
            </TabPane>
          )
        })}
      </Tabs>
      {/* <Tabs tabPosition="left" >
        {showtimes.filter(showtime => showtime.cinemaName === tab1).map((showtime) => {
          return (
            <TabPane
              tab={
                <div className=" flex font-sans">
                  <div
                    className=" bg-cover"
                    style={{
                      width: 60,
                      height: 60,
                      backgroundImage: `url(${showtime.imgUrl})`,
                    }}
                  ></div>
                  <div className="pl-5 flex-col">
                    <div className="text-sm font-medium">
                      {showtime.title}
                    </div>
                    <div className="text-sm">
                      {showtime.movieDuration}
                    </div>

                  </div>
                </div>
              }
              key="{cinema.cinemaName}"
            >
            </TabPane>
          )
        })}
      </Tabs> */}
    </>
  );
}
