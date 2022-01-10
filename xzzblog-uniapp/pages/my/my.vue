<template>
	<view class="my">
		<!-- 顶部图片 -->
		<view class="top-img">
			<image class="fengrui-img" src="../../static/my/bg15-1.svg" mode="aspectFill"></image>
		</view>

		<!-- 头像 -->
		<view class="self-w">
			<view class="self-user-img">
				<image class="fengrui-img" src="../../static/avatar.png" mode="aspectFill"></image>
			</view>
			<view class="self-user-info">
				<view class="self-user-info-name">
					小猪猪
				</view>
				<view class="self-user-info-describe">
					能在此遇见您真好~
				</view>
			</view>
			<view class="self-user-updata">
				<button class="self-user-updata-btn" open-type="contact">联系我</button>
			</view>
		</view>

		<!-- me-svg -->
		<view class="me-svg">
			<button class="me-sbg-btn">
				<view class="Vajra-list-img">
					<image class="fengrui-img" src="../../static/my/star.png" mode="aspectFill"></image>
				</view>
				<view class="Vajra-list-font">
					等待添加
				</view>
			</button>
			<button class="me-sbg-btn">
				<view class="Vajra-list-img">
					<image class="fengrui-img" src="../../static/my/poster.png" mode="aspectFill"></image>
				</view>
				<view class="Vajra-list-font">
					等待添加
				</view>
			</button>
			<!-- #ifdef MP-WEIXIN -->
			<button class="me-sbg-btn" open-type="contact">
				<view class="Vajra-list-img">
					<image class="fengrui-img" src="../../static/my/customer.png" mode="aspectFill"></image>
				</view>
				<view class="Vajra-list-font">
					咨询客服
				</view>
			</button>
			<!-- #endif -->
		</view>


		<!-- 功能列表 -->
		<view class="cu-list menu card-menu margin-bottom-xl shadow-meow">
			<view class="cu-item arrow" v-for="(item,index) in 5" :key="index">
				<view class="content">
					<text class="cuIcon-github text-grey"></text>
					<text class="text-grey">{{index +1}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: true,
				xingsu: [],
				about_center: [],
			}
		},
	}
</script>

<style>
	.my{
		height: 100vh;
	}
	
	.top-img {
		width: 100%;
		height: 300upx;
		overflow: hidden;
	}

	/* 登陆框 */
	.login-btn-lo {
		background-color: #6999fc;
		border-radius: 100upx;
		height: 100upx;
		width: 550upx;
		line-height: 100upx;
		color: #FFFFFF;
	}

	.login-btn-qu {
		background-color: #FD6D6D;
		border-radius: 100upx;
		height: 80upx;
		width: 300upx;
		line-height: 80upx;
		color: #FFFFFF;
	}

	.login-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0upx 30upx;
		margin-top: 80upx;

	}

	.feng-img {
		height: 100%;
		margin: auto;
		display: block;
	}

	.login-img {
		height: 700upx;
		overflow: hidden;
		border-radius: 20upx;
		position: relative;
		width: 100%;
	}

	.login-w {
		/* margin-top: 40%; */
		width: 76%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	/* 功能列表 */
	.metergasis-li-rgth {
		width: 50upx;
		height: 50upx;
		overflow: hidden;
		flex-shrink: 0;
		position: absolute;
		right: 0upx;
		top: 50%;
		transform: translate(0%, -50%);
	}

	.metergasis-li-h {
		grid-row: 1;
		margin-left: 30upx;
		font-size: 30upx;
	}

	.metergasis-li-img {
		height: 52upx;
		width: 52upx;
		border-radius: 100upx;
		flex-shrink: 0;
	}

	.metergasis-li {
		margin: 48upx 32upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
	}

	.metergasis {
		background-color: #FFFFFF;
		border-radius: 16upx;
		margin: 48upx 0upx;
		padding: 2upx;
		margin: 30upx;
	}

	/* me-svg */
	.Vajra-list-font {
		color: #807C7C;
		font-size: 24upx;
	}

	.Vajra-list-img {
		height: 60upx;
		width: 60upx;
		overflow: hidden;
		margin: auto;
	}

	.me-sbg-btn {
		width: 31%;
		/* overflow-y: hidden; */
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
	}

	.me-svg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30upx;
		background-color: #FFFFFF;
		padding: 30rpx 0rpx 20rpx 0rpx;
		border-radius: 16upx;
	}

	/* 流量主广告或者图片 */
	.me-ads {
		border-radius: 18upx;
		margin: 48upx 0upx;
		overflow: hidden;
		margin: 30upx;
	}

	/* 头像 */
	.self-user-updata-btn {
		border-radius: 100upx;
		width: 128upx;
		height: 48upx;
		line-height: 48upx;
		font-size: 26upx;
		background: linear-gradient(90deg, rgba(67, 130, 235, 1) 0%, rgba(6, 189, 254, 1) 100%);
		color: #FFFFFF;
	}

	.self-user-updata {
		width: 128upx;
		flex-shrink: 0;
	}

	.self-user-info-describe {
		color: #807C7C;
		font-size: 24upx;
		margin-top: 18upx;
	}

	.self-user-info-name {
		font-size: 48upx;
		flex-grow: 1;
	}

	.self-user-info {
		margin: 0upx 24upx;
	}

	.self-user-img {
		height: 120upx;
		width: 120upx;
		border-radius: 100upx;
		/* margin-left: 30upx; */
		overflow: hidden;
		flex-shrink: 0;
		/* box-shadow: #F9F9F9 2px 6px 24px; */
	}

	.self-w {
		background-color: #FFFFFF;
		border-radius: 16upx;
		display: flex;
		justify-content: space-between;
		padding: 48upx 26upx;
		align-items: flex-end;
		overflow: hidden;
		margin: 0rpx 30upx;
	}

	/* 全局 */
	.center {
		margin: 48upx;
	}

	page {
		background-color: #f7f7f7;
		overflow-x: hidden;
	}

	.fengrui-img {
		height: 100%;
		width: 100%;
	}

	button {
		padding-left: 0upx;
		padding-right: 0upx;
		/* line-height: 0; */
		background-color: #FFFFFF;
	}

	button::after {
		border: 0px solid rgba(0, 0, 0, .2);

	}

	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {
		page {
			background: #161616;
		}

		.self-w {
			background-color: #202020;
		}

		.metergasis {
			background-color: #202020;
		}

		.me-svg {
			background-color: #202020;
		}

		.me-sbg-btn {
			background-color: #202020;
		}

		button {
			background-color: #202020;
		}
	}
</style>
