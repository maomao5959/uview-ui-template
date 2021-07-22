let bashPath = '/v1/user/'; //控制器地址
let WXRegisteredPath = bashPath + 'WXRegistered' //用户信息

const homeApis = (vm) => {
	let WXRegistered = (params = {}) => vm.$u.post(WXRegisteredPath, params);
	return {
		WXRegistered,
	}
}

export default homeApis;

