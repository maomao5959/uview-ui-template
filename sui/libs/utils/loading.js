const loading = {
	show(text) {
		uni.showLoading({
			mask: true,
			title: text || '请稍候...'
		});
	},
	close() {
		uni.hideLoading();
	}
}
export default loading