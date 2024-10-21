/** appease all userscript managers */
const addStyle = (...args) => /* eslint-disable-next-line new-cap */
	GM?.addStyle(...args) ?? GM_addStyle(...args);

/** make previous/next shortcuts work */
const fixPager = config => pager =>
	pager.classList.add(...config.pagerClassесToAdd);

/** make "go to first page" work */
const fixFirstPage = config => pager => {
	const firstPageButton = config.findFirstPage(pager);

	firstPageButton?.setAttribute("title", config.titleForFirstPage);
};

/** make "go to last page" work */
const fixLastPage = config => pager => {
	const currentPage = config.findCurrentPage(pager);

	currentPage?.classList.add("current");
};

export function fixAllPagers(config) {
	config.findPagers().forEach(fixPager(config));
}

export function fixAllFirstPages(config) {
	config.findPagers().forEach(fixFirstPage(config));
}

export function fixAllLastPages(config) {
	config.findPagers().forEach(fixLastPage(config));
}

export function reInitiKeybindings() {
	//$.cache is missing some times which stops the destroy() call
	$.cache ??= {};
	$.cache[document[jQuery.expando]] ??= {};
	$.cache[document[jQuery.expando]].events = {};

	//turn it off and on again
	StackExchange.keyboardShortcuts.destroy();
	StackExchange.keyboardShortcuts.init();
}

/** make the keyboard selection highlight more visible in dark mode */
export function fixHighlightInDarkmode() {
	addStyle("body.theme-dark .keyboard-selected { box-shadow: 15px 15px 50px rgba(255, 255, 255, .2) inset; }");
}
