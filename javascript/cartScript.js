// ===========  MOBILE PHONE CART APP ============ //

// =======================================================================================
// 1. VARIABLE DECLARATIONS AND INITIAL CONDITIONS
// =======================================================================================

// ---------------------------------------------------------------------------------------
// 1.1 --> Products Information
// ---------------------------------------------------------------------------------------

const imgPath = "images";

let itemData = {
					    //0. Act Price   //1. Prev Price  //2. Inventory  //3.qtyDem   //4.Color       //5.Capacity		//6. Image URL						//7. Cart Flag
	iPhone6 	    :  	[350,			 410,			  10,              0,           'Gold' ,        '32Gb', 			imgPath + "/iPhone6.jpg"		,	0],
	huaweiP20Lite   :  	[600, 			 650, 		   	  12,              0,           'Black',        '32Gb', 			imgPath + "/huaweiP20Lite.jpg"	,	0],
	samsungGalaxyS8 :  	[400, 			 450, 			  13,              0,           'Gray' ,        '32Gb', 			imgPath + "/samsungGalaxyS8.jpg",	0],
	XiaomiMiA1 		:  	[150, 			 200, 			  7,               0,           'Gold' ,        '16Gb', 			imgPath + "/XiaomiMiA1.jpg"     ,   0],
	AlcatelA7		:   [300, 			 350,			  15,			   0,		    "Black", 		"32Gb",				imgPath + "/AlcatelA7.jpg"      ,   0],		
	MotorolaG5 		:   [200, 			 250, 			  4,			   0, 			"Gold",			"16Gb",				imgPath + "/MotorolaG5.jpg"		,	0]					
};

// ---------------------------------------------------------------------------------------
// 1.2 --> Initial Variables - Selection or Global Variables
// ---------------------------------------------------------------------------------------

const linkShoppingCart   	= document.querySelectorAll		 ('.link-shopping-cart');			//--> All of the cart buttons inside the showcase.
const productPrice 			= document.querySelectorAll		 ('.product-price')		;
const prevPrice 			= document.querySelectorAll		 ('.prev-price')		;
const actualPrice 			= document.querySelectorAll		 ('.actual-price')		;
const subtotalPrice    		= document.getElementById  		 ('subtotalPrice')		;
const shoppingList 			= document.getElementsByClassName('shopping-list')[0]	;
const counterItems 			= document.querySelector  		 (".counter")			;
const removeItem 			= document.getElementsByClassName('removeItem')			;
const shopItemsList 		= document.querySelector		 ('.featured-wrapper')  ;
const shopItems				= shopItemsList.children							    ;
const btnToggleAdminPanel	= document.querySelector		 ('.btn-toggle')		;
let modelInventory			= document.querySelectorAll('#inventory')			    ;

let subtotal 				= 0														;
let numberOfItemsInCart		= 0														;
let numberOfItemsInCartKeep = 0														;
let subtotalKeep			= 0														;

// ---------------------------------------------------------------------------------------
// 1.3 --> Assign Initial Values in DOM
// ---------------------------------------------------------------------------------------

function updateShowcaseItemsInfo() {
	// for each item in the showcase...
	for (let i = 0; i < shopItemsList.children.length; i++ ) {
		// for each item in the itemData Object...
		for (let phoneModel in itemData) {
			// Compare the classname and if both strings are equal...
			if (shopItems[i].classList[1] == phoneModel) {
				// Assign the previous price and actual price
				shopItems[i].children[0].children[1].children[1].children[0].textContent = "$" + itemData[phoneModel][1];
				shopItems[i].children[0].children[1].children[1].children[1].textContent = "$" + itemData[phoneModel][0];
				// Assign the Inventory
				shopItems[i].children[0].children[2].children[2].children[1].textContent = itemData[phoneModel][2];

			}
		}
	}
}

updateShowcaseItemsInfo();

subtotalPrice.textContent 	= "Subtotal: $" + subtotal;

// ---------------------------------------------------------------------------------------
// 1.4 --> Assign Event Listeners
// ---------------------------------------------------------------------------------------

// 1.4.1 --> Assign Event Listeners to Plus Icons

shopItemsList.addEventListener('click', (event) => {

	if(event.target.className === "fa fa-plus-circle") {

		// This variable picks the number of items to be added to the cart
		let numberOfItemsToAdd 			= parseInt(event.target.nextElementSibling.value);
		// This variable picks the number of items 
		let numberOfItemsInInventory	= parseInt(event.target.parentNode.nextElementSibling.children[1].textContent);

		// The value must not go below one
		if (numberOfItemsToAdd  < numberOfItemsInInventory) {
			event.target.nextElementSibling.value = numberOfItemsToAdd + 1;
		}

	}	
});


// 1.4.2 --> Assign Event Listeners to Minus Icons

shopItemsList.addEventListener('click', (event) => {

	if(event.target.className === "fa fa-minus-circle") {

		// This variable picks the number of items to be added to the cart
		let numberOfItemsToAdd   		= parseInt(event.target.previousElementSibling.value);
		// This variable picks the number of items 
		let numberOfItemsInInventory	= parseInt(event.target.parentNode.nextElementSibling.children[1].textContent);
		
		// The value must not go below one
		if (numberOfItemsToAdd > 1) {
			event.target.previousElementSibling.value = numberOfItemsToAdd - 1;
		}

	}	
});

// 1.4.3 --> Assign Event Listener to Admin Panel Toggler

btnToggleAdminPanel.addEventListener('click', () => {

	// Select Panel Element
	const adminPanel = document.querySelector('.admin-config');

	// Toggle or on off

	if (adminPanel.style.display === "flex") {
		adminPanel.style.display = "none";
		btnToggleAdminPanel.textContent = "Show Admin Panel";

	} else {
		adminPanel.style.display = "flex";
		btnToggleAdminPanel.textContent = "Hide Admin Panel";
	}

});

// =======================================================================================
// 2. ADD ITEMS TO THE CART
// =======================================================================================

// Assign Event Listeners to the Cart Button

shopItemsList.addEventListener('click', (event) => {

	if(event.target.className === "fa fa-shopping-cart") {

		// Gets the phone model stored in the class of the item container
		let modelEvaluator = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
		let modelClassName = modelEvaluator.classList[1];
		let modelPhoneName = modelEvaluator.children[0].children[1].children[0].textContent; 
		let modelQty 	   = modelEvaluator.children[0].children[2].children[1].children[1];

		for(phoneModel in itemData) {

			// If the model name contained inside the item in the showcase is equal to the phoneModel inside itemData
			// AND if the item is NOT ALREADY in the cart (symbolized by itemData[phoneModel][7])
			if (modelClassName === phoneModel && itemData[phoneModel][7] == 0 && itemData[phoneModel][2] > 0) {

				// Increase the quantity demanded for this model
				itemData[phoneModel][3] += parseInt(modelQty.value);

				// Activate the flag for this model!
				itemData[phoneModel][7]  = 1;

				// Inventory tracking for the specific model
				itemData[phoneModel][2] -= modelQty.value;

				shoppingList.innerHTML  += `
									<li>
										<a class="`+ phoneModel + `">
											<div class="itemImgCartContainer">
												<img src="` + itemData[phoneModel][6] + `" alt="">
											</div>
											<div>
												<h3 class="cart-product-name">` + modelPhoneName + `</h3>
												<i class="removeItem fa fa-trash-o"></i>
												<span class="remove">Remove 
													<i class="fa fa-caret-down"></i>
												</span>
												<p class="model-description">Color: `  + itemData[phoneModel][4] + ` | Model: ` + itemData[phoneModel][5] + `</p>
												<div>
													<span class="prev-price">`     	   + "$" + itemData[phoneModel][1] + `</span>
													<span class="listActualPrice">`    + "$" + itemData[phoneModel][0] + `</span>
												</div>
												<p>Qty: <span class="itemQty">` + itemData[phoneModel][3] + `</span></p>
											</div>
										</a>
									</li>
								  `;
			// If the model name contained inside the item in the showcase is equal to the phoneModel inside itemData
			// AND if the item is ALREADY in the cart (symbolized by itemData[phoneModel][7])
			} else if (modelClassName === phoneModel && itemData[phoneModel][7] !== 0 && itemData[phoneModel][2] > 0) {

				// Increase the quantity demanded for this model
				itemData[phoneModel][3] += parseInt(modelQty.value);

				// Inventory tracking for the specific model
				itemData[phoneModel][2] -= modelQty.value;

				let itemQty 			 = document.querySelector('.shopping-list .' + phoneModel + ' .itemQty');
				itemQty.textContent 	 = itemData[phoneModel][3];
			}

			// number of items in cart tracking
			numberOfItemsInCart 	+= itemData[phoneModel][3];

			// subtotal tracking
			subtotal 				+= itemData[phoneModel][3]*itemData[phoneModel][0];

		}

		document.querySelector('.counter').innerText 	   = numberOfItemsInCart;
		document.querySelector('#subtotalPrice').innerText = "Subtotal: $" + subtotal;

		// Clean these variables to properly keep track of the values
		// If not cleaned, the values can sum up double or more.
		numberOfItemsInCart     = 0;
		subtotal 			    = 0;

		// After adding the item to the cart return temporalPlus/temporalMinus to one
		modelQty.value  		= 1;

		// After adding the item to the cart update the DOM text of the inventory avaiable
		updateShowcaseItemsInfo();

	}

});

// =======================================================================================
// 3. REMOVE ITEMS FROM THE CART
// =======================================================================================

shoppingList.addEventListener('click', (event) => {

	// The whole shopping list has an event listener, but it is only
	// applied to the trash icon thanks to the following conditional:

	// In fact, it does not matter if the number of trashes increases
	// It will automatically update the event handler

	if(event.target.className === "removeItem fa fa-trash-o") {

		// modelEvaluator gets the element whose class specifies the phone model
		let modelEvaluator = event.target.parentNode.parentNode;
		// modelClassName gets the model name as a string from modelEvaluator
		let modelClassName = modelEvaluator.classList[0];
		// cartListItem gets the element that is going to be removed
		let cartListItem   = modelEvaluator.parentNode;
		// itemQtyInCart gets the element (not the value) that contains the quantity demanded in each model
		let itemQtyInCart  = modelEvaluator.children[1].children[5].children[0];
		
		//Subtotal gets affected

		for(phoneModel in itemData) {

			if (modelClassName === phoneModel) {
				// This returns the quantity demanded to zero.
				itemData[phoneModel][3] = 0;
				// This tells the item is not anymore in the cart.
				// Remember this prevents duplicating the item in that list.
				itemData[phoneModel][7] = 0;
				// Inventory tracking
				itemData[phoneModel][2] += parseInt(itemQtyInCart.innerText);		
			}

			numberOfItemsInCart += itemData[phoneModel][3];
			subtotal += itemData[phoneModel][3]*itemData[phoneModel][0];

		}

		// After removing the item from the cart update the DOM text with the inventory available
		updateShowcaseItemsInfo();

		// Update the DOM text with the updated variables
		document.querySelector('.counter').innerText	   = numberOfItemsInCart;
		document.querySelector('#subtotalPrice').innerText = "Subtotal: $" + subtotal;

		// Clean these variables to properly keep track of the values
		// If not cleaned, the values can sum up double or more.
		numberOfItemsInCart     = 0;
		subtotal 			    = 0;

		// Remove item list from cart
		shoppingList.removeChild(cartListItem);

	}

});
