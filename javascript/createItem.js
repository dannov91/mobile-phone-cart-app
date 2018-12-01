const btnCreateItem 		= document.querySelector('.btn-create-item')	;
const showcase				= document.querySelector('.featured-wrapper') 	;
const createForm			= document.querySelector('.create-form')		;
let productNameInput 		= document.querySelector('#product-name')		;
let previousPriceInput		= document.querySelector('#previous-price')		;
let actualPriceInput		= document.querySelector('#actual-price')		;
let totalInventoryInput		= document.querySelector('#total-inventory')	;
let modelColorInput			= document.querySelector('#model-color')		;
let modelCapacityInput		= document.querySelector('#model-capacity')		;
let phoneImageInput			= document.querySelector('#phone-image')		;
let validationFlag			= 0;

const marginFinite = "10px"; // Lateral Margin Values for Carousel Items

// Modifiers		

btnCreateItem.addEventListener('click', () => {

formValidation();

	if (validationFlag === 0) {

		// Assign Data to the Object Variable

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

		// Create Item in the Showcase

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

		//Assigning text values to the created DOM Element

		updateShowcaseItemsInfo();
		updateRemoveListItems ();

		// Update Carousel Variables After Adding Item

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

		// Input Fields CleanUp

		productNameInput 	.value = ''; 		
		previousPriceInput	.value = '';	
		actualPriceInput	.value = '';	
		totalInventoryInput	.value = '';	
		modelColorInput		.value = '';	
		modelCapacityInput	.value = '';	
		phoneImageInput		.value = '';

	}
	
});

// Input/Form validation

function formValidation() {

	const numberOfInputs = createForm.children.length - 1;
	const inputWarning	 = document.querySelector('.warning-empty');

	// Validate if every input is filled with text

	for (let i = 0; i < numberOfInputs; i++) {
		if (createForm.children[i].children[1].value === '' ) {
			validationFlag = 1;
		}
	}

	// Validate if the characters of each input are OK.

	for (let i = 0; i < numberOfInputs - 1; i++) {
		if (createForm.children[i].children[2].style.display === 'block') {
			validationFlag = 1;
		}
	}

	console.log(validationFlag)

	if (validationFlag === 1) {
		inputWarning.style.display = "block";
	} else {
		inputWarning.style.display = "none";
	}

}

// Validating each character input from the user using RegEx

// Can only contain letters a-z in lowercase
function isValidLetters(letters) {
  return /^[\w\s-]+$/.test(letters);
}

// Must contain a lowercase, uppercase letter and a number
function isValidDigits(digits) {
  return /^[\d]+$/.test(digits);
}

/**
 * 
 * FORMATTING FUNCTIONS
 * 
 */

	function formatCapacity(text) {
	  const regex = /^([\d]+)$/;
	  return text.replace(regex, '$1Gb');
	}

/**
 * 
 * SET UP EVENTS
 * 
 */

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


productNameInput.addEventListener	("input", createListener(isValidLetters));
previousPriceInput.addEventListener ("input", createListener(isValidDigits));
actualPriceInput.addEventListener   ("input", createListener(isValidDigits));
totalInventoryInput.addEventListener("input", createListener(isValidDigits));
modelColorInput.addEventListener	("input", createListener(isValidLetters));
modelCapacityInput.addEventListener ("input", createListener(isValidDigits));
modelCapacityInput.addEventListener("blur", e => {
  e.target.value = formatCapacity(e.target.value);
});