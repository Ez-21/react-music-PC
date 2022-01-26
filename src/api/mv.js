import axios from "../axios/axios"
export function AllMv(params){
  return axios({
    url:'/mv/all',
    method:'get',
    params
  })
}
export function MvContent(params){
  return axios({
    url:'/mv/detail',
    method:'get',
    params
  })
}

export function MvUrl(params){
  return axios({
    url:'/mv/url',
    method:'get',
    params
  })
}
export function MvInfo(params){
  return axios({
    url:'/mv/detail/info',
    method:'get',
    params
  })
}
export function MvComment(params){
  return axios({
    url:'/comment/mv',
    method:'get',
    params
  })
}