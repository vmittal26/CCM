import Axios from "axios";

const axios = Axios.create({
    baseURL:'http://169.144.15.172:8080/'
})

export default axios;