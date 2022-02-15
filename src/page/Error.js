import react, { useEffect } from "react";
import styles from '../Css/Error.module.scss'
import {Modal} from 'antd'
import { useNavigate } from "react-router-dom";
const Er = require('../public/img/404.jpg')
export default function Error(){
  const Go = useNavigate()
   
  useEffect(()=>{
    setTimeout(() => {
      Modal.success({
        title:'提示',
        content:"是否要回到首页?",
        onOk:()=>{
          Go('/',{replace:true})
        }
      })
    }, 1900);
    return()=>{
      Modal.destroy()
    }
  })
  return (
    <div className={styles.ErrorBox}>
        <img src={Er}/>
    </div>  
  )
}