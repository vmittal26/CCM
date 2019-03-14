import Axios from "axios";

export const axiosNodeManagement = Axios.create({
    baseURL:'http://10.174.131.112:7070/'
})


export const axiosBaseLineManagement = Axios.create({
    baseURL:'http://10.174.131.112:7071/'
})
// export default axios;