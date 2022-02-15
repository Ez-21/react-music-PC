import axios from '../axios/axios'

export function songSearch (params){
  return axios({
    url:'/cloudsearch',
    method:'get',
    params
  })
}