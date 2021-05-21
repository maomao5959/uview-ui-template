<template>
    <view>
        <text v-if="label">{{ label }}</text>
        <text :style="[customStyle]">{{ formatValue }}</text>
    </view>
</template>

<script>
export default {
    name: 'sui-money',
    props: {
        // 图标颜色，可接受主题色
        color: {
            type: String,
            default: ''
        },
        // 字体大小，单位rpx
        size: {
            type: [Number, String],
            default: 'inherit'
        },
        // 是否显示粗体
        bold: {
            type: Boolean,
            default: false
        },
        /**标签名 */
        label: {
            type: String,
            default: null
        },
        /**金额 */
        value: {
            type: [Number],
            default: 0.00
        },
    },
	mounted() {
		console.log(this.value);
	},
    computed: {
        customStyle() {
            let style = {};
            if (this.size) style.fontSize = this.size == 'inherit' ? 'inherit' : this.$u.addUnit(this.size);
            if (this.bold) style.fontWeight = this.bold ? 'bold' : 'normal';
            if (this.color) style.color = this.color;
            return style
        },
        formatValue() {
			return this.sui.utils.formatMoney(this.value);
        }
    }
}
</script>

<style scoped lang="scss">
</style>
