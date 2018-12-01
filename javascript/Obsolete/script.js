const btnCart 		= document.querySelector('.btn-cart');
const cartItems 	= document.querySelector('.cart-items');

btnCart.addEventListener('click', () => {

	if (cartItems.style.display === "none") {

		cartItems.style.display = "block";

	} else {

		cartItems.style.display = "none";

	}

});