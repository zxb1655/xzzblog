<template>
	<scroll-view scroll-y class="DrawerPage" scroll-with-animation="true"
		:style="'background-color: ' + (skin?'#ffffff':'#ffffff') + ';'">
		<image class="cu-avatar bg-blue lg" src="https://cdn.jzzz66.cn/ranking_bg.png" mode="widthFix"
			style="width: 100%;height: 500rpx;"></image>
		<scroll-view scroll-x class="bg-blue nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-white':'text-gray'" v-for="(item,index) in 2"
					:key="index" @tap="tabSelect" :data-id="index">
					{{index === 1 ? '升序' : "降序"}}
				</view>
			</view>
		</scroll-view>

		<block v-for="(value,key,index) in timeArticle" :key="index">
			<view class="cu-timeline">
				<view class="cu-time">{{ key }}</view>
				<block v-for="(item,index1) in value" :key="index1">
					<view class="cu-item text-green">
						<view class="content shadow-blur" :class="'bg-'+ColorList[index1]" :data-id="item.id" @tap="gotoArticle">
							{{item.title}}
						</view>
					</view>
				</block>
			</view>
		</block>

	</scroll-view>
</template>

<script>
	//获取应用实例
	const app = getApp();

	export default {
		data() {
			return {
				isDesc: true,
				homeImg: app.globalData.homeImg || 'https://cdn.jzzz66.cn/bg.jpg',
				StatusBar: app.globalData.StatusBar,
				CustomBar: app.globalData.CustomBar,
				Custom: app.globalData.Custom,
				skin: app.globalData.skin,
				TabCur: 0,
				timeArticle: null,
				ColorList: ['blue', 'purple', 'mauve', 'pink', 'red', 'orange', 'yellow', 'olive', 'green', 'cyan',
					'brown', 'grey', 'gray', 'black', 'white'
				]
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.isDesc = e.currentTarget.dataset.id;
				this.getTimeArticle()
			},
			async getTimeArticle() {
				const params = {
					order: this.isDesc,
				}
				const {
					data
				} = await this.$request(`/article/webtimelist`, params)
				this.timeArticle = data
			},
			gotoArticle(e) {
				const _id =  e.currentTarget.dataset.id
				uni.navigateTo({
					url: `/pages/article/article?_id=${_id}`
				})
			},
		},
		mounted() {
			this.getTimeArticle()
		},
	}
</script>
<style>
	image[class*="gif-"] {
		/* border-radius: 6rpx; */
		display: block;
	}

	.gif-wave {
		/* position: absolute; */
		width: 100%;
		bottom: -2rpx;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	page {
		background-image: var(--gradualShadow);
		width: 100vw;
		overflow: hidden;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60rpx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerPage .cu-bar.tabbar .action button.icon {
		width: 64rpx;
		height: 64rpx;
		line-height: 64rpx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10rpx;
		height: 10rpx;
		background-color: currentColor;
		position: absolute;
		bottom: 10rpx;
		border-radius: 10rpx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}

	.cu-timeline .cu-time {
		padding-left: 20rpx !important;
		width: 160upx;

	}
</style>
