// ===========  FINITE CAROUSELFinite ALGORYTHM ============ //

// =======================================================================================
// 1. VARIABLE DECLARATIONS AND INITIAL CONDITIONS
// =======================================================================================

// ---------------------------------------------------------------------------------------
// 1.1 --> CarouselFinite Inputs
// ---------------------------------------------------------------------------------------

const timeCounterFinite = 2500; 		// --> Sets the time in ms for actioning carouselFinite
let directionFinite = 1;				// --> Sets the timer direction of the carouselFinite
										//     1 is RIGHT and any other value is LEFT
let autoMoveFlagFinite = 0;				// --> Used to stop or allow automatic movement (autoMoveFlagFinite === 1)

const mediaQueriesFinite = {			// --> min-width: (mediaQueriesFinite.key)px
	smallBp: 576,						// --> Two items are displayed
	mediumBp: 768,						// --> Three items are displayed
	largeBp: 992,						// --> Four items are displayed
	xlargeBp: 1100						// --> Six items are displayed
}

// ---------------------------------------------------------------------------------------
// 1.2 --> Initial Variables - Selection or Global Variables
// ---------------------------------------------------------------------------------------

const carouselFinite =
	document.querySelector
	('.featured-wrapper');				  	    // --> Select the carouselFinite item.
const icnArrowRightFinite = 
	document.querySelector
	('#finite-arrows .icn-arrow-right');		// --> Select the Right Arrow
const icnArrowLeftFinite = 
	document.querySelector
	('#finite-arrows .icn-arrow-left');;		// --> Select the Left Arrow
let childCountFinite =						
	carouselFinite.childElementCount;			// --> How many items are in the list.
let carouselWidthFinite = 0;						// --> CarouselFinite Total Width is calculated dependant of how many children it has.						//     Media Queries then resize the carouselFinite according to how many childrens are displayed.			 
let clickCountFinite = 0;						// --> How many positions the CarouselFinite has moved from the start 
let itemsInVisualFinite = 0;  					// --> How many items are visible in the current layout
let itemsDiffFinite = 0; 						// --> Variable used to evaluate if given a resize,
 												//     how many items were added/substracted.
 												//     Declared as global to avoid scope issues inside functions.
let maxClicksFinite = 0;  						// --> Describes what is the limit of clickCountFinites
let refreshIntervalIdFinite = 0;				// --> Variable used for setting the time interval.
												//     It is used inside a function, so it was declared
												//     as a global variable to avoid scope issues.
let flagFinite = 0;								// --> Used to stop the carouselFinite running if the number of children
												//     is equal or less than the actual display can hold

// ---------------------------------------------------------------------------------------
// 1.3 --> Margin Values Declaration & Assignment of Margins to List Items
// ---------------------------------------------------------------------------------------

window.addEventListener('load', () => {			// --> Initial Numerical Values for carouselFinite objects when the page is LOADED.

	carouselFinite.style.transform = 'translateX(0px)';
	carouselFinite.style.right = '0px';
	carouselWidthFinite = carouselFinite.offsetWidth;
	let visualWidthFinite = carouselFinite.parentNode.offsetWidth;
	itemsInVisualFinite = 
		Math.round(visualWidthFinite/
			(carouselWidthFinite/
			childCountFinite));
	maxClicksFinite = childCountFinite - itemsInVisualFinite;

	if (childCountFinite <= itemsInVisualFinite) {
			carouselFinite.style.transform = 'translateX(0px)';
			carouselFinite.style.right = '0px';
		}

	flagEvaluationFinite ();
	mousingOverCarouselItems();

});

// ---------------------------------------------------------------------------------------
// 1.4 --> Margin Values Declaration & Assignment of Margins to List Items
// ---------------------------------------------------------------------------------------

const carouselChildsFinite = carouselFinite.children;

for (const child of carouselChildsFinite) {
  child.style.marginLeft = marginFinite;
  child.style.marginRight = marginFinite;
}

// =======================================================================================
// 2. FUNCTIONS - STATIC WINDOW SIZE
// =======================================================================================

// ---------------------------------------------------------------------------------------
// 2.1 --> Main Action Functions
// ---------------------------------------------------------------------------------------

// 2.1.1 --> Main Triggers

carouselDirectionFinite(directionFinite, timeCounterFinite);			// --> Triggers carouselFinite movement with setTimeOut
icnArrowRightFinite.addEventListener('click', rightClickActionFinite);  // --> Moves CarouselFinite to the Right
icnArrowLeftFinite.addEventListener('click', leftClickActionFinite);	// --> Moves CarouselFinite to the Left

// 2.1.2 --> Main Functions

function rightClickActionFinite () {

	if (flagFinite === 0) {
		clearInterval(refreshIntervalIdFinite); 						// --> Clears the accumulated time from refreshInterval Id
		CSSRightAdjustmentFinite ();
		clickCountSumFinite ("right");
		maxClicksCalcFinite();
		moveCarouselAbsFinite("right");
		initPosRightFinite ();
		carouselDirectionFinite(directionFinite, timeCounterFinite);	// --> Creates a new time set Interval 
	}
}

function leftClickActionFinite () {

	if (flagFinite === 0) {
		clearInterval(refreshIntervalIdFinite); 						// --> Clears the accumulated time from refreshInterval Id
		CSSRightAdjustmentFinite ();
		clickCountSumFinite ("left");
		maxClicksCalcFinite();
		moveCarouselAbsFinite("left");
		maxPosLeftFinite ();
		carouselDirectionFinite(directionFinite, timeCounterFinite); 	// --> Creates a new time set Interval 
	}
}

// ---------------------------------------------------------------------------------------
// 2.2 --> Helper Functions
// ---------------------------------------------------------------------------------------

function CSSRightAdjustmentFinite () { 							// --> The value of "right" is transferred to "translateX"
																// 	   The transition is temporalily turned off to avoid fuzzy behaviour.

	if (parseInt(carouselFinite.style.right, 10) !== 0) {

		let rightAdjustment = 
			parseFloat(
			carouselFinite.style.transform.match(/\d+/)[0])
		 	+ parseFloat(carouselFinite.style.right, 10);
		carouselFinite.classList.add('noTransition');
		carouselFinite.style.transform =
			'translateX(-' + rightAdjustment + 'px)';
		window.getComputedStyle(carouselFinite).transform; 		// --> Extremely important to effectively turn off transition.
		carouselFinite.classList.remove('noTransition');

	}

}

function clickCountSumFinite (directionFinite) {				// --> clickCountFinite will add 1 to its value if the action is triggered to the right
																//     clickCountFinite will substract 1 to its value if the action is triggered to the left
	if (directionFinite === "right") {
		clickCountFinite += 1;
	} else if (directionFinite === "left") {
		clickCountFinite -= 1;
	}

}

function moveCarouselAbsFinite (directionFinite) {				// --> Moves the carouselFinite to the right or to the left,
																//     it depends if the action is triggered to the right or left respectively

	let itemWidth = carouselFinite.firstElementChild.offsetWidth;
	carouselFinite.style.right = "0px";

	if (directionFinite === "right") {
		let moveCarousel = clickCountFinite*itemWidth;

		// Adjust moveCarousel with margin values, "right" case

		moveCarousel += parseFloat(marginFinite, 10) * 2 * (clickCountFinite);

		// Then move carouselFinite with translateX

		carouselFinite.style.transform = 'translateX(-' + moveCarousel + 'px)';

	} else if (directionFinite === "left") {
		let moveCarousel = -(clickCountFinite*itemWidth);

		// Adjust moveCarousel with margin values, "left" case

		moveCarousel -= parseFloat(marginFinite, 10) * 2 * (clickCountFinite);

		// Then move carouselFinite with translateX

		carouselFinite.style.transform = 'translateX(' + moveCarousel + 'px)';
	}

}

function maxClicksCalcFinite () {									  // --> maxClicksFinite is recalculated in terms of how many items are displayed
															  		  //     versus how many children the carouselFinite has.
	let visualWidthFinite = carouselFinite.parentNode.offsetWidth;
	let carouselWidthFinite = carouselFinite.offsetWidth;
	itemsInVisualFinite = Math.round(visualWidthFinite/(carouselWidthFinite/childCountFinite));
	maxClicksFinite = childCountFinite - itemsInVisualFinite;

}

function initPosRightFinite () {									  // --> Moves carouselFinite to the first item
	if (clickCountFinite > maxClicksFinite) {
		carouselFinite.style.transform = 'translateX(0px)';
		carouselFinite.style.right = '0px';
		clickCountFinite = 0;
	}
}

function maxPosLeftFinite () {										  // --> Moves carouselFinite to the last item
	if (clickCountFinite < 0 ) {

		let moveCarousel = maxClicksFinite*carouselFinite.firstElementChild.offsetWidth;

		// The following code adjusts moveCarousel with margin values, left limit case

		moveCarousel += parseFloat(marginFinite, 10) * 2 * (maxClicksFinite);

		carouselFinite.style.transform = 'translateX(-' + moveCarousel + 'px)';
		carouselFinite.style.right = '0px';
		clickCountFinite = maxClicksFinite;
	}
}

function carouselDirectionFinite(directionFinite, timeCounterFinite) {				//--> triggers the timing function depending
	
	if (autoMoveFlagFinite === 0) {																			//    on the desired direction.
		if (directionFinite === 1) {
			refreshIntervalIdFinite = setInterval(rightClickActionFinite, timeCounterFinite);
		} else {
			refreshIntervalIdFinite = setInterval(leftClickActionFinite, timeCounterFinite);
		}
	}
}

function flagEvaluationFinite () {

	if (childCountFinite - itemsInVisualFinite <= 0 ) {								// --> Evaluate if the carouselFinite has to be stopped
		flagFinite = 1;											
	} else {
		flagFinite = 0;
	}

}

function mousingOverCarouselItems () {												// --> Mousing over will stop carousel from automatic movement
																					//     mousing out will continue automatic carousel movement

	for(let i = 0; i < carouselFinite.children.length; i++) {
		carouselFinite.children[i].addEventListener('mouseover', () => {
			clearInterval(refreshIntervalIdFinite);
		});
		carouselFinite.children[i].addEventListener('mouseout', () => {
			carouselDirectionFinite(directionFinite, timeCounterFinite);
		});
	}

}

// ---------------------------------------------------------------------------------------
// 2.3 --> Media Queries Functions
// ---------------------------------------------------------------------------------------

// 2.3.1 --> Functions

const changeSizeSmallFinite = function(mql) {
	if (mql.matches) {
		carouselFinite.style.width = childCountFinite*100/2 + "%";
	} else {
		carouselFinite.style.width = childCountFinite*100/1 + "%";
	}
}

const changeSizeMediumFinite = function(mql) {
	if (mql.matches) {
		carouselFinite.style.width = childCountFinite*100/3 + "%";
	} else {
		changeSizeSmallFinite(smallBpFinite);
	}
}

const changeSizeLargeFinite = function(mql) {
	if (mql.matches) {
		carouselFinite.style.width = childCountFinite*100/4 + "%";
	} else {
		changeSizeMediumFinite(mediumBpFinite);
	}
}

const changeSizeXlargeFinite = function(mql) {
	if (mql.matches) {
		carouselFinite.style.width = childCountFinite*100/5 + "%";
	} else {
		changeSizeLargeFinite(largeBpFinite);
	}

}

// 2.3.2 --> Functions Operations.
//			 These variables need to go AFTER the function declarations
//			 This is why they are located here.

const smallBpFinite = matchMedia('(min-width: ' + mediaQueriesFinite.smallBp + 'px)');
const mediumBpFinite = matchMedia('(min-width: ' + mediaQueriesFinite.mediumBp + 'px)');
const largeBpFinite = matchMedia('(min-width: ' + mediaQueriesFinite.largeBp + 'px)');
const xlargeBpFinite = matchMedia('(min-width: ' + mediaQueriesFinite.xlargeBp + 'px)');

smallBpFinite.addListener(changeSizeSmallFinite);
mediumBpFinite.addListener(changeSizeMediumFinite);
largeBpFinite.addListener(changeSizeLargeFinite);
xlargeBpFinite.addListener(changeSizeXlargeFinite);

changeSizeSmallFinite(smallBpFinite);
changeSizeMediumFinite(mediumBpFinite);
changeSizeLargeFinite(largeBpFinite);
changeSizeXlargeFinite(xlargeBpFinite);

// =======================================================================================
// 3. FUNCTIONS - DYNAMIC WINDOW RE-SIZE
// =======================================================================================

window.addEventListener('resize', () => {

// ---------------------------------------------------------------------------------------
// 3.1 --> Re-positioning when Re-sizing using "right" property
// ---------------------------------------------------------------------------------------

	let actualPosition = parseInt(carouselFinite.style.transform.match(/\d+/)[0]);
	let diff = actualPosition - (carouselFinite.firstElementChild.offsetWidth
							  + parseFloat(marginFinite, 10) * 2) * (clickCountFinite);
	carouselFinite.style.right = -diff + 'px'; //--> relative positioning with CSS "right" property
										 //    using "diff" as guide.

// ---------------------------------------------------------------------------------------
// 3.2 --> Items In Visual Permanent Evaluation
// ---------------------------------------------------------------------------------------

	let visualWidthFiniteEvaluation = carouselFinite.parentNode.offsetWidth;
	let carouselWidthFiniteEvaluation = carouselFinite.offsetWidth;
	let itemsInVisualFiniteEvaluation = Math.round(visualWidthFiniteEvaluation/(carouselWidthFiniteEvaluation/childCountFinite));

// ---------------------------------------------------------------------------------------
// 3.3 --> Media Queries Take Effect - Number of Items Displayed Changes
// ---------------------------------------------------------------------------------------

// 3.3.1 --> There are now more items displayed

	if ( itemsInVisualFiniteEvaluation > itemsInVisualFinite ) {

		itemsDiffFinite = itemsInVisualFiniteEvaluation - itemsInVisualFinite;
		itemsInVisualFinite = itemsInVisualFiniteEvaluation;

		if (childCountFinite <= itemsInVisualFinite) {
			carouselFinite.style.transform = 'translateX(0px)';
			carouselFinite.style.right = '0px';
		}

		flagEvaluationFinite ();

		// If it is not the first item, then...

		if ( clickCountFinite !== 0 ) {
			clickCountFinite -= itemsDiffFinite; 						// --> How many positions it should jump back.
			let itemWidth =
				carouselFinite.firstElementChild.offsetWidth;
			let moveCarousel = -(clickCountFinite*itemWidth);
			moveCarousel -=
				parseFloat(marginFinite, 10) * 2 * (clickCountFinite);
			carouselFinite.style.right = '0px'; 					// --> 0px since we are moving it absolutely with moveCarousel

			// If moveCarousel is negative, it should move.
			// If not, it means it has gone beyond the first item,
			// which is why we set TranslateX to 0px and reset clickCountFinite

			if (moveCarousel < 0) {
				carouselFinite.style.transform = 'translateX(' + moveCarousel + 'px)';
			} else {
				carouselFinite.style.transform = 'translateX(0px)';
				clickCountFinite = 0;
			}

		}

// 3.3.2 --> There are now less items displayed

	} else if (itemsInVisualFiniteEvaluation < itemsInVisualFinite) {
		itemsInVisualFinite = itemsInVisualFiniteEvaluation;

		if (childCountFinite <= itemsInVisualFinite) {
			carouselFinite.style.transform = 'translateX(0px)';
			carouselFinite.style.right = '0px';
		}

		flagEvaluationFinite ();

	}

});

