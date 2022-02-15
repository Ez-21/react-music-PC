import request from '../axios/axios'
export function songUrl(params){
  return request({
    url:'/song/url',
    method:'get',
    params
  })
}
export function songLyric(params){
  return request({
    url:'/lyric',
    method:'get',
    params
  })
}

export function songDeatil(params){
  return request({
    url:'/song/detail',
    method:'get',
    params
  })
}