/***** ELEMENTS *****/
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const inputField = document.getElementById("in");
const form = document.querySelector("form");
const p = document.getElementById("p");
const q = document.getElementById("q");
const op = document.getElementById("op");
const response = document.getElementById("response"); // used for Try Again text
const results = document.getElementById("results");
const category = document.getElementById("category");
const timeData = document.querySelector('[data-time=timer]');
const levelData = document.querySelector('[data-level=level]');



/***** STATE VARIABLES *****/
let max = 5;
let num1;
let num2;
let answer;
let newMax = max;
let startTime;
let endTime;
let currTime;
let gameTime;
const pics = [`url(img/paranormal.jpg)`,
							`url(img/xfilesface copy.jpg)`,
							`url(img/dadu.jpeg)`,
							`url(img/fumata.jpeg)`,
							`url(img/government.jpg)`,
							`url(img/hand.jpeg)`,
							`url(img/infor.jpeg)`,
							`url(img/TTIOT.jpeg)`,
							`url(img/ED.jpeg)`,
							`url(img/gilA.jpeg)`
						]

let count; // number of correct answers
let times = [];

/***** INITIALIZING *****/
inputField.className = "hide";
stopButton.className = "hide";

/***** EVENTS *****/
startButton.onclick = function() {
	// initializing the count
	count = 0;
	times = [];
	results.innerHTML = ""; // clear results
	category.innerHTML = ""; // clear category
	refreshNums();
	inputField.className = ""; // show the input field
	stopButton.className = ""; // show the stop button
	startButton.className = "hide"; // hide the start button
	inputField.focus();
	gameTime = new Date();
};

form.onsubmit = function(e) {
	// need to prevent the default form submission wich reloads the page
	e.preventDefault();
	getAnswer();
};


stopButton.onclick = function() {
	const len = pics.length;
	document.body.style.backgroundImage= pics[Math.floor(Math.random() * len)];
	var resultString;
	var categoryString;
	if (times.length > 0) {
		// getting mean time
		var total = 0;
		for (var i = 0; i < times.length; i++) {
			total += times[i];
		}
		var mean = (total / times.length) / 1000;
		resultString = "Average time: " + mean.toPrecision(4) + " sec";
		categoryString = getCategory(mean,newMax)[0];
		newMax = getCategory(mean,newMax)[1];
	} else {
		resultString = "No results recorded. Hit the Enter key to submit your answers.";
		categoryString = "";
	}

	inputField.className = "hide"; // hide the input field
	stopButton.className = "hide"; // hide the stop button
	startButton.className = ""; // show the start button

	// clear numbers and present results
	p.innerHTML = "";
	q.innerHTML = "";
	op.innerHTML = "";
	response.innerHTML = ""; // clear response in case it was set
	results.innerHTML = resultString;
	category.innerHTML = categoryString;
};

/***** FUNCTIONS ******/
var refreshNums = function() {
	// Getting some random numbers
	const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]
	console.log(max);
	num1 = primes[Math.floor((Math.random() * newMax))];
	num2 = primes[Math.floor((Math.random() * newMax))];
	// Printing numbers to user
	p.innerHTML = num1;
	op.innerHTML = "x";
	q.innerHTML = num2;
	// Starting timer
	startTime = new Date();

	levelData.innerText = `Level: ${newMax - 4}`;
};

/*
* This is called in the onsubmit event
*/
var getAnswer = function() {
	var correct = num1 * num2;
	// Getting the users attempt
	answer = parseInt(inputField.value);
	currTime = new Date();
	timeData.innerHTML = `<h3>Time elapsed: </h3>`;
	let timeLapse = currTime.getTime() - gameTime.getTime()
	let timeMin = Math.floor(timeLapse / (1000* 60));
	let timeSec = timeLapse %(1000*60)/1000;
	timeData.innerHTML = `<h3>Time elapsed: ${timeMin} min ${timeSec} sec</h3>`;
	if (answer === correct) {
		// Stopping the timer and adding the time to the times array
		endTime = new Date();
		times[count++] = endTime.getTime() - startTime.getTime();
		// the answer was correct, so no need for "Try Again"
		response.innerHTML = "";
		refreshNums();
	} else {
		response.innerHTML = "Try Again";
	}
	// clear the input field for the next round
	inputField.value = "";
};

var getCategory = function(mean,maxi) {
	var c;
	if (mean < 2) {
			maxi += 2;
		c = "You Belong to an X-file";
	} else if (mean < 4) {
		maxi += 1
		c = "Fast calculator";
	} else if (mean < 6) {
		c = "B Student ";
	} else if (mean < 7.5){
		c = "C+ student / Average human specimen.";
		maxi -= 1;
	} else if (mean < 10) {
		maxi -= 2;
		c = "Probably Drunk";
	} else {
		maxi -= 3;
		c = "High School Drop Out, quit marihuana";
	}
	return [c,maxi];
};
