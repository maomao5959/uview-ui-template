const sui = {
	toast: {
		show(text, success, duration) {
			uni.showToast({
				title: text,
				icon: success ? 'success' : 'none',
				duration: duration || 2000
			})
		},
		close() {
			uni.hideToast();
		}
	},
	loading: {
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
}
export default sui
