import axios from "axios";

export const api = axios.create({
    baseURL: "https://pizza-score.herokuapp.com"
})  