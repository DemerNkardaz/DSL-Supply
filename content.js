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


const keysDown = [];
const modifierShortcuts = {
	'<^': 'ControlLeft',
	'>^': 'ControlRight',
	'<!': 'AltLeft',
	'>!': 'AltRight',
	'<+': 'ShiftLeft',
	'>+': 'ShiftRight',
};

window.onkeydown = function (e) {
	if (!keysDown.includes(e.code)) {
		keysDown.push(e.code);
	}

	const char = e.key
	if (char.length === 1) {
			const codePoint = char.codePointAt(0);
			
			if (
					(codePoint >= 0x0400 && codePoint <= 0x04FF) ||
					(codePoint >= 0x0500 && codePoint <= 0x052F) ||
					(codePoint >= 0x2DE0 && codePoint <= 0x2DFF) ||
					(codePoint >= 0xA640 && codePoint <= 0xA69F) ||
					(codePoint >= 0x1C80 && codePoint <= 0x1C8F) ||
					(codePoint >= 0x1E030 && codePoint <= 0x1E08F)
			) {
					console.log("🔹 Русская раскладка");
			} else {
					console.log("🔸 Латинская раскладка или другой язык");
			}
	}


	console.log(keysDown);

	const capsLock = e.getModifierState("CapsLock")

		
	for (const prop in combinations) {
		if (isCombination(prop)) {
			if (Array.isArray(combinations[prop])) {
				insertTextAtCursor(e, combinations[prop][capsLock ? 0 : 1]);
			} else {
				insertTextAtCursor(e, combinations[prop]);
			}
			return;
		}
	}
};



const combinations = {
	'<^`<!`KeyA': String.fromCharCode(0x0301),
	'<^`>!`KeyA': ['Ă', 'ă'],
	'<^`>!`>+`KeyA': ['Ā', 'ā'],
	'<^`>!`<+`KeyA': ['Ä', 'ä'],
	'<^`>!`<!`KeyA': ['Â', 'â'],
	'<^`>!`<!`>+`KeyA': ['Ą', 'ą'],
	'<^`>!`<!`<+`KeyA': ['Å', 'å'],
}

function isCombination(keys) {
	const keysArray = keys.split('`');

	for (let i = 0; i < keysArray.length; i++) {
		const key = keysArray[i];
		if (key in modifierShortcuts) {
			keysArray[i] = modifierShortcuts[key];
		}
	}

	if (keysArray.length !== keysDown.length) {
		return false;
	}

	for (let i = 0; i < keysArray.length; i++) {
		if (keysArray[i] !== keysDown[i]) {
			return false;
		}
	}

	return true;
}

window.onkeyup = function (e) {
	const index = keysDown.indexOf(e.code);
	if (index !== -1) {
		keysDown.splice(index, 1);
	}
};



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
		return
	}
}




