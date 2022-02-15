import react, { useCallback, useEffect, useLayoutEffect, useState,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { MusicTbale, MusicTbaleList, SongList,Banner } from "../api/musichome";
import { Carousel } from "antd";
import styles from "../Css/musicHome.module.scss";
export default function () {
	const mouted = useRef(true);
	const [singTableTag, setSingTableTag] = useState([]);
	const [oneList, SetOneList] = useState([]);
	const [TenList,setTenList] = useState([])
	const [bannerList,setBannerList] = useState([])
	const contentStyle = {
		width:'100%',
		height: '400px',
		color: '#fff',
		display:'flex',
		flexWrap:'wrap',
		justifyContent:'space-between',
		// background:'#fff',
		h3InnerBox:{
			display:'flex',
			alignItems: 'center',
			padding:'0 20px 0 0 ',
			width:'30%',
			height:'95px',
			background: '#fff',
			color:'#000',
			fontSize:'13px',
			whiteSpace: 'nowrap',
			overflow:'hidden',
  		cursor: 'pointer',
			borderRadius:'9px'
		},
	};
	const region = [
		{
			name: "华语",
			id: 7,
			flag: false,
		},
		{
			name: "欧美",
			id: 96,
			flag: false,
		},
		{
			name: "日本",
			id: 8,
			flag: false,
		},
		{
			name: "韩国",
			id: 16,
			flag: false,
		},
	];
	const [area, setArea] = useState(region);

	function digital(num) {
		num = String(num);
		if (num.length >= 5) {
			return num.substring(0, num.length - 4);
		} else {
			return num;
		}
	}
	// banner图
	const banner = ()=>{
		Banner().then(({data}) => {
			console.log(data,'banner');
			setBannerList(data.banners)
		}).catch((err) => {
			
		});
	}
	// 热门歌单
	const singTable = () => {
		MusicTbale()
			.then(({ data }) => {
				console.log(data);
				data.tags.map((item) => (item.flag = false));
				setSingTableTag(data.tags);
			})
			.catch((err) => {});
	};
	const singTableCk = (value, key) => {
		console.log(value);
		let names;
		if (!value) {
			names = "华语";
		} else {
			names = value.name;
		}
		MusicTbaleList(names)
			.then(({ data }) => {
				console.log(data.playlists);
				SetOneList(data.playlists);
			})
			.catch((err) => {});
	};
	const quickSong = async (id) => {
		return new Promise(res=>{
			if(TenList.length!=0){
				setTenList([])
			}
			SongList(id).then(({ data }) => {
				for(let i = 0;i<data.data.length;i++){
					TenList[i]=data.data.splice(0,9)
				}
				if(mouted.current){
						setTenList(TenList)
					}
				console.log(TenList ,'TenList');
			})
			.catch((err) => {})
		}) 
	};
	const newSongs = (value)=>{
		quickSong(value.id);
	}
	useEffect(() => {
		banner();
		quickSong();
		singTable();
		singTableCk();
	}, []);
	return (
		<div className={styles.musicbox}>
			<div className={styles.listbox}>
			<Carousel autoplay>
				{
					bannerList.map(item=>(
						<div key={item.id}>
								<img src={item.imageUrl} alt="" style={{width:'100%'}}/>
						</div>
					))
				}
			</Carousel>
			</div>
			<div className={styles.listbox}>
				<div className={styles.title}>歌单推荐</div>
				<div className={styles.tags}>
					{singTableTag &&
						singTableTag.map((item, index) => (
							<span
								key={item.id}
								onClick={() => {
									singTableCk(item, index);
								}}
							>
								{item.name}
							</span>
						))}
				</div>
				<div className={styles.TagBox}>
					{oneList.map((item) => (
						<div key={item.name}>
							<img src={item.coverImgUrl} alt="" />
							<main>{item.name}</main>
							<span>播放量:{digital(item.playCount)}万</span>
						</div>
					))}
				</div>
			</div>
			<div className={styles.listbox}>
				<div className={styles.title}>新歌速递</div>
				<div className={styles.rgion}>
					{area.map((item, index) => (
						<span key={item.name} onClick={() => {newSongs(item)}}>
							{item.name}
						</span>
					))}
				</div>
				<div className={styles.swiperBox}>
					<Carousel >
						{
							TenList&&TenList.length!=0&&TenList.map((item,index)=> (
								<div key={index + 'a'}>
									<h3 style={contentStyle} >
										{
											TenList[index]&&TenList[index].map(items => (
												<div key={items.name} style={contentStyle.h3InnerBox}> 
													<img src={items.album.picUrl} alt="" style={{ 'width': '86px', 'height': '100%','marginRight':'7px' }} />
													<div style={{'display':'flex','flexDirection':'column',}}>
														<p>
															{items.name}
														</p>
														<p>
															{items.artists.map(vals=>(
																<span style={{'color':'#999','fontSize':'12px','marginRight':'4px'}} key={vals.name}>{vals.name},</span>
															))}
														</p>
													</div>
												</div>
											))
										}
									</h3>
								</div>
							))
						}
					</Carousel>
				</div>
			</div>
		</div>
	);
}
