// Selecting
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// Initializing
var colors = [];
var numSquares = 6;
var pickedColor;


// Manipulating 

// Adding event listener to reset button
resetButton.addEventListener("click", function() { reset(); });

// 1. Init function
init();
function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}

// 2. setUpModeButtons function
function setUpModeButtons() {
	// looping through all mode buttons, i.e, Easy and hard
	for (var i = 0; i < modeButtons.length; i++) {
		// Adding event listeners to both buttons
		modeButtons[i].addEventListener("click", function() {
			// Remove selected class from both
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			// Add selected class to the button that is selected
			this.classList.add("selected");
			// Check if button selected is easy or hard and assign numSquares
			this.textContent ==="Easy"? numSquares = 3 : numSquares = 6;
			// Calling reset function to reset the colors when the easy or hard button is clicked
			reset();
		})
	}
}

// 3. Function used to change background color of all the squares to the correct answer when player selects the correct color
function changeColors(color) {
	// loop through all squares and add parameter passed to function as the color of each square
	for(var i = 0; i < squares.length; i++) { squares[i].style.background = color; }
}



//4. setUpSquares function
function setUpSquares() {
	// looping through all squares
	for(var i = 0; i < squares.length; i++) {
		// Adding event listeners to all squares
		squares[i].addEventListener("click", function() {
			// selecting a particular square
			var clickedColor = this.style.backgroundColor;
			// Checking is the color selected is equal to the correct answer
			if(clickedColor === pickedColor) {
				// if correct, change message display to correct, change the color of all squares to the correct color,
				// change background color of h1 to the correct color and change text content of reset button to "Play Again?"
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?"; }
				else {
				// else change background color of the selected square to match the background color of the body and change message display to "Try Again"
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"; }
		});
	}
}




//5. Function to select a color from colors array to be the correct answer
function pickColor() {
	// choose a random number based on length of colors array
	var random = Math.floor(Math.random() * colors.length);
	// return that random color
	return colors[random];
}


//6. Reset function
function reset() {
	// generate and array of random colors using generateRandomColors function and assign it to colors
	colors = generateRandomColors(numSquares);
	// Pick one color to be the answer using the pickColor function and assign that to pickedColor
	pickedColor = pickColor();
	// Change color display in H1 to show the color picked
	colorDisplay.textContent = pickedColor;
	// Change messageDisplay to be empty
	messageDisplay.textContent = "";
	// Change text content of reset button to "New colors"
	resetButton.textContent = "New Colors";
	// Loop through all squares to assign colors from colors array
	for(var i = 0; i<squares.length; i++)
	{
		// if colors array has colors change display of squares to block and assign colors to squares. if colors array has 6 elements all squares will have colors
		if(colors[i])
		{ squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i]; }
			// else change display of the squares to none. if colors has 3 elements, first 3 squares will have a color and the rest of the squares will have display none
		else { squares[i].style.display = "none"; }
	}
	// Change background color of of h1 to steelblue
  h1.style.backgroundColor = "steelblue";
}



//7. Function to create random colors
function randomColor() {
	// Generate random number upto 255 and return rgb string
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

//8. Function to generate an array with random colors
function generateRandomColors(num) {
	var arr = [];
	// Based on parameter, push color returned by random color function to arr
	for(var i = 0; i < num; i++) { arr.push(randomColor()); }
	// Return resultant array
	return arr;
}
