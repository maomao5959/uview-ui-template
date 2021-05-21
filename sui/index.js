import utils from "./libs/utils/utils.js";

import loading from "./libs/utils/loading.js";
import toast from "./libs/utils/toast.js";

const $sui = {
	utils,
	loading,
	toast
}
const install = Vue => {
	Vue.prototype.sui = $sui;
}
export default {
    install
}