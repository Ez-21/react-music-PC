import react, { useEffect, useRef, useState } from "react";
import { Login, QrKey, QrCreate, QrCheck } from "../api/login";
import { SongRealTime } from "../api/musichome";
import styles from "../Css/home.module.scss";
import { Button, Input, message, Modal } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import QRCode from "qrcode.react";
import { Outlet, useNavigate } from "react-router-dom";
const { Search } = Input;

export default function () {
	const [qrValue, SetqrValue] = useState("");
	const Go = useNavigate();
	const headerShow = 0;
	const input = useRef(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [Show, SetShow] = useState(true);
	const showModal = () => {
		setIsModalVisible(true);
	};
	const [PhoneText, SetPhone] = useState("");
	const [PhonePass, SetPhonePass] = useState({
		phone: "",
		password: "",
	});

	const topList = [
		{ name: "音樂館", flag: false },
		{ name: "我的音樂", flag: false },
		{ name: "开放平台", flag: false },
	];
	const topHeader = ["歌手", "热歌榜", "MV", "新碟上架", "电台"];
	const [title, steTitle] = useState(topList);
	// 搜索按下回车
	const SearchEnter = (e) => {
		console.log("e: ", e);
		Go(`/Songs/${e}`);
	};
	// 输入框打字
	const SearchChange = (e) => {
		SongRealTime({ keywords: e.target.value })
			.then(({ data }) => {
				console.log(data, "实时数据");
			})
			.catch((err) => {});
	};
	const selectTop = (index) => {
		const ck = index;
		// setCk(index)
		if (index == ck) {
			title.map((item) => (item.flag = false));
			title[index].flag = true;
			steTitle(title);
		}
		switch (index) {
			case 0: {
				Go("/MusicHome");
				break;
			}
			default:
				break;
		}
	};
	useEffect(() => {
		console.log(input.current);
		input.current.OnFocus = () => {
			console.log(123);
		};
	});
	const userLogin = () => {
		alert(PhoneText);
		SetqrValue("12313");
		console.log(qrValue, "00000");
		setTimeout(() => {
			console.log(qrValue, "11111111111");
		}, 1000);
		return;
		Login(PhonePass)
			.then(({ data }) => {
				if (data.code != 200) {
					message.error(data.msg);
				} else {
					message.success(data.msg);
					setIsModalVisible(false);
				}
			})
			.catch((err) => {});
	};

	const qrcheck = (data) => {
		const flag = false;
		var pess = setInterval(() => {
			QrCheck({ key: data })
				.then(({ data }) => {
					if (data.code == 800) {
						message.error("二维码已过期请重新登录!");
						flag = true;
					} else if (data.code == 803) {
						message.success("登录成功!");
						setIsModalVisible(false);
						flag = true;
					}
				})
				.catch((err) => {});
		}, 400);
		if (flag) {
			clearInterval(pess);
		}
	};
	const qrcode = () => {
		QrKey()
			.then(({ data: { data } }) => {
				qrcheck(data.unikey);
				QrCreate({ key: data.unikey })
					.then(({ data: { data } }) => {
						console.log(data, "结果");
						SetqrValue(data.qrurl);
					})
					.catch((err) => {});
			})
			.catch((err) => {});
	};
	const PhoneInput = (e) => {
		// console.log('zlg='+PhonePass);
		SetPhone(e.target.value);
		console.log(e.target.value, "输入");
		setTimeout(() => {
			console.log(PhoneText, "手机号");
		}, 50);
		// SetPhonePass({
		//   password:PhonePass.password,
		//   phone:e.target.value
		// })
	};
	const hearClick = (index) => {
		console.log(index);
		switch (index) {
			case 0: {
				Go("/Singer");
				break;
			}
			case 2: {
				Go("/Mv");
				break;
			}
			default:
				break;
		}
	};
	//
	// 手机号登录
	function Phone() {
		return (
			<div className={styles.loginBox}>
				<div>
					<Input
						type="text"
						defaultValue={PhoneText}
						placeholder="请输入手机号"
						onBlur={(e) => PhoneInput(e)}
					/>
				</div>
				<div>
					<Input
						type="password"
						placeholder="请输入密码"
						value={PhonePass.password}
					></Input>
				</div>
				<Button type="primary" onClick={userLogin}>
					授权登录
				</Button>
			</div>
		);
	}
	// 二维码登录
	function QrcodeImg() {
		return (
			<div className={styles.loginBox}>
				<QRCode
					id="qrCode"
					value={qrValue}
					size={200} // 二维码的大小
					fgColor="#000000" // 二维码的颜色
					style={{ margin: "auto" }}
					imageSettings={{
						// 二维码中间的logo图片
						src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201712%2F22%2F20171222212125_4vXF2.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645610375&t=c2b09bfb1c7b77a9f566cf47b2b49dc0",
						height: 40,
						width: 40,
						excavate: true, // 中间图片所在的位置是否镂空
					}}
				/>
			</div>
		);
	}
	// const [ck,setCk] = useState(0)
	return (
		<div className={styles.homeBox}>
			<div className={styles.TopHeadList}>
				<div className={styles.homeTop}>
					<div className={styles.homeToptitle}>
						<div>
							<img src="https://y.qq.com/mediastyle/yqq/img/logo.png?max_age=2592000" />
						</div>
						{title.map((item, index) => (
							<div
								className={item.flag ? styles.ckdiv : null}
								key={item.name}
								onClick={() => selectTop(index)}
							>
								{item.name}
							</div>
						))}
					</div>
					<Modal
						visible={isModalVisible}
						footer={null}
						onCancel={() => setIsModalVisible(false)}
					>
						<p className={styles.modalTitle}>
							<span onClick={() => SetShow(true)}>手机号登录</span>
							<span onClick={() => SetShow(false) & qrcode()}>二维码登录</span>
						</p>
						{Show ? <Phone></Phone> : <QrcodeImg></QrcodeImg>}
					</Modal>
					<div className={styles.homeTopSet}>
						<div>
							<Search
								placeholder="请输入您要查询的歌曲"
								enterButton
								ref={input}
								size="large"
								onChange={(e) => {
									SearchChange(e);
								}}
								onSearch={(e) => {
									SearchEnter(e);
								}}
							/>
						</div>
						<div className={styles.userHeadImg}>
							<img
								onClick={showModal}
								src="https://thirdqq.qlogo.cn/g?b=sdk&k=EsvwYj7dS8AoN2x5EwNvvg&s=140&t=1626453179"
								alt=""
							/>
						</div>
					</div>
				</div>
				<div className={styles.homeHeader}>
					{topHeader.map((item, index) => (
						<div key={item + "a"} onClick={() => hearClick(index)}>
							{item}
						</div>
					))}
				</div>
			</div>
			<div className={styles.outlet}>
				<Outlet></Outlet>
			</div>
		</div>
	);
}
