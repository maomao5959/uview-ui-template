
/**
 * 消息提示
 * @param {Number} 
 * @return {Object} 
 */
 export const msg = (msg,type,vm,callback,duration=1500) => {
	//<u-toast ref="uToast" /> 必须在页面内放入此组件
	if(type=='error'){
		vm.$refs.uToast.show({
			title:msg.data.msg,
			type: 'error',
			duration:duration,
			callback:callback
		})
	}else if(type=='warning'){
		vm.$refs.uToast.show({
			title:msg,
			type:'warning',
			duration:duration,
			callback:callback
		})
	}else if(type=='success'){
		vm.$refs.uToast.show({
			title:msg,
			type: 'success',
			duration:duration,
			callback:callback
		})
	}
}