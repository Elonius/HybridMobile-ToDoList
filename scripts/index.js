// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
	"use strict";

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);

	function onDeviceReady() {
		// Handle the Cordova pause and resume events
		document.addEventListener('pause', onPause.bind(this), false);
		document.addEventListener('resume', onResume.bind(this), false);

		// TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
		// Mapping buttons to variables and functions
		let btnAdd = document.querySelector("#btnAdd");
		btnAdd.addEventListener("click", addTask);
		let btnComplete = document.querySelector("#btnComplete");
		btnComplete.addEventListener("click", completeTask);

		let btnDelete = document.querySelector("#btnDelete");
		btnDelete.addEventListener("click", deleteTask);

		// Disabling buttons on load, except Add button
		btnAdd.classList.add("btnEnable");
		DisableBtns()

		// Global variables
		//window.list = [];
		window.i = 0;

		document.querySelector("#content ul").addEventListener("click", handleClick);
	};

	function onPause() {
		// TODO: This application has been suspended. Save application state here.
	};

	function onResume() {
		// TODO: This application has been reactivated. Restore application state here.
	};

	function addTask() {
		navigator.notification.prompt(
			'Enter a task',
			onPrompt,
			'ToDo',
			['Ok', 'Exit'],
		);
		ResetHighlight();
	}

	function completeTask() {
		let task = document.querySelectorAll("li");
		for (let i = 0; i < task.length; i++) {
			if (task[i].classList.contains("highlight")) {
				task[i].classList.add("complete");
				btnComplete.setAttribute("disabled", "disabled");
				btnComplete.classList.remove("btnEnable");
			}
		}
	}

	function deleteTask() {
		let task = document.querySelectorAll("li");
		for (let i = 0; i < task.length; i++) {
			if (task[i].classList.contains("highlight")) {
				task[i].remove();
				DisableBtns();				
			}			
		}
	}

	function onPrompt(results) {
		if (results.input1 === "")
			alert("Enter a task");
		else {
			//list.push(results.input1);
			document.querySelector("#content ul").innerHTML += "<li>" + results.input1 + "</li>"
		}
	}

	// Add highlighting
	function handleClick(e) {
		ResetHighlight();
		e.target.classList.add("highlight"); // Highlight the selected task
		EnableBtns() // Enable buttons
		if (e.target.classList.contains("complete")) { // Disable Complete btn if it has the 'complete' class
			btnComplete.setAttribute("disabled", "disabled");
			btnComplete.classList.remove("btnEnable");
		}
	}

	function ResetHighlight() {
		let liTags = document.querySelectorAll("#content ul li");
		// Remove highlight from all tasks
		for (let i = 0; i < liTags.length; i++)
			liTags[i].classList.remove("highlight");
	}

	function DisableBtns() {
		btnComplete.setAttribute("disabled", "disabled");
		btnComplete.classList.remove("btnEnable");
		btnDelete.setAttribute("disabled", "disabled");
		btnDelete.classList.remove("btnEnable");
	}

	function EnableBtns() {
		btnComplete.removeAttribute("disabled");
		btnComplete.classList.add("btnEnable");
		btnDelete.removeAttribute("disabled");
		btnDelete.classList.add("btnEnable");
	}
})();