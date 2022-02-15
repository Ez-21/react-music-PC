import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Button,ConfigProvider} from 'antd'

// 页面======================
import Home from './page/home'
import Mv from './page/mv'
import MvContent from './page/mvContent';
import MusicHome from './page/musicHome'
import Singer from './page/singer'
import Songs from './page/songsList'
import Error from './page/Error'
import SingContent from './page/singContent'
ReactDOM.render(
<ConfigProvider locale={zhCN}>
  <Router>
    <Routes>
      <Route path='*' element={<Error></Error>}/>
      <Route path='/'  element={<Home></Home>}>
          <Route path='/Mv' element={<Mv></Mv>}/>
          <Route path='/MvContent/:moveid' element={<MvContent></MvContent>}/>
          <Route path='/MusicHome' element={<MusicHome></MusicHome>}/>
          <Route path='/Singer' element={<Singer></Singer>}/>
          <Route path='/Songs/:name' element={<Songs></Songs>}/>
      </Route>
      <Route path='/SingContent/:id' element={<SingContent></SingContent>}/>
    </Routes>
  </Router>
  </ConfigProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();