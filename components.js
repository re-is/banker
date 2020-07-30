// HUF tagolás:
String.prototype.toAmount = (function() { return String(this).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') });
Number.prototype.toAmount = (function() { return String(this).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') });

// Szóközök törlése:
String.prototype.fromAmount = (function() { let t = String(this); return parseInt(((t === '') ? '0' : t).replace(/\s/g, '')) });

// 1 -> 01:
String.prototype.toDouble = (function() { return ('0' + this).slice(-2) });
Number.prototype.toDouble = (function() { return ('0' + String(this)).slice(-2) });

// Hónap nevek:
Number.prototype.monthName = (function() {
	let t = Number(this);
	return ((t === 0) ? ' Január' : (t === 1) ? ' Február' : (t === 2) ? ' Március' : (t === 3) ? ' Április' : (t === 4) ? ' Május' : (t === 5) ? ' Június' : (t === 6) ? ' Július' : (t === 7) ? ' Augusztus' : (t === 8) ? ' Szeptember' : (t === 9) ? ' Október' : (t === 10) ? ' November' : ' December');
});

// Toast & Log:
function psh(t) { // noinspection JSUnresolvedVariable, JSUnresolvedFunction
	g.isPhone ? ad.msg(t) : console.log(t)
}

// Funkció futtatása 100ms múlva, csak egyszer:
function oneTimer(id, func, ms) { if (!g.timers[id]) g.timers[id] = setTimeout(function() { func(); delete g.timers[id] }, (ms ? ms : 100)) }

// NumPad láthatóság:
function showNumPad(b) {
	// Megjelenítés onBlur() :
	if (b) setTimeout(function() { g.class.elem('numpad').style.display = 'table' }, 200);
	// Elrejtés onFocus() :
	else g.class.elem('numpad').style.display = 'none';
}

// Oldal láthatóság:
function showPage(cl_ss) {
	const divs = document.getElementsByTagName('div');
	for (let div of divs) { if (g.class.get(div, 'Page')) g.class.set(div, 'visible', false) }
	g.class.set(cl_ss, 'visible', true);
}

// CSS property lekérése:
function getCssValue(selector, name) {
	let rules = document.styleSheets[0].cssRules, value = '';
	for (let rule of rules) { if (rule.selectorText === selector) value = rule.cssText.split(name + ': ')[1].split(';')[0] }
	return value;
}

// CSS property megadása:
function setCssValue(styleObject) {
	var selectors = '', style, name, notPoint;
	for (let cl_ss in styleObject) selectors += (' .' + cl_ss);
	let rules = document.styleSheets[0].cssRules;
	for (let rule of rules) {
		// Ha van ilyen selector:
		if (selectors.indexOf(rule.selectorText) > -1) {
			notPoint = rule.selectorText.substring(1, rule.selectorText.length);
			style = styleObject[notPoint];
			//-------------- Az első érték a név, másodszorra stílus megadás értékkel:
			for (let i in style) ((i % 2 === 0) ? name = style[i] : rule.style[name] = style[i]);
		}
	}
}

// Gombok megadása:
function addButtons() {
	setTimeout(function() {
		g.buttons = []; Array.from(document.getElementsByClassName('buttons')).forEach(function(button) { g.buttons.push(button) });
		//psh(g.buttons.length);
	}, 50);
}
