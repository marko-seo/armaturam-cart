export default {
	inheritAttrs: false,
	props: ['modelValue'],
	emits: ['update:modelValue'],
	computed: {
		value: {
			get() {
				return this.modelValue;
			},
			set(value) {
				this.$emit('update:modelValue', value);
			}
		},
		hasSlotData() {
			return this.$slots.default;
		},
	},
	template: `
		<label class="si-check">
			<input 
				type="checkbox"
				v-bind="$attrs"
				v-model="value"
				class="si-check__control" 
			>
			<div class="si-check__body">
				<span class="si-check__box">
					<svg width="12px" height="10px">
						<use href="#check"></use>
					</svg>
				</span>
				<span v-if="hasSlotData" class="si-check__caption">
					<slot></slot>
				</span>
			</div>
		</label>
	`
}