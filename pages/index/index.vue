<template>
	<view>
		<view>
			版本号为：{{vuex_version}}
		</view>
		<view>
			<<琵琶行>>的作者为{{vuex_user.name}}
		</view>
		<view>
			token为：{{vuex_token}}
		</view>
		<u-button @click="modifyVuex">修改变量</u-button>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// 调用getSearch接口
			this.$u.api.getSearch().then(res => {
				console.log(res);
			})
		},
		methods: {
			modifyVuex() {
				this.$u.vuex('vuex_version', '1.0.1');
				// 修改对象的形式，中间用"."分隔
				this.$u.vuex('vuex_user.name', '诗圣');
				this.$u.vuex("vuex_token", "123123123")
			}
		}
	}
</script>
