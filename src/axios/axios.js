import axios from 'axios'
const sever = axios.create({
  baseURL:'http://localhost:3000',
  method:'GET',
  headers:{
    "Content-Type": 'application/json',
  },
  transformRequest:[(data)=>{
    return JSON.stringify(data)
  }]
})
export default sever;
