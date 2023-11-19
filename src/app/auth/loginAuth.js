import axios from "axios"
import pathConfig from "../config/PathConfig"

axios.defaults.withCredentials = true

export const isLogin = async () => {
    let verify = await axios.get(pathConfig.UserApi.isLogin)
    let a = verify.data.verify
    console.log(a)
    return a
}