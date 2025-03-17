import axios from "axios";
import { setServerStatus } from "../../store/server.store";
import { getAccessToken } from "../../store/profile.store";

const base_url = "http://localhost:8081/api/";

export const request = async (url = "", method = "get", data = {}) => {
  
  var access_token = getAccessToken();
  return axios 
    ({
      url: base_url + url,
      method: method,
      data: data,
      headers: {
        Authorization: "Bearer " + access_token,
      }, 
    })
      .then((res) => { 
        setServerStatus(200);
        return res.data; 
      })
      .catch((err) => {

        var response = err.response; 
        if (response) { 
          var status = response.status; 
          if (status == "401") { 
            status = 403; 
          }
          setServerStatus(status);
        } else if (err.code == "ERR_NETWORK") { 
          setServerStatus("error"); 
        }
        console.log(">>>", err);
        return false;
      }); 
    }; 