export default {
	props: ['resultCont'],
	template: `
		<div class="si-cart__footer">
			<button class="si-cart__btn si-cart__btn--update" type="button">
				<i class="si-cart__icon">
					<svg>
						<use href="#update"></use>
					</svg>
				</i>&nbsp;
				Обновить корзину
			</button>
			<ul class="si-cart__result si-cart__border">
				<li class="si-cart__result-item"><span>Итого:</span> {{ resultCont }} товаров</li>
				<li class="si-cart__result-item"><span>Сумма заказа:</span> по запросу ₽</li>
			</ul>
			<button class="si-cart__btn-order">Оформить заказ</button>	
		</div>
	`
}