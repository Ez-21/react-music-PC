import react, { useEffect, useState } from "react";
import styles from  '../Css/mv.module.scss'
import {AllMv, MvContent} from '../api/mv.js';
import {Spin,Alert} from 'antd'
import { useNavigate } from "react-router-dom";
function Mv (){
  const [inFo,SetinFo] = useState({
    area:'',
    order:'',
    type:'',
    limit:28,
    offset:0
  })
  const areaList = ['全部','内地','港台','欧美','日本','韩国']
  const typeList = ['全部','官方版','现场版','网易出品',]
  const orderList = ['最新','最热']
  const [showEd,setShowEd] = useState([])
  const [load,SetLoad] = useState(false)
  const Go = useNavigate()
  const [MvList,SetMvList] = useState([])
  const searchMv = ()=>{
    SetLoad(true)
    AllMv(inFo).then(({data}) => {
      console.log(data);
      SetMvList(MvList.concat(data.data))
    }).catch((err) => {
    }).finally(()=>{
      SetLoad(false)
    });
  }
  window.onscroll = function(e){
        // 文档显示区域高度
        const showHeight = window.innerHeight;
        // 网页卷曲高度
        const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop;
        // 所有内容高度
        const allHeight = document.body.scrollHeight;
        // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
        if (allHeight-100 <= showHeight + scrollTopHeight) {
          SetinFo({...inFo,offset:inFo.offset+1})
        };

  }
  const Searchck = (index,value)=>{
    MvList.length = 0
    switch(value){
      case 1:{SetinFo({...inFo,area:areaList[index]});break}
      case 2:{SetinFo({...inFo,type:typeList[index],});break}
      case 3:{SetinFo({...inFo,order:orderList[index]});break}
      default: break;
    }
  }
  window.scroll = function(e){
    console.log(e,'滚动数据')
  }
  const MvContent = (id)=>{
    console.log(id)
    Go(`/MvContent/${id}`)
  }
  useEffect(()=>{
    searchMv()
  },[inFo])
  return(
    <div>
        {
          load&&
          <div className={styles.loadingBox}>
            <Spin tip="加载中..."></Spin>
          </div>
        }
        <div className={styles.MvBox}>
        <div className={styles.SearchList} >
           <span>地区</span> {areaList.map((item,index)=>(<div key={index+'a'} onClick={()=>Searchck(index,1)}>{item}</div>))}
        </div>
        <div className={styles.SearchList} >
         <span>类型</span> {typeList.map((item,index)=>(<div key={index+'b'} onClick={()=>Searchck(index,2)}>{item}</div>))}
        </div>
        <div className={styles.SearchList} >
          <span>状态</span>{orderList.map((item,index)=>(<div key={index+'c'}onClick={()=>Searchck(index,3)}>{item}</div>))}
        </div>
        </div>
        <div>
          <p className={styles.title}>全部MV</p>
        </div>
        <div className={styles.MvList}>
          {
            MvList&& MvList.map(item=>(
              <div className={styles.MvMess} key={item.playCount} onClick={()=>MvContent(item.id)}>
                <div className= {styles.MvImg}>
                  <img src={item.cover} alt=""/>
                </div>
                  <p>{item.name}</p>
                  <p className={styles.briefDesc}>{item.briefDesc}</p>
                  <p className={styles.briefDesc}>{item.artistName}</p>
              </div>
            ))
          }
        </div>
    </div>
  )
}
export default  Mv;

