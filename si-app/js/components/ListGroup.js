import ListHead from './ListHead.js';
import ListItem from './ListItem.js';

export default {
	props: ['products', 'marked'],
	emits: ['control', 'mark'],
	components: {
		ListItem,
		ListHead
	},
	template: `
		<ul class="si-cart__list si-cart__border">
			<list-head></list-head>
			<list-item 
				v-for="product in products"
				:key="product.id" 
				:product="product" 
				@click="$emit('control', $event, product)"
			></list-item>
		</ul>
	`
}