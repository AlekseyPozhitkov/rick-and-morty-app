import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api" // базовый URL для всех запросов
});
