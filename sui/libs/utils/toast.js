const toast = {
	show(text, success, duration = 2000) {
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration
		})
	},
	close() {
		uni.hideToast();
	},
	
}
export default toast;