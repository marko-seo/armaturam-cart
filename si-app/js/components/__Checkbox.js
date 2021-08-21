export default {
	inheritAttrs: false,
	computed: {
		hasSlotData() {
			return this.$slots.default;
		}
	},
	template: `
		<label class="si-check">
			<input 
				v-bind="$attrs"
				type="checkbox"
				class="si-check__control" 
			>
			<div class="si-check__body">
				<span class="si-check__box">
					<svg width="12px" height="10px">
						<use xlink:href="#check"></use>
					</svg>
				</span>
				<span v-if="hasSlotData" class="si-check__caption">
					<slot></slot>
				</span>
			</div>
		</label>
	`
}