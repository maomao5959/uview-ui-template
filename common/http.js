//正式APPID： 测试APPID： wx8dad6b1612dbffd3
//公共js
import md5 from "uview-ui/libs/function/md5";
//变量
const host = "https://wxapp.test.cdhzbc.net"; //测试版接口地址
// const host = "http://192.168.1.164"; //开发本地接口地址



const app_key = '672fa5fa-5fde-4e28-bca7-2caeca62df21'; //api密钥

const MSHttp = {
	getTimestamp: function() {
		return Math.round(new Date().getTime() / 1000);
	},
	getNonce: function(length) {
		if (length == null) length = 32;
		var str = "",
			pos = 0,
			arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
				'l',
				'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
				'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			];

		for (var i = 0; i < length; i++) {
			pos = Math.round(Math.random() * (arr.length - 1));
			str += arr[pos];
		}
		return str;
	},
	getOrderWithData: function(dic) {
		if (dic == null) return '';
		var result = "";
		var sdic = Object.keys(dic).sort(function(a, b) {
			return a.localeCompare(b)
		});
		var value = "";
		for (var ki in sdic) {
			if (dic[sdic[ki]] == null) {
				value = ""
			} else {
				value = dic[sdic[ki]];
				if (typeof value === 'object') value = JSON.stringify(value);
			}
			result += sdic[ki] + value;
		}
		return result.replace(/\s/g, "");
	},
	getSign: function(queryData, timestamp, nonce) {
		var data = MSHttp.getOrderWithData(queryData);
		return md5.md5(timestamp + nonce + app_key + data);
	},
	setToken(token) {
		uni.removeStorageSync('token');
	},
	getToken() {
		return uni.getStorageSync("token")
	},
	clearToken() {
		uni.setStorageSync("token", token)
	},
	request: function(url, data, method, type, showLoading) {
		if (showLoading) {
			uni.showLoading({
				mask: true,
				title: '请稍候...'
			})
		}
		if (data) delete data["token"];
		let timestamp = MSHttp.getTimestamp(); //时间截
		let nonce = MSHttp.getNonce(); //随机字符串
		let signature = MSHttp.getSign(data, timestamp, nonce); //签名
		let token = MSHttp.getToken();
		var header = {
			'content-type': type == 'form' ? 'application/x-www-form-urlencoded' : 'application/json',
			'timestamp': timestamp,
			'nonce': nonce,
			'signature': signature,
			'token': token || "",
		};
		return new Promise((resolve, reject) => {
			let config = {
				url: url,
				header: header,
				timeout: 60000,
				method: method,
				dataType: 'json',
				success: (res) => {
					showLoading && uni.hideLoading();
					if (res.statusCode == 200) {
						if (res.data.flag == false && res.data.msg == 'api token unauthorized.') {
							MSHttp.clearToken();
						} else if (res.header['api-token']) {
							MSHttp.setToken(res.header['api-token']);
						}
						resolve(res.data);
					} else {
						resolve({
							flag: false,
							msg: res.data.exceptionmessage
						});
					}
				},
				fail: (res) => {
					showLoading && uni.hideLoading();
					if (res.errMsg == "request:fail abort") return;
					reject({
						flag: false,
						msg: '网络不给力，请稍后再试.'
					});
				}
			};
			console.log(data);
			if (data) config.data = data;
			uni.request(config);
		})
	},
	url(url) {
		return host + url;
	},
	url1(url) {
		return host1 + url;
	},
	apiUrl(url) {
		return MSHttp.url('/api' + url);
	},
	apiUrl1(url) {
		return MSHttp.url1('/api' + url);
	},
	webUrl(url) {
		return MSHttp.url('/h5' + url);
	},
	apiGet(url, data, fn, showLoading) {
		let http = MSHttp.request(MSHttp.apiUrl(url), data, 'GET', 'form', showLoading);
		http.then(fn).catch(fn);
	},
	apiPost(url, data, fn, showLoading) {
		let http = MSHttp.request(MSHttp.apiUrl(url), data, 'POST', null, showLoading);
		http.then(fn).catch(fn);
	},
	async getRequest(url, data, fn, showLoading) {
		let result = await MSHttp.request(MSHttp.apiUrl(url), data, 'GET', 'form', showLoading);
		fn(result)
		if (result.flag) {
			return result.data;
		} else {
			uni.showToast({
				title:result.msg
			});
		}
	},
	async postRrqust(url, data, fn, showLoading) {
		let result = await MSHttp.request(MSHttp.apiUrl1(url), data, 'POST', null, showLoading);
		fn(result)
		if (result.flag) {
			return result.data;
		} else {
			uni.showToast({
				title:result.msg
			});
		}
	}
}

module.exports = {
	// request: MSHttp.request,
	apiGet: MSHttp.apiGet,
	apiPost: MSHttp.apiPost,
	postRrqust: MSHttp.postRrqust,
	getRequest: MSHttp.getRequest,
	url: MSHttp.url,
}
