import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { songUrl, songLyric, songDeatil } from '../api/song'
import styles from '../Css/singContent.module.scss'
export default () => {
  const bgimg = require('../public/img/control.png')
  const audio = useRef(null)
  const [trans,SetTrans] = useState(0)
  const [play,setPlay] = useState(false)
  const { id } = useParams()
  const [details, setDeatils] = useState({})
  const [lys, setLys] = useState({})
  const [songu, setSongU] = useState({})
  const song = () => {
    songUrl({ id: id }).then(({ data:{data} }) => {
      console.log(data, '地址');
      setSongU(data[0])
    })
  }
  const lyric = () => {
    songLyric({ id: id }).then(({ data }) => {
      console.log(data, '歌词');
      console.log(data.lrc.lyric.split('\n') instanceof Array)
      // data.lrc.lyric=data.lrc.lyric.split('\n')
      setLys(data)
    })
  }
  const detail = () => {
    songDeatil({ ids: id }).then(({ data }) => {
      console.log(data, '详情');
      setDeatils(data.songs[0])
    })
  }
  const audPlay = ()=>{
      console.log('开始播放')
      if(play){
        setPlay(false)
        audio.current.pause()
      }else{
        setPlay(true)
        audio.current.play()
      }
  }
  const lineClick = (e)=>{
    console.log(e)
   console.log(e.screenX-533)
    SetTrans(e.screenX-533)
  }
  useEffect(() => {
    song()
    lyric()
    detail()
  }, [])
  console.log(audio);
  return (
    <div>
      <div className={styles.mask}></div>
      <div style={details.al ? { 'background': `url(${details['al'].picUrl})no-repeat` } : null} className={styles.bgbox}></div>
      <div className={styles.singBox} >
        <div className={styles.singTop}>
          <div className={styles.left}>
            {
              details.al && <img src={details['al'].picUrl} alt="" />
            }
          </div>
          <div className={styles.right}>
            <div>
              {
                lys?.lrc&&lys.lrc.lyric.split('\n').map(item=>(
                  <div key={item}>{item}</div>
                ))
              }
            </div>
          </div>
        </div>
        <div className={styles.singBottom}>
             <audio src={songu.url} ref={audio}></audio>
             <div className={styles.innerBottom}>
               <div className={styles.control}>
                 <div className={styles.up}></div>
                 <div className={styles.play} onClick={audPlay} style={play?{background:`url(${bgimg})`,backgroundPosition:'-28px 0px'}:null}></div>
                 <div className={styles.down}></div>
               </div>
               <div className={styles.progress}>
                 <div className={styles.liner} onClick={e=>lineClick(e)}>
                   <div className={styles.circle} style={{left:trans}} draggable></div>
                 </div>
               </div>
               <div>
                 收藏
               </div>
             </div>
        </div>
      </div>
    </div>

  )
}