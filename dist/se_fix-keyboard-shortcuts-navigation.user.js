// ==UserScript==
// @name            Keyboard navigation fixes
// @description     Fix keyboard navigation shortcuts on most places to allow navigationg to pages and going up/down the list.
// @author          VLAZ
// @inject-into     page
// @match           https://stackoverflow.com/*
// @match           https://serverfault.com/*
// @match           https://superuser.com/*
// @match           https://*.stackexchange.com/*
// @match           https://askubuntu.com/*
// @match           https://stackapps.com/*
// @match           https://mathoverflow.net/*
// @match           https://pt.stackoverflow.com/*
// @match           https://ja.stackoverflow.com/*
// @match           https://ru.stackoverflow.com/*
// @match           https://es.stackoverflow.com/*
// @match           https://meta.stackoverflow.com/*
// @match           https://meta.serverfault.com/*
// @match           https://meta.superuser.com/*
// @match           https://meta.askubuntu.com/*
// @match           https://meta.mathoverflow.net/*
// @match           https://pt.meta.stackoverflow.com/*
// @match           https://ja.meta.stackoverflow.com/*
// @match           https://ru.meta.stackoverflow.com/*
// @match           https://es.meta.stackoverflow.com/*
// @match           https://stackoverflowteams.com/c/*
// @namespace       https://github.com/PurpleMagick/
// @run-at          document-end
// @grant           GM_addStyle
// @grant           GM.addStyle
// @version         1.0.0
// ==/UserScript==

/******/ (() => { // webpackBootstrap
	;// ./src/fixes.js
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

	function fixAllPagers(config) {
		config.findPagers().forEach(fixPager(config));
	}

	function fixAllFirstPages(config) {
		config.findPagers().forEach(fixFirstPage(config));
	}

	function fixAllLastPages(config) {
		config.findPagers().forEach(fixLastPage(config));
	}

	function reInitiKeybindings() {
	//$.cache is missing some times which stops the destroy() call
		$.cache ??= {};
		$.cache[document[jQuery.expando]] ??= {};
		$.cache[document[jQuery.expando]].events = {};

		//turn it off and on again
		StackExchange.keyboardShortcuts.destroy();
		StackExchange.keyboardShortcuts.init();
	}

	/** make the keyboard selection highlight more visible in dark mode */
	function fixHighlightInDarkmode() {
		addStyle("body.theme-dark .keyboard-selected { box-shadow: 15px 15px 50px rgba(255, 255, 255, .2) inset; }");
	}

	;// ./src/pagePredicates.js
	/** new answers to old questions tool*/
	const isNATO = url =>
		url.pathname.toLowerCase().contains("/new-answers-old-questions");

	const isProtectedQuestions = url =>
		url.pathname.toLowerCase().contains("/protected-questions");

	const isSuggestedEdit10kTool = url =>
		url.pathname.toLowerCase().startsWith("tools/suggested-edits");

	/** questions page, custom filters, tag main page, tag search*/
	const isQuestions = url =>
		url.pathname.toLowerCase().startsWith("/questions");

	/** regular search page */
	const isSearch = url =>
		url.pathname.toLowerCase().startsWith("/search");

	const isAllUsers = url =>
		url.pathname.toLowerCase() === "/users"
			|| url.pathname.toLowerCase() === "/users/";

	const isDiscussions = url =>
		url.pathname.toLowerCase().contains("/discussions");

	const isStagingGround = url =>
		url.pathname.toLowerCase().startsWith("/staging-ground");


	const userPage = page => url =>
		url.pathname.toLowerCase().startsWith("/users/")
			&& url.searchParams.get("tab")?.toLowerCase() === page;

	const isUserAnswers = userPage("answers");
	const isUserQuestions = userPage("questions");
	const isUserActivity = userPage("activity");


	;// ./src/lookups.js
	function findPagers() {
		return document.querySelectorAll(".s-pagination");
	}

	function findFirstPage(pager) {
		const pages = pager.querySelectorAll("a[href]");

		return [].find.call(pages, el => {
			const searchParams = new URLSearchParams(el.search);

			const isPage1 = searchParams.get("page") === "1"
				|| searchParams.get("pg") === "1";

			const noPage = !searchParams.has("page")
				&& !searchParams.has("pg");

			return isPage1 || noPage;
		});
	}

	function findCurrentPage(pager) {
		return pager.querySelector(".is-selected");
	}

	;// ./src/config.js


	const ALL_CLASSES_FOR_PAGER = ["pager-questions", "pager-answers", "pager"];
	const TITLE_FOR_FIRST_PAGE = "go to page 1";
	const NO_CLASSES = [];

	/** { predicate: Predicate, pagerClassесToAdd: string[], selectionFix: () => void } */
	const PAGE_SPECIFIC_CONFIG = [
		{
			title: "10k tools - NATO",
			predicate: isNATO,
			pagerClassесToAdd: ["pager-answers"],
		},
		{
			title: "10k tools - suggested edits stats",
			predicate: isSuggestedEdit10kTool,
			pagerClassесToAdd: ["pager"],
		},
		{
			title: "10k tools - protected questions",
			predicate: isProtectedQuestions,
			pagerClassесToAdd: ["pager"],
		},
		{
			title: "/questions",
			predicate: isQuestions,
			pagerClassесToAdd: NO_CLASSES,
		},
		{
			title: "search pages",
			predicate: isSearch,
			pagerClassесToAdd: NO_CLASSES,
		},
		{
			title: "/users",
			predicate: isAllUsers,
			pagerClassесToAdd: NO_CLASSES,
		},
		{
			title: "User profile - activity page",
			predicate: isUserActivity,
			pagerClassесToAdd: NO_CLASSES,
		},
		{
			title: "User profile - answers",
			predicate: isUserAnswers,
			pagerClassесToAdd: ["pager-answers"],
		},
		{
			title: "User profile - questions",
			predicate: isUserQuestions,
			pagerClassесToAdd: ["pager-answers"],
		},
		{
			title: "Discussions",
			predicate: isDiscussions,
			pagerClassесToAdd: NO_CLASSES,
			selectionFix: () => {
				document.querySelector(".s-post-summary")
					.parentElement
					.setAttribute("id", "questions");
			}
		},
		{
			title: "Staging ground",
			predicate: isStagingGround,
			pagerClassесToAdd: ["pager"],
			selectionFix: () => {
				document.querySelector(".js-listing-table-container")
					.setAttribute("id", "questions");
			},
		}
	];

	/** set up script to run on the current page - select correct config */
	function init() {
		const url = new URL(location);

		const config = PAGE_SPECIFIC_CONFIG
			.find(({predicate}) => predicate(url)) ?? {};

		//attach common config
		config.pagerClassесToAdd ??= ALL_CLASSES_FOR_PAGER;
		Object.assign(config, {
			titleForFirstPage: TITLE_FOR_FIRST_PAGE,
			findPagers: findPagers,
			findFirstPage: findFirstPage,
			findCurrentPage: findCurrentPage,
		});

		return config;
	}

	;// ./src/index.js


	function main(config) {
		fixAllPagers(config);
		fixAllFirstPages(config);
		fixAllLastPages(config);
		fixHighlightInDarkmode(config);

		if (config.selectionFix) {
			config.selectionFix();
			reInitiKeybindings(config);
		}
	}

	const CONFIG = init();
	main(CONFIG);
/******/ })();
