import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalQuickstartWidget = () => {

	let getAllTabElements = function () {
		var tabElements = document.querySelectorAll('.quickstart-tabs .tabs__item');
		console.log('got ' + tabElements.length + ' elements...')
		return tabElements;
	}

	let getByText = function (text) {
		var allElements = getAllTabElements();
		console.log('looking for ' + text + ' via ' + allElements.length + ' allElements...')
		var selectedElement;
		// docusaurus seems to be stripping away some array extensions like find()...
		allElements.forEach(el => {
			if (el.innerHTML == text) {
				selectedElement = el;
			}
		})
		return selectedElement;
	}

	let disableByText = function (text) {
		var targetElement = getByText(text);
		targetElement.classList.add('disabled-tab');
	}

	let enableByText = function (text) {
		var targetElement = getByText(text);
		targetElement.classList.remove('disabled-tab');
	}

	let selectByText = function (text) {
		var targetElement = getByText(text);
		targetElement.click();
	}

	let isSelectedByText = function (text) {
		var targetElement = getByText(text);
		console.log(targetElement.classList[0]);
		var isSelected = targetElement.classList.contains('tabs__item--active');
		console.log(text + ' isSelected: ' + isSelected);
		return isSelected;
	}

	let bindTabs = function () {
		setTimeout(function () {
			var tabElements = getAllTabElements();
			tabElements.forEach(element => {
				var isLabel = element.textContent.indexOf(":") > -1;
				if (isLabel) {
					console.log('is label... unbinding')
					// unbind so tab can't be selected
					element.outerHTML = element.outerHTML;
				} else {
					element.addEventListener("click", function (event) {
						var targetElement = event.target;
						var textContent = targetElement.textContent;

						if (textContent == 'Besu') {
							// disable IPC, select http
							selectByText('HTTP-JWT');
							disableByText('IPC');
						} else if (textContent == 'Geth' || textContent == 'Nethermind') {
							// enable IPC
							enableByText('IPC');
						} else if (textContent == 'IPC') {
							// disable Besu
							disableByText('Besu');
							// if besu selected, select geth
							if (isSelectedByText('Besu')) {
								selectByText('Geth');
							}
						}
					}, false)
				}
			});
			console.log("start with the user, work backwards to the technology...");
			console.log("start with utopia, work backwards to the mechanism design...");
		}, 500)
	}

	return (
		<BrowserOnly>
			{() => { bindTabs() }}
		</BrowserOnly>
	);
};