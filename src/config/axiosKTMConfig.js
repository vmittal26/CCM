import Axios from "axios";

const axios = Axios.create({
    baseURL:'http://169.144.13.211:8080/'
})

export default axios;