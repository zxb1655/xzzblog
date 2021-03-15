<template>
	<!-- 这个模板用来渲染原生video -->
  <!--增加video标签支持，并循环添加-->
  <view style="max-width: 100%;">
	<video
	:autoplay="playState" 
	:class="node.classStr" 
	:style="node.styleStr" 
	class="video-video"
	v-if="playState"
	:src="node.attr.src"></video>
  </view>
</template>

<script>
export default {
  name: 'wxParseVideo',
  props: {
    node: {},
  }
};
</script>
<style>
	.video-video{z-index: 1;}
</style>
