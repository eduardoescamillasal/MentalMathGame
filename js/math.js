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
const userStat = document.querySelector('.statList');
const leftPanel = document.querySelector('.left');
const conspTitle = document.querySelector('.conspTitle');
const conspContent = document.querySelector('.conspContent');


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
let userList= [];

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
	const docLen = conspiracies.length;
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
	[categoryString, newMax] = getCategory(mean,newMax);
	let item = {'mean': mean, 'level':newMax };
	userList.push(item);
	populateList(userList, userStat);
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
  let index_cons	= Math.floor(Math.random() * docLen);
	let chosenConspiracy = conspiracies[index_cons];
	conspTitle.innerText = chosenConspiracy.title;
	conspContent.innerText = chosenConspiracy.content;
};

/***** FUNCTIONS ******/
var refreshNums = function() {
	// Getting some random numbers
	const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
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

function populateList(userList=[], userStat){
	userStat.innerHTML = userList.map((item,i) => {
		return `
			<li>
				Level: ${item.level}, Ave: ${item.mean}
			</li>
		`;
	})
}

var getCategory = function(mean,maxi) {
	var c;
	console.log(maxi)
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

//stopButton.addEventListener('mouseenter', stopButton.onclick)

var mkultra = `MKUltra
Genuine American research in the 1950s and 1960s into chemical interrogation and mind-control techniques were followed by many conspiracy theories (like Project Monarch), especially following CIA Director Richard Helm's 1973 order to destroy all files related to the project. These theories include the allegation that the mass fatality at Jonestown in 1978 was connected to an MKUltra experiment.`;

var techSupression = `Numerous theories pertain to the alleged suppression of certain technologies and energies. Such theories may focus on the Vril Society Conspiracy, allegations of the suppression of the electric car by fossil-fuel companies (as detailed in the 2006 documentary Who Killed the Electric Car?), and the Phoebus cartel, set up in 1924, which has been accused of suppressing longer-lasting light bulbs.[281] Other long-standing allegations include the suppression of perpetual motion and cold fusion technology by government agencies, special interest groups, or fraudulent inventors.[282]

Promoters of alternative energy theories have included Thomas Henry Moray, Eugene Mallove, and convicted American fraudster Stanley Meyer`;

var falseHistory =`Some theories claim that the dates of historical events have been deliberately distorted. These include the phantom time hypothesis of German conspiracy theorist[citation needed][original research?] Heribert Illig, who in 1991 published an allegation that 297 years had been added to the calendar by establishment figures such as Pope Sylvester II in order to position themselves at the millennium.[292]

A comparable theory, known as the New Chronology, is most closely associated with Russian theorist Anatoly Fomenko. Fomenko holds that history is many centuries shorter than is widely believed and that numerous historical documents have been fabricated, and legitimate documents destroyed, for political ends. Adherents of such ideas have included chess grandmaster Garry Kasparov.`;

var vaccines = `It is claimed that the pharmaceutical industry has mounted a cover-up of a causal link between vaccines and autism. The conspiracy theory developed after the publication in Britain in 1998 of a fraudulent paper by discredited former doctor Andrew Wakefield.[255] The resulting anti-vaccine movement has been promoted by a number of prominent persons including Rob Schneider,[256] Jim Carrey[257] and U.S. President Donald Trump,[258][259] and has led to increased rates of infection and death from diseases such as measles in many countries, including the US, Italy, Germany, Romania and the UK.[260][261][262][263]

Vaccine conspiracy theories have been widespread in Nigeria since at least 2003, as well as in Pakistan. Such theories may feature claims that vaccines are part of a secret anti-Islam plot, and have been linked to fatal mass shootings and bombings at vaccine clinics in both countries.`;

var globWarm = `A global warming conspiracy theory typically alleges that the science behind global warming has been invented or distorted for ideological or financial reasons.[12] Many have promoted such theories, including U.S. President Donald Trump,[267][268] US Senator James Inhofe,[269] British journalist Christopher Booker,[269] and Viscount Christopher Monckton`;
var conspiracies = [
	{title:'MKultra', content:mkultra},
	{title:'Technology Supression', content:techSupression},
	{title: 'False History', content:falseHistory},
	{title: 'Vaccines', content:vaccines},
	{title: 'Global Warming', content:globWarm}
];
