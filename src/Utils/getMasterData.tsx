import axios from "../config/axiosKTMConfig";

export default async(url:string)=> {
  const response = await axios.get(url);
  return response.data;
}
