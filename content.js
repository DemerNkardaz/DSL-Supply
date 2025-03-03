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


/*

if (inputFieldFocused()) {
	if (['AltGraph', 'Alt', 'Control', 'Shift'].includes(e.key)) {
		prefix = (['Control', 'Shift'].includes(e.key) ? (e.location === 1 ? 'Left' : 'Right') : '')
		modifierKey = modifierKey + prefix + e.key;
		console.log(modifierKey);
	} else {
		currentKey = e.key;
	}


	if (currentKey.length > 0) {
		if (modifierKey === 'LeftControlAltGraph' && currentKey === 'A') {
			insertTextAtCursor(e, "Ă");
		} else if (modifierKey === 'LeftControlAltGraphRightShift' && currentKey === 'A') {
			insertTextAtCursor(e, "Ā");
		} else if (modifierKey === 'LeftControlAltGraphLeftShift' && currentKey === 'A') {
			insertTextAtCursor(e, "Ä");
		}

		modifierKey = '';
		currentKey = '';
	}
	}
*/

const keysDown = [];

window.onkeydown = function (e) {
	if (!keysDown.includes(e.code)) {
		keysDown.push(e.code);
	}
	console.log(keysDown);

	if (keysDown.includes('AltRight') && keysDown.includes('KeyA')) {
		insertTextAtCursor(e, keysDown.includes('ShiftRight') ? "Ā" : keysDown.includes('ShiftLeft') ? "Ä" :  "Ă");
	}
}

window.onkeyup = function (e) {
	const index = keysDown.indexOf(e.code);
	if (index !== -1) {
		keysDown.splice(index, 1);
	}
	console.log(keysDown);
}


function insertTextAtCursor(e, text) {
	if (inputFieldFocused()) {
		e.preventDefault();
		const activeElement = document.activeElement;
		const start = activeElement.selectionStart;
		const end = activeElement.selectionEnd;
		const value = activeElement.value;
		
		activeElement.value = value.substring(0, start) + text + value.substring(end);
		activeElement.selectionStart = activeElement.selectionEnd = start + text.length;
		activeElement.dispatchEvent(new Event("input", { bubbles: true }));
	}
}




