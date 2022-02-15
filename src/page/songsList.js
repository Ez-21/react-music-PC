import react, { useEffect, useRef, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { songSearch } from '../api/songsList';
import {Pagination} from 'antd'
import styles from '../Css/songsList.module.scss'
import singContent from './singContent';
const searchPng = require('../public/img/search.png')
export default function Songs() {
  const input = useRef(null)
  const realInp = useRef(null)
  const { name } = useParams()
  const [Ani, SetAni] = useState(false)
  const [List, SetList] = useState({})
  const Go = useNavigate()
  const [params, SetParams] = useState({
    keywords: name,
    limit: 30,
    offset: 1,
    type: 1
  })
  const SearchSong = () => {
    input.current.value = name
    // SetList({})
    songSearch(params).then(({ data }) => {
      console.log('data: ', data.result);
      SetList(data.result)
    }).catch((err) => {

    });
  }
  const search = () => {
    console.log(input.current.value)
    SetParams({ ...params, keywords: input.current.value })
  }

  const setPage = (page,pageSize)=>{
    console.log('pageSize: ', pageSize);
    console.log('page',page)
    SetParams({
      ...params,
      offset:page
    })

  }

  const searchFocus = () => {
    // realInp.current.style.setProperty('transition', 'max-height .6s ease-out,visibility 1ms .6s')
    SetAni(true)
  }

  const singContent = (item)=>{
    console.log(item);
    Go(`/SingContent/${item.id}`)
  }
  const searchBlur = () => {
    SetAni(false);
  }

  const GoMv = (value)=>{
    Go(`/MvContent/${value}`)
  }
  useEffect(() => {
    SearchSong()
  }, [params])
  console.log(List, 'jsx');
  return (
    <div className={styles.songsList}>
      <div className={styles.songsSearch}>
        <div className={styles.inpReal}>
          <div className={styles.inputBox}>
            <input type='text' ref={input} onFocus={searchFocus} onBlur={searchBlur}></input>
            <img src={searchPng} alt="" onClick={search} />
          </div>
          <div ref={realInp} className={[styles.searchList, Ani ? styles.showSearchList : ""].join(' ')}>
            <div style={{ height: 400 }}>
              lalal
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ListBox}>
        <div className={styles.Title}>
          <span>歌曲</span>
          <span>歌手</span>
          <span>专辑</span>
          <span>发行时间</span>
        </div>
        <ul className={styles.uls}>
          {
            List['songs']?.length > 0 && List['songs'].map((item, index) => (
              <li key={item.id} style={index % 2 == 0 ? { 'backgroundColor': 'rgba(0, 0, 0, 0.01)' } : null}>
                <div>
                  <span style={{color:'rgb(153, 153, 153)',marginRight:10}}>{index + 1}</span>
                  <span className={styles.songs} onClick={()=>{singContent(item)}}>
                    {item.name}
                  </span>
                  {
                    item.mv!=0&&<span className={styles.mv} onClick={()=>(GoMv(item.mv))}>mv</span>
                  }
                </div>
                <div>
                  {item.ar?.length && item.ar.map(items => (
                      <span key={items.name}>{items.name}</span>
                  ))}
                </div>
                <div>{item.al.name}</div>
                <div>{new Date(item.publishTime).toLocaleString()}</div>
              </li>
            ))
          }
        </ul>
        <div className={styles.pages}>
          <Pagination showSizeChanger={false}  showQuickJumper total={List.songCount} onChange={(page,pageSize)=>setPage(page,pageSize)} />
        </div>
      </div>
    </div>
  )
}