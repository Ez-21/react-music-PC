import request from '../axios/axios'
export function MusicTbale(){
  return request({
    url:'/playlist/hot',
    method:'GET'
  })
}


export function MusicTbaleList(cat){
  return request({
    url:'/top/playlist',
    method:'GET',
    params:{
      cat:cat,
      limit:5,
      offset:1
    }
  })
}

export function SongList(id){
  return request({
    url:'/top/song',
    method:'GET',
    params:{
      type:id||96
    }
  })
}