import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: "http://localhost:5000",//process.env.VUE_APP_BASE_URL // Set your base URL here
  headers:{
    ['Authorization'] : `Bearer ${Cookies.get("token")}`
  }
});
// Interceptors for handling common scenarios
instance.interceptors.response.use(
  response =>response,
  error => {
    if (error.response.status === 401) {
      // Redirect to unauthorized page
      // You can use Vue Router to navigate
      console.log("401 error handled")
    } else if (error.response.status === 404) {
      // Redirect to not found page
      // You can use Vue Router to navigate
      console.log("404 error handled")
    }
    else if (error.response.status == 500){
      console.log("500 error handled");
    }
    return Promise.reject(error);
  }
);


export default instance;
