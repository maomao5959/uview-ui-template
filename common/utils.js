
const install = (Vue, vm) => {
	//<u-toast ref="uToast" /> 必须在页面内放入此组件
	let showError=(error,vm,callback)=>{
		let type='error';
		let msg='';
		if(error.msg){
			msg=error.msg; 
			type='warning'
		}else{
			msg=error.data?error.data.msg:'网络不给力，请稍后再试.';
		}
		vm.$refs.uToast.show({
			title:msg,
			type: type,
			callback:callback
		})
	};
	let showSuccess=(message,vm,callback,duration=1500)=>{
		vm.$refs.uToast.show({
			title:message,
			type: 'success',
			duration:duration,
			callback:callback
		})
	}
	let showWarning=(message,vm,duration=1500)=>{
		vm.$refs.uToast.show({
			title:message,
			type: 'warning',
			duration:duration,
		})
	}
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.utils = {
		showError,
		showSuccess,
		showWarning
	};
}

export default {
	install
}

