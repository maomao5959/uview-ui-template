<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		onLaunch: function() {
		},
		onShow: function() {

		},
		onHide: function() {

		},
		computed:{
			...mapState(["isLogin"])
		},
		methods:{

		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import './common/zwyCss.css';
	@import './common/app.css';
	/*每个页面公共css */
</style>
