import request from '../axios/axios'
export function Login(params){
  return request({
    url:'/login/cellphone',
    method:'get',
    params
  })
}
export function QrKey(){
  return request({
    url:'/login/qr/key',
    method:'get',
  })
}
export function QrCreate(params){
  return request({
    url:'/login/qr/create',
    method:'get',
    params
  })
}
export function QrCheck(params){
  return request({
    url:'/login/qr/check',
    method:'get',
    params
  })
}