import axios from "axios";

const base_url = "http://localhost:8081/api/";

export const request = async (url = "", method = "get", data = {}) => {
  return axios 
    ({
      url: base_url + url,
      method: method,
      data: data,
      headers: {}, 
    })
      .then((res) => { 
        return res.data; 
      })
      .catch((err) => {
        alert("Error Fetch API"); 
      }); 
    }; 