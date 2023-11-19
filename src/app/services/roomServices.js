import axios from "axios";
import pathConfig from "../config/PathConfig";

axios.defaults.withCredentials = true;

export const preloadRoomList = () => axios({
    method: 'get',
    url: pathConfig.RoomApi.list
});

export const detailRoomInfo = (id) => axios({
    method: 'get',
    url: pathConfig.RoomApi.detail + id,
});

export const deleteSelectedRoom = (id) => axios({
    method: 'delete',
    url: pathConfig.RoomApi.detail + id,
});

export const createRoom = async (data) => axios({
    method: 'post',
    url: pathConfig.RoomApi.create,
    data: data,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const editRoom = async (data) => axios({
    method: 'post',
    url: pathConfig.RoomApi.edit,
    data: data,
    headers: {
        'Content-Type': 'application/json'
    }
});