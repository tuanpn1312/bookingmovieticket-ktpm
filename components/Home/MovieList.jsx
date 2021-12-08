import React, { useEffect } from "react";
import classNames from "classnames";
import { useState } from "react";
import DangChieu from "./DangChieu";
import SapChieu from "./SapChieu";
import apiService from "../../utils/api/apiService";

export default function MovieList() {
  const [tab, setTab] = useState("dang-chieu");
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [hover, setHover] = useState(false);

  const getMovies = async (tab) => {
    switch (tab) {
      case 'dang-chieu':
        if (nowShowingMovies.length === 0) {
          const response = await apiService.get('/movies/nowshowing');
          setNowShowingMovies(response.data);
        }
        break;

      case 'sap-chieu':
        if (comingSoonMovies.length === 0) {
        const responseComingSoon = await apiService.get('/movies/comingsoon');
        setComingSoonMovies(responseComingSoon.data);
        }
        break;
    }
  }

  useEffect(() => {
    getMovies(tab);
  }, [tab])

  return (
    <div className="pb-12">
      <div className="text-center mb-16 text-xl font-normal" style={{ fontFamily: "muli,sans-serif" }}>
        <div className="inline-block mt-12 mr-10"
        >
          <p
            className={classNames("cursor-pointer", {
              "text-2xl text-red-500": tab === "dang-chieu",
            }, {
              "text-2xl": hover === "dang-chieu",
            })}
            onClick={() => setTab("dang-chieu")}
          >
            Đang Chiếu
          </p>
        </div>
        <div className="inline-block "
        >
          <p
            className={classNames("cursor-pointer", {
              "text-2xl text-red-500": tab === "sap-chieu",
            })}
            onClick={() => setTab("sap-chieu")}
          >
            Sắp Chiếu
          </p>
        </div>
      </div>
      <div>
        {tab === "dang-chieu" && <DangChieu movies={nowShowingMovies} />}
        {tab === "sap-chieu" && <SapChieu movies={comingSoonMovies}/>}
      </div>
    </div>
  );
}
