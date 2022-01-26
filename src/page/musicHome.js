import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MusicTbale, MusicTbaleList, SongList } from "../api/musichome";
import { Carousel } from "antd";
import styles from "../Css/musicHome.module.scss";
export default function () {
	const [singTableTag, setSingTableTag] = useState([]);
	const [oneList, SetOneList] = useState([]);
	const [TenList,setTenList] = useState([])
	const contentStyle = {
		height: '400px',
		color: '#fff',
		lineHeight: '160px',
		textAlign: 'center',
		background: '#364d79',
		display:'flex',
		flexWrap:'wrap',
		justifyContent:'space-between',
		div:{
			display:'flex',
			justifyContent:'space-between',
			alignItems: 'center',
			width:'400px',
			height:'100px',
			background: '#fff',
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
	const quickSong = () => {
		SongList()
			.then(({ data }) => {
				for(let i = 0;i<data.data.length;i++){
					TenList[i]=data.data.splice(0,9)
				}
				setTenList(TenList)
				console.log(TenList ,'?');
			})
			.catch((err) => {});
	};
	useEffect(() => {
		singTable();
		singTableCk();
		quickSong();
	}, []);
	return (
		<div className={styles.musicbox}>
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
						<span key={item.name} onClick={() => {}}>
							{item.name}
						</span>
					))}
				</div>
				<div className={styles.swiperBox}>
					<Carousel autoplay>
						{/* <div>
							<h3 style={contentStyle}>1</h3>
						</div> */}
						{TenList.length != 0 &&
							TenList.map((item,index)=> {
								<div key={item[0].id}>
									{
										TenList[index].map(item=>{
											<h3 style={contentStyle}>
												<div style={contentStyle.div}>
													<img src={item.album.picUrl} alt="" style={{'width':'86px','height':'86px'}}/>
												</div>
											</h3>
										})
									}
								</div>
							})
						}
					</Carousel>
				</div>
			</div>
		</div>
	);
}
