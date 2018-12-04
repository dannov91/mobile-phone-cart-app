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

// =======================================================================================
// 4. ADD ITEMS TO THE SHOWCASE
// =======================================================================================

// ---------------------------------------------------------------------------------------
// 4.1 --> Initial Variables - Selection or Global Variables
// ---------------------------------------------------------------------------------------

const btnCreateItem 		= document.querySelector('.btn-create-item')	;
const showcase				= document.querySelector('.featured-wrapper') 	;
const createForm			= document.querySelector('.create-form')		;

// Al of the following variables are the input fields from Create Item Panel

let productNameInput 		= document.querySelector('#product-name')		;
let previousPriceInput		= document.querySelector('#previous-price')		;
let actualPriceInput		= document.querySelector('#actual-price')		;
let totalInventoryInput		= document.querySelector('#total-inventory')	;
let modelColorInput			= document.querySelector('#model-color')		;
let modelCapacityInput		= document.querySelector('#model-capacity')		;
let phoneImageInput			= document.querySelector('#phone-image')		;

// When creating a new item this flag tells if all the inputs are with info
// Or if any input has an invalid character set.

let validationFlag			= 0;

// Lateral Margin Values for Carousel Items.
// Needs to be here in order to work properly.

const marginFinite = "10px"; 

// ---------------------------------------------------------------------------------------
// 4.2 --> Initial Variables - Selection or Global Variables
// ---------------------------------------------------------------------------------------		

btnCreateItem.addEventListener('click', () => {

	// Execute form validation flag function, this will prevent the item to be
	// created if the inputs are not correctly filled.

	formValidation();

	// If the inputs are correct then create item

	if (validationFlag === 0) {

		// 4.2.1 --> Assign Data to the Object Variable

		itemData[productNameInput.value.replace(/ /g,'')] = 
		[
		//0. Act Price
		actualPriceInput.value,
		//1. Prev Price
		previousPriceInput.value,
		//2. Inventory
		totalInventoryInput.value,
		//3.qtyDem
		0,
		//4.Color
		modelColorInput.value,
		//5.Capacity
		modelCapacityInput.value,
		//6. Image URL
		phoneImageInput.value,
		//7. Cart Flag
		0
		];

		// 4.2.2 --> Create Showcase Item in the DOM

		showcase.innerHTML +=
		`
		<li class="featured-item ` + productNameInput.value.replace(/ /g,'') + `" style="margin-left: ` + marginFinite + `; margin-right:` + marginFinite + `;">

			<div class="container-box">

				<div class="image-container">
					<a href="">
					<img id="product-image" src="` + phoneImageInput.value + `" alt="">
					</a>
				</div>

				<div class="footer-container-unhovered">
					<h2 class="featured-title">`+ productNameInput.value + `</h2>
					<div class="product-price">
						<span class="prev-price">&nbsp;</span>
						<span class="actual-price"></span>
					</div>
					<span class="review">
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
						(613)
					</span>
				</div>

				<div class="footer-container-clicked">

					<div class="icons-clicked">

						<a class="link-shopping-cart">
							<i class="fa fa-shopping-cart"></i>
							<div class="tool-cart-container">
								<span class="tooltip-cart">Add To Cart</span>
								<div class="squared-cart"></div>
							</div>
						</a>
				
					</div>

					<div class="qtyInput">
						<i class="fa fa-plus-circle"></i>
						<input class="qtyNumber" type="text" readonly value="1">
						<i class="fa fa-minus-circle"></i>
					</div>

					<div class="qtyAvailable">
						<span>Qty Available: </span><span id="inventory"></span>
					</div>

				</div>

				<i class="fa fa-heart"></i>
				<span class="normal-tag red-tag">HOT</span>

			</div>

		</li>
		`;

		// 4.2.3 --> Assigning text values to the created DOM Element

		updateShowcaseItemsInfo();
		updateRemoveListItems ();

		// 4.2.4 --> Update Carousel Variables After Adding Item

		clearInterval(refreshIntervalIdFinite);

		childCountFinite = carouselFinite.childElementCount;
		carouselFinite.style.width = childCountFinite*100 + '%';

		changeSizeSmallFinite(smallBpFinite);
		changeSizeMediumFinite(mediumBpFinite);
		changeSizeLargeFinite(largeBpFinite);
		changeSizeXlargeFinite(xlargeBpFinite);

		visualWidthFinite = carouselFinite.parentNode.offsetWidth;
		carouselWidthFinite = carouselFinite.offsetWidth;

		maxClicksFinite = childCountFinite - itemsInVisualFinite;

		carouselFinite.style.transform = 'translateX(0px)';
		carouselFinite.style.right = '0px';
		clickCountFinite = 0;

		flagEvaluationFinite ()

		itemsInVisualFinite = 
			Math.round(visualWidthFinite/
				(carouselWidthFinite/
				childCountFinite));

		carouselDirectionFinite(directionFinite, timeCounterFinite);
		mousingOverCarouselItems();

		// 4.2.5 --> Input Fields CleanUp

		productNameInput 	.value = ''; 		
		previousPriceInput	.value = '';	
		actualPriceInput	.value = '';	
		totalInventoryInput	.value = '';	
		modelColorInput		.value = '';	
		modelCapacityInput	.value = '';	
		phoneImageInput		.value = '';

	}
	
});

// ---------------------------------------------------------------------------------------
// 4.3 --> Input/Form Validation Function
// ---------------------------------------------------------------------------------------	

function formValidation() {

	const numberOfInputs = createForm.children.length - 1;
	const inputWarning	 = document.querySelector('.warning-empty');

	// 4.3.1 --> Validate if every input is filled with text

	for (let i = 0; i < numberOfInputs; i++) {
		if (createForm.children[i].children[1].value === '' ) {
			validationFlag = 1;
		}
	}

	// 4.3.2 --> Validate if the characters of each input are OK.

	for (let i = 0; i < numberOfInputs - 1; i++) {
		if (createForm.children[i].children[2].style.display === 'block') {
			validationFlag = 1;
		}
	}

	// 4.3.3 --> Display warning message if validation flag activates

	if (validationFlag === 1) {
		inputWarning.style.display = "block";
	} else {
		inputWarning.style.display = "none";
	}

}

// ---------------------------------------------------------------------------------------
// 4.4 --> Validating each character input from the user using RegEx
// ---------------------------------------------------------------------------------------

// 4.4.1 --> RegEx evaluator = Can only contain letters a-z in lowercase
function isValidLetters(letters) {
  return /^[\w\s-]+$/.test(letters);
}

// 4.4.2 --> RegEx evaluator = Must contain a lowercase, uppercase letter and a number
function isValidDigits(digits) {
  return /^[\d]+$/.test(digits);
}

// 4.4.3 --> RegEx evaluator = Must end with .jpg or .png
function isValidImage(url) {
  return /(\w+\.)(jpg$|png$)/.test(url);
}

// 4.4.4 --> Formatting Functions After Input (Capacity Case)

function formatCapacity(text) {
  const regex = /^([\d]+)$/;
  return text.replace(regex, '$1Gb');
}

// 4.4.5 --> Set Up Events

function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.nextElementSibling;
    showOrHideTip(showTip, tooltip);
  };
}

// 4.4.6 --> Set Up Events

productNameInput.addEventListener	("input", createListener(isValidLetters));
previousPriceInput.addEventListener ("input", createListener(isValidDigits));
actualPriceInput.addEventListener   ("input", createListener(isValidDigits));
totalInventoryInput.addEventListener("input", createListener(isValidDigits));
modelColorInput.addEventListener	("input", createListener(isValidLetters));
modelCapacityInput.addEventListener ("input", createListener(isValidDigits));
modelCapacityInput.addEventListener ("blur", e => {
  e.target.value = formatCapacity(e.target.value);
});
phoneImageInput.addEventListener	("input", createListener(isValidImage));

// =======================================================================================
// 5. REMOVE ITEMS FROM THE SHOWCASE
// =======================================================================================

const removeOptions 		= document.querySelector('#remove-options');
const btnRemoveItem 		= document.querySelector('.btn-remove-item');

// --> Set Up Events

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

// Remove an Item from the list

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