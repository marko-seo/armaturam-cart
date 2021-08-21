import FooterComponent from './components/FooterComponent.js';
import Preloader from './components/Preloader.js';
import ActionBar from './components/ActionBar.js';
import ListGroup from './components/ListGroup.js';
import Alert from './components/Alert.js';

document.addEventListener('DOMContentLoaded', () => {

	// Cookie
	class Cookie {
		static get(name) {
			let matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		}

		static set(name, value, options = {}) {

			options = {
				path: '/',
			};

			if (options.expires instanceof Date) {
				options.expires = options.expires.toUTCString();
			}

			let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

			for (let optionKey in options) {
				updatedCookie += "; " + optionKey;
				let optionValue = options[optionKey];
				if (optionValue !== true) {
					updatedCookie += "=" + optionValue;
				}
			}

			document.cookie = updatedCookie;
		}

		static delete(name) {
			this.set(name, "", {
				'max-age': -1
			})
		}
	}


	// Add to cart
	document.addEventListener("click", (e) => {

		const el = e.target;

		if (el.classList.contains('si-btn-add-to-cart')) {
			el.disabled = true;
			el.querySelector('.si-btn-add-to-cart__caption').textContent = 'В корзине';
			if (Cookie.get('cart')) {
				const products = JSON.parse(Cookie.get('cart'));
				const clickProduct = JSON.parse(el.dataset.product);
				if (products.find((item) => item['id'] == clickProduct['id'])) {
					return;
				} else {
					products.push(clickProduct);
					Cookie.set('cart', JSON.stringify(products));
				}
			} else {
				Cookie.set('cart', JSON.stringify([JSON.parse(el.dataset.product)]));
			}

			console.log(JSON.parse(Cookie.get('cart')));
		} else if (el.classList.contains('si-page-checkout__si-btn')) {
			const parent = document.querySelector('.si-page-checkout');
			const productsCart = JSON.parse(parent.dataset.cart);

			let str = "";

			for (const product of productsCart) {
				str += `Товар: ${product['name']}; Ссылка: ${product['link']}; Кол-во: ${product['count']};\n`;
			}

			parent.querySelector('#products-cart').value = str;
			parent.querySelector('.si-checkout-submit').click();

			document.addEventListener('wpcf7submit', function (event) {

				if (event.detail.apiResponse.status == "validation_failed") {
					el.disabled = false;
					return;
				}

				if (event.detail.contactFormId == "2225") {
					Cookie.delete('cart');
					parent.innerHTML = `<div class="alert alert-primary">Спасибо за Ваше сообщение. Оно успешно отправлено</div>`;
				}

			}, false);

		}

	});

	/* === Cart === */
	const cart = Vue.createApp({
		data() {
			return {
				marked: [],
				products: [],
				isLoade: false,
				isAllChosen: false,
				alertShow: false,
			}
		},
		mounted() {
			this.getProducts();
		},
		components: {
			FooterComponent,
			Preloader,
			ActionBar,
			ListGroup,
			Alert,
		},
		computed: {
			classObj() {
				return {
					'alert-warning': true
				}
			},
			textAlert() {
				return `В корзине еще нет товаров. Вернитесь в <a href="/produkciya">магазин</a>`;
			},
			resultCont() {
				return this.products.reduce((sum, current) => sum + Number(current.count), 0);
			}
		},
		methods: {
			getProducts() {
				fetch(`${route.url}?action=get_products`)
					.then(res => res.json())
					.then(data => {
						var callback;

						if (data.length > 0) {
							callback = () => this.products = data;
						} else {
							callback = () => this.alertShow = true;
						}

						setTimeout(() => {
							this.isLoade = true;
							callback();
						}, 1000);
					})
					.catch(err => console.error(err));
			},
			removeProducts() {
				if (this.marked.length > 0) {

					this.isLoade = false;

					setTimeout(() => {

						this.marked.forEach(id => {
							var index;

							if ((index = this.products.findIndex(product => product.id == id)) !== -1) {
								this.products.splice(index, 1);
							}
						});

						this.marked = [];

						this.isLoade = true;

						if (this.products.length < 1) {
							this.alertShow = true;
						}

						Cookie.set('cart', JSON.stringify(this.products));

					}, 1000);

				} else {
					return;
				}
			},
			redirectOrder() {
				return location.href = "/checkout.html";
			},
			onHandleClick(e) {
				const el = e.target;

				switch (true) {
					case el.classList.contains('si-cart__btn--update'):
						this.updateCart();
						break;
					case el.classList.contains('si-cart__btn-order'):
						this.redirectOrder();
						break;
					default:
						break;
				}
			},
			updateCart() {
				this.marked = [];
				this.getProducts();
				this.isLoade = false;
				this.isAllChosen = false;
			},
			onHandleChange(e) {
				const el = e.target;

				switch (el.name) {
					case 'field-product-all':
						this.isAllChosen = !this.isAllChosen;

						if (this.isAllChosen) {
							const marked = this.products.map(product => product.id);
							this.marked = marked;
						} else {
							this.marked = [];
						}

						break;
					default:
						break;
				}

			},
			changeQuantity(e, product) {
				const el = e.target;

				switch (true) {
					case el.classList.contains('si-count-control__btn--prev'):
						product.count -= Number(product.count) !== 1 ? 1 : 0;
						break;
					case el.classList.contains('si-count-control__btn--next'):
						product.count += 1;
						break;
					default:
						return;
				}

				Cookie.set('cart', JSON.stringify(this.products));
			}
		}
	}).mount('#si-cart');

	// /home/marko/www/armaturam/wp-content/themes/wp-armaturam-v2/views/posts/post.php
	// /home/marko/www/armaturam/wp-content/themes/wp-armaturam-v2/includes/single-content.php

});