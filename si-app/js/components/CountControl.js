export default {
	props: ['count'],
	template: `
		<div class="si-count-control">
			<button type="button" class="si-count-control__btn si-count-control__btn--prev">–</button>
			<input :value="count" type="text" class="si-count-control__field" name="quantity" readonly>
			<button type="button" class="si-count-control__btn si-count-control__btn--next">+</button>
		</div>
	`
}