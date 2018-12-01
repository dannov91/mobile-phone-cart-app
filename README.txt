/-------	MOBILE PHONE CART APP	      -------/

Made with vanilla JavaScript.

* Features *

1. Mobile phone carousel showcase with automatic movement to the right, I took the code from the Finite Carousel I developed and applied it.
2. Hovering over the items will show the unit price, available inventory and how many items would you like to add to the cart.
3. Adding items to the cart clicking on the cart icon.
4. Removing items from the cart clicking the trash icon.
5. Subtotal calculation based on unit price and quantities.

* Extended Features *

1. Optional Administrator panel which allows you to add or remove items from the showcase. It is open by default, but can be hidden.
2. Inputs from the Create Items:
	2.1. All of them must be filled with information
	2.2. Each input field is validated with regular expressions to avoid unwanted data.
   If any of these conditions are met, an error message will appear.
3. The Remove Items panel is automatically updated when adding or removing items from the showcase.

* Future implementations *

The image URL from the Create Items panel allow any string, making possible to insert image-less items to the showcase. To solve this, the input will be validated only if the HTTP status is 200 AND the file ends with popular image formats like png or jpg.
