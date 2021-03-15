<template>
	<view class="bg-gradual-blue">
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<view class="flex justify-center align-center bg-white" style="width:100%; height:460rpx; background-image:url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ab737080-535f-11eb-b680-7980c8a877b8.jpg); background-repeat: no-repeat; background-size: 100% 100%;">
				<view class="grid col-1 margin-bottom text-center">
					<view class="text-xxl margin-bottom-xl text-white" role aria-label>
						<typeWriter></typeWriter>
					</view>
				</view>
			</view>
			<view class="home text-shadow-meow" @tap="showModal" data-target="viewModal">
				<image class="cu-avatar round bg-white lg margin-xs" :src="homeImg"></image>
			</view>
			<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			 indicator-active-color="#0081ff">
				<swiper-item v-for="(item,index) in banner" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item" @tap="gotoArticle(item._id)">
						<image :src="item.icon" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="gifimage bg-white">
				<image src="http://cdn.jzzz66.cn/wave.gif" mode="scaleToFill" class="gif-black response" style="height:100upx"></image>
			</view>
			<view class="cu-bar bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="搜索文章、关键词" v-model="searchContent" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-gradual-blue shadow-blur round" @tap="SearchSubmit">搜索</button>
				</view>
			</view>

			<scroll-view scroll-y>
				<view class="cu-card article" id="article">
					<block v-for="(item,index) in articles" :key="index">
						<view class="cu-item shadow" @tap="gotoArticle(item._id)">
							<view class="title">
								<view class="text-cut">{{item.title}}</view>
							</view>
							<view class="content">
								<image :src="item.icon" mode="aspectFill"></image>
								<view class="desc">
									<view class="text-content" v-text="item.body"></view>
									<view class="text-gray text-sm flex margin-xs">
										<block v-for="item1 in item.categories" :key="item1._id">
											<view class="cu-tag bg-blue light sm round">{{item1.name}}</view>
										</block>
										<view class="text-gray text-sm">
											<text class="cuIcon-timefill margin-lr-xs"></text>{{item.updatedAt | forMat}}
										</view>
									</view>
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.read}}
									</view>
								</view>
							</view>
						</view>
					</block>
					<uni-pagination :current="pageNum" :total="count" :pageSize="limit" @change="changePage" />
				</view>
			</scroll-view>
		</scroll-view>
		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>

		<scroll-view scroll-y style="background-image:url(http://cdn.jzzz66.cn/leftbg.jpeg); background-repeat: no-repeat; background-size: 100% 100%;"
		 class="DrawerWindow" drawerTitle="123" :class="modalName=='viewModal'?'show':''">
			<view class="content padding flex align-center flex-direction">
				<view class="cu-avatar xl round" style="background-image:url(http://cdn.jzzz66.cn/avatar.png);"></view>
				<view class="margin-top text-center">
					<view>斌</view>
				</view>
			</view>
			<view class="cu-list menu card-menu margin-bottom-xl shadow-meow">
				<view class="cu-item arrow" v-for="(item,index) in tags" :key="index">
					<view class="content" @tap="changeTags(item.name)">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="flex text-sm align-center flex-direction text-gray">
				<view>
					Version <text class="text-black">1.0.0</text>
				</view>
				<view>
					Powered by <text class="text-blue">小猪猪</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniPagination from '@/components/uni-pagination/uni-pagination'
	import typeWriter from '@/components/typeWriter/typeWriter'
	export default {
		data() {
			return {
				modalName: null,
				homeImg: 'http://cdn.jzzz66.cn/avatar.png',
				BlogName: '',
				cardCur: 0,
				searchContent: '',
				dotStyle: false,
				towerStart: 0,
				direction: '',
				articles: null,
				banner: '',
				value: '', //标签名
				pageNum: 1, //当前页码
				count: 0, //总数量
				totalPage: 0, //总页数
				limit: 6, //每页限制多少条
				type: 0, // 0表示标签或全部  1表示搜索
				tags: null,
				isShowPagation: true
			};
		},
		components: {
			uniPagination,
			typeWriter
		},
		filters:{
			forMat(time){
				return time.split('T')[0]
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			async getArticle(index) {
				this.type = 0;
				const res = await this.$request(
					`/articles/list?page=${this.pageNum}&value=${this.value}`
				);
				const {
					articles,
					count
				} = res;
				this.articles = articles;
				this.count = count;
				this.totalPage = Math.ceil(count / this.limit);
			},
			getRecent() {
				this.$request('/articles/recent').then(res => {
					if (res.status === 1) {
						this.banner = res.data
					}
				})
			},
			getTags() {
				this.$request(`/tags`).then((res) => {
					this.tags = res
				})
			},
			changePage(e) {
				this.pageNum = e.current
				if (this.type === 0) {
					this.getArticle();
				} else {
					this.goSearch();
				}
				uni.pageScrollTo({
					scrollTop: 0
				})
				console.log(1)
			},
			gotoArticle(_id) {
				uni.navigateTo({
					url: `/pages/article/article?_id=${_id}`
				})
			},
			changeTags(name) {
				this.pageNum = 1
				this.value = name
				this.getArticle()
				this.modalName = null
			},
			SearchSubmit() {
				this.type = 1
				this.pageNum = 1
				this.goSearch()
			},
			async goSearch() {
				const res = await this.$request(`/search?title=${this.searchContent}&page=${this.pageNum}`)
				const {
					articles,
					count
				} = res;
				this.articles = articles;
				this.count = count;
				this.totalPage = Math.ceil(count / this.limit);
			}
		},
		mounted() {
			this.getArticle()
			this.getTags()
			this.getRecent()
		}
	}
</script>

<style>
	.card-swiper {
		margin-top: -260rpx;
	}

	.article {
		margin-bottom: 120upx;
	}

	.gifimage {
		margin-top: -160rpx;
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}

	.home {
		position: absolute;
		left: 5%;
		top: 4%;
		z-index: 10000;
	}

	page {
		background-image: var(--gradualBlue);
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
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
		z-index: 999;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
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
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
