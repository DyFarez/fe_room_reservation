import axios from "axios";
import pathConfig from "../config/PathConfig";

axios.defaults.withCredentials = true;

export const preloadUserData = () => axios({
    method: 'get',
    url: pathConfig.UserApi.user
});

export const loginUser = (data) => axios({
    method: 'post',
    url: pathConfig.UserApi.login,
    data,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerUser = (data) => axios({
    method: 'post',
    url: pathConfig.UserApi.register,
    data,
    headers: {
        'Content-Type': 'application/json'
    }
});