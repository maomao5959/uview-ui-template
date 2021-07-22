//正式APPID： 测试APPID： wx8dad6b1612dbffd3
//公共js
import md5 from "uview-ui/libs/function/md5";
//变量
const baseUrl = "https://wxapp.test.cdhzbc.net"; //测试版接口地址
// const baseUrl = "http://192.168.1.164"; //开发本地接口地址

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
		if (!dic) return '';
		var result = "";
		var sdic = Object.keys(dic).sort(function(a, b) {
			return a.localeCompare(b)
		});
		var value = "";
		for (var ki in sdic) {
			if (dic[sdic[ki]] == null) {
				value = ""
			} else if (typeof(dic[sdic[ki]]) == "undefined") {
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
	apiUrl(url) {
		return url+'/api';
	},
}

const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: MSHttp.apiUrl(baseUrl),
		loadingText: '努力加载中~',
		loadingTime: 800,
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// ......
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		let queryData = config.data;
		let method = config.method;
		let timestamp = MSHttp.getTimestamp(); //时间截
		let nonce = MSHttp.getNonce(); //随机字符串
		let signature = MSHttp.getSign(queryData, timestamp, nonce); //签名
		let token = vm.vuex_token;
		var header = {
			'content-type': method == 'GET' ? 'application/x-www-form-urlencoded' : 'application/json',
			'timestamp': timestamp,
			'nonce': nonce,
			'signature': signature,
			'token': token || "",
		};
		config.header =header;
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.code == 200) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return res.data;
		} else if (res.code == 201) {
			// 假设201为token失效，这里跳转登录
			// vm.$u.toast('验证失败，请重新登录');
			// setTimeout(() => {
			// 	// 此为uView的方法，详见路由相关文档
			// 	vm.$u.route('/pages/user/login')
			// }, 1500)
			return false;
		} else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
}

export default {
	install
}
