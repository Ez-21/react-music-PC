import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MvContent, MvUrl, MvInfo, MvComment } from "../api/mv";
import { Button, Input } from "antd";

import styles from "../Css/mvContent.module.scss";
export default function () {
	const { moveid } = useParams();
	const [TextData, setTextData] = useState({ videoUrl: "" });
	const [videourl, setVideourl] = useState("");
	const [infoMess, setInfoMess] = useState({});
	const [comments, setComments] = useState({
		comments: [], 
	});
	console.log("moveid: ", moveid);
	const content = () => {
		MvContent({ mvid: moveid })
			.then(({ data: { data } }) => {
				console.log(data, "?");
				setTextData(data);
				info();
				url();
				comment();
			})
			.catch((err) => {});
	};
	const url = () => {
		MvUrl({ id: moveid })
			.then(({ data: { data } }) => {
				console.log(data, "地址");
				console.log("TextData: ", TextData);
				setVideourl(data.url);
			})
			.catch((err) => {});
	};
	const info = () => {
		MvInfo({ mvid: moveid })
			.then(({ data }) => {
				console.log(data, "数据");
				setInfoMess(data);
			})
			.catch((err) => {});
	};
	const comment = () => {
		MvComment({ id: moveid, limit: 20, offset: 1 })
			.then(({ data }) => {
				console.log(data);
				setTimeout(setComments(data), 3000);
			})
			.catch((err) => {});
	};
	useEffect(() => {
		content();
	}, []);
	return (
		<div className={styles.MvBox}>
			<div className={styles.VideoBox}>
				<div className={styles.innerBox}>
					<video controls src={videourl} poster={TextData.cover}>
						{" "}
					</video>
					<div className={styles.mvInfo}>
						{TextData.name} - {TextData.artistName}
					</div>
					<div className={styles.data}>
						<span>播放量:&#32;{TextData.playCount}</span>
						<span>收藏:&#32;{infoMess.likedCount}</span>
						<span>分享:&#32;{infoMess.shareCount}</span>
						<span>评论:&#32;{infoMess.commentCount}</span>
					</div>
					<div className={styles.desc}>
						{TextData.desc}
						<div>{TextData.briefDesc}</div>
					</div>
				</div>
			</div>
			<div className={styles.commentBox}>
				<div className={styles.commentList}>
					<div className={styles.commentTotal}>
						评论<span>共{comments.total}条</span>
					</div>
					<div className={styles.input}>
						<Input.TextArea
							type="textarea"
							placeholder="Basic usage"
							autoSize={{ minRows: 3, maxRows: 5 }}
						/>
						<div className={styles.inputButton}>
							<Button type="primary">发送</Button>
						</div>
					</div>
					{/* 注释这块就能跑 */}
					<div className={styles.commentUser}>
						{comments.comments.map((item) => (
							<div className={styles.userBox} key={item.time}>
								<div className={styles.userHead}>
									<img src={item.user.avatarUrl} alt="" />
								</div>
								<div className={styles.userBody}>
									<div className={styles.userTitle}>
										<p>{item.user.nickname}</p>
										<p>2021-12-25</p>
									</div>
									<div className={styles.userText}>{item.content}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
