import axios from "axios";
import Cookies from "js-cookie";

const apiService = axios.create({

    baseURL: "/api",

    headers: {
        Authorization: `Bearer ${Cookies.get("bkcookie")}`,
    },
});

export default apiService;
