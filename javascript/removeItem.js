const removeOptions 		= document.querySelector('#remove-options');
const btnRemoveItem 		= document.querySelector('.btn-remove-item');

// --> Update the remove List Items

function updateRemoveListItems () {

	// Every time this function is called the inner HTML of
	// remove options from the <select> form need to be cleared

	removeOptions.innerHTML = "";

	// This will select all the showcase item's titles then
	// put them inside the <select> form

	let featuredTitle 		= document.querySelectorAll('.featured-title');

	for (let i=0; i < featuredTitle.length; i++) {
		removeOptions.innerHTML += `
									<option>` + featuredTitle[i].textContent + `</option>
									`;
	}

};

// Initial assignment of the title options inside <select>
updateRemoveListItems();

// --> Remove an Item from the list

btnRemoveItem.addEventListener('click', () =>  {

	const showcase 			= document.querySelector('.featured-wrapper');
	const showcaseItems 	= showcase.children;
	const featuredTitle 	= document.querySelectorAll('.featured-title');
	let phoneModelToBeRemoved;

	// Remove item from the showcase and store the model name
	// inside phoneModelToBeRemoved variable

	for ( let i=0; i < showcaseItems.length; i++) {
		if (removeOptions.value === featuredTitle[i].textContent) {

			phoneModelToBeRemoved = showcaseItems[i].classList[1];
			showcase.removeChild(showcaseItems[i]);

		}
	}

	// If the removed item from the showcase is inside the cart
	// remove it from there too
	// the subtotal must be affected!

	const cartList 				= document.querySelector('.shopping-list')		 ;
	const cartListItems 		= cartList.children 							 ;
	const cartListItemsTitles 	= document.querySelectorAll('.cart-product-name');
	const cartListItemPrice		= document.querySelectorAll('.listActualPrice')	 ;
	const cartListItemQty		= document.querySelectorAll('.itemQty')			 ;
	const cartListSubtotal		= document.querySelector('#subtotalPrice')		 ;
	const cartListSubtotalValue = cartListSubtotal.textContent.replace(/\D/g,'') ;
	const cartCounter			= document.querySelector('.counter')		     ;

	for ( let i=0; i < cartListItems.length; i++) {

		if (removeOptions.value === cartListItemsTitles[i].textContent) {

			let cartListItemSubtotalUpdate	  =   parseInt(cartListSubtotalValue)
												- parseInt(cartListItemPrice[i].textContent.replace(/\D/g,''))
											    * parseInt(cartListItemQty[i].textContent);
            let cartCounterUpdate			  =   parseInt(cartCounter.textContent) - parseInt(cartListItemQty[i].textContent);

			cartListSubtotal.textContent 	  = 'Subtotal: $' + cartListItemSubtotalUpdate;
			cartCounter.textContent 		  = cartCounterUpdate;

			cartList.removeChild(cartListItems[i]);

		}
	}

	// Also remove the phone model from itemData inside cartScript.js

	for ( let i=0; i < showcaseItems.length; i++) {
		for (let phoneModel in itemData) {
			if (phoneModelToBeRemoved === phoneModel) {
				delete itemData[phoneModelToBeRemoved];
			}
		}
	}

	// After removing the item, update the remove list items

	updateRemoveListItems ();

	// Update Carousel variables after removing items

	if (childCountFinite > 1) {

		clearInterval(refreshIntervalIdFinite);

		childCountFinite = carouselFinite.childElementCount;
		carouselFinite.style.width = childCountFinite*100 + '%';

		changeSizeSmallFinite(smallBpFinite);
		changeSizeMediumFinite(mediumBpFinite);
		changeSizeLargeFinite(largeBpFinite);
		changeSizeXlargeFinite(xlargeBpFinite);

		visualWidthFinite = carouselFinite.parentNode.offsetWidth;
		carouselWidthFinite = carouselFinite.offsetWidth;

		itemsInVisualFinite = 
			Math.round(visualWidthFinite/
				(carouselWidthFinite/
				childCountFinite));

		maxClicksFinite = childCountFinite - itemsInVisualFinite;

		carouselFinite.style.transform = 'translateX(0px)';
		carouselFinite.style.right = '0px';
		clickCountFinite = 0;

		carouselDirectionFinite(directionFinite, timeCounterFinite);

		flagEvaluationFinite ();

	}

});