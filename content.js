// content.js — Этот файл будет взаимодействовать со страницей

console.log("DSL Supply активирован");


console.log("Контент-скрипт был успешно загружен на страницу.");
function inputFieldFocused() {
	const activeElement = document.activeElement;
	return activeElement &&
		(activeElement.tagName === 'INPUT' ||
			activeElement.tagName === 'TEXTAREA' ||
			activeElement.isContentEditable ||
			(activeElement.hasAttribute('contenteditable') && activeElement.getAttribute('contenteditable') === 'true'));
}

let modifierKey = '';
let currentKey = '';

window.onkeydown = function (e) {
	if (inputFieldFocused()) {
		console.log(e.key);
		if (['AltGraph', 'Alt', 'Control', 'Shift'].includes(e.key)) {
			prefix = (['Control', 'Shift'].includes(e.key) ? (e.location === 1 ? 'Left' : 'Right') : '')
			modifierKey = prefix + e.key;
		} else {
			currentKey = e.key;
		}
		console.log(modifierKey + currentKey);
		if (currentKey.length > 0) {
			if (modifierKey === 'AltGraph' && currentKey === 'A') {
				e.preventDefault();
				insertTextAtCursor("Ă");
				modifierKey = '';
				currentKey = '';
			}
		}
		}
	
}


function insertTextAtCursor(text) {
	const activeElement = document.activeElement;
	if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
		const start = activeElement.selectionStart;
		const end = activeElement.selectionEnd;
		const value = activeElement.value;
		
		activeElement.value = value.substring(0, start) + text + value.substring(end);
		activeElement.selectionStart = activeElement.selectionEnd = start + text.length;
		activeElement.dispatchEvent(new Event("input", { bubbles: true }));
	}
}




