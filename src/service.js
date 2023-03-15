import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

export const appService = {
  getAllItems: (url) => {
    return axios.get(`${BASE_URL}${url}`).then(({ data }) => {
      return data.json();
    });
  },
};
