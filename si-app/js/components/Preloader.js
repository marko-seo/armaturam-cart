export default {
	template: `
		<div class="banter-loader-overlay">
			<div class="banter-loader">
				<div v-for="item in new Array(9)" class="banter-loader__box"></div>
			</div>
		</div>
	`
}