import axios from "axios";

export const baseURL = () => axios.create({
    baseURL: "https://booking-api-sdsh.onrender.com/api/",
})