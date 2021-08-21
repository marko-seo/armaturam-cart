import CountControl from './CountControl.js';
import Checkbox from './Checkbox.js';

export default {
	props: ['product'],
	components: {
		CountControl,
		Checkbox
	},
	template: `
		<li class="si-cart__product si-cart__row">
			<span class="si-cart__col si-cart__col-auto si-cart__col-sm-2">
				<checkbox
					name="field-product" 
					:value="product.id"
					v-model="$root.marked"
				></checkbox>
			</span>
			<span class="si-cart__col si-cart__col-1 si-cart__col-sm-3">
				<a :href="product.link" class="si-cart__product-img">
					<img :src="product.image">
				</a>
			</span>
			<span class="si-cart__col si-cart__col-4 si-cart__col-sm-7">
				<small class="si-cart__product-articul" v-html="product.articul"></small>
				<a :href="product.link" class="si-cart__product-name">{{ product.name }}</a>
			</span>
			<span class="si-cart__col si-cart__col-2 si-cart__col-sm-none">
				<p class="si-cart__product-placeholder">по запросу</p>	
			</span>	
			<span class="si-cart__col si-cart__col-2 si-cart__col-sm-12">
				<count-control :count="product.count"></count-control>
			</span>	
			<span class="si-cart__col si-cart__col-2 si-cart__col-sm-none">
				<p class="si-cart__product-placeholder">по запросу</p>	
			</span>	
		</li>
	`
}