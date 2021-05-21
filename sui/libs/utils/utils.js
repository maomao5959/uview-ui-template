const utils = {
	formatMoney: function(value) {
		let _value = value;
		if (_value) {
			var str = Number(_value || 0).toFixed(2) + '';
			var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');
			var dot = str.substring(str.length, str.indexOf("."));
			var ret = intSum + dot;
			return ret;
		} else {
			return '0.00';
		}
	},
	indexOf(arrar, func) {
		if (arrar && arrar.length > 0) {
			let index = -1;
			arrar.forEach((item, i) => {
				if (func && index == -1 && item) {
					if (func(item) === true) {
						index = i;
					}
				}
			});
			return index;
		} else {
			return -1;
		}
	}
}
export default utils;
