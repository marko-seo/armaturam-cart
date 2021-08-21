import Checkbox from './Checkbox.js';

export default {
	props: ['isAllChosen', 'marked'],
	emits: ['mark', 'remove'],
	components: {
		Checkbox
	},
	template: `
		<header class="si-action-bar si-cart__si-action-bar si-cart__border">
			<div class="si-action-bar__left">
				<checkbox 
					name="field-product-all" 
					:checked="isAllChosen"
					@change="$emit('mark', $event)"
				>
					Выбрать все
				</checkbox>
			</div>
			<div class="si-action-bar__right">
				<button 
					type="button" 
					class="si-action-bar__btn"
					:disabled="marked.length < 1"
					@click="$emit('remove')"
				>Удалить выбранное</button>	
			</div>
		</header>
	`
}