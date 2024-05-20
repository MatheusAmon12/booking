import axios from "axios";

export const baseURL = () => axios.create({
    // utilizar esta abordagem apenas para desenvolvimento
    //baseURL: "http://localhost:10000/api/",
    baseURL: "https://booking-api-sdsh.onrender.com/api/",
})