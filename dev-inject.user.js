// ==UserScript==
// @name         WCPune27 local CSS
// @description  DEV ONLY: layers remote-css/wcpune2027.css (served from localhost) on the live site.
// @match        https://pune.wordcamp.org/2027/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

// Start the server first:  cd remote-css && python3 -m http.server 8027
(function () {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = 'http://localhost:8027/wcpune2027.css?t=' + Date.now(); // cache-bust
	document.head.appendChild(link);
})();
