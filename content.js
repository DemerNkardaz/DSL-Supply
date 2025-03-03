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


window.onkeydown = function (e) {
	if (inputFieldFocused()) {
		console.log(e.key);
		if (e.key === 'AltGraph') {
			insertTextAtCursor(e.key);
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




