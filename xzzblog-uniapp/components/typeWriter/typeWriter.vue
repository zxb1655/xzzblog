<template>
	<view>
		{{content.name}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: {
					name: '小猪猪博客'
				}
			};
		},
		mounted() {
			this.typeWrite()
		},
		methods: {
			typeWrite() {
				let story = this.content.name;
				let i = 0;
				const time = setInterval(() => {
					const text = story.substring(0, i);
					i++;
					this.$set(this.content, "name", text)
					this.test = this.text
					if (text.length == story.length) {
						clearInterval(time);
					}
				}, 200);
			},
		}
	};
</script>
<style>
</style>
