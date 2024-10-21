import {
	isNATO,
	isSuggestedEdit10kTool,
	isProtectedQuestions,
	isQuestions,
	isSearch,
	isAllUsers,
	isUserActivity,
	isUserAnswers,
	isUserQuestions,
	isDiscussions,
	isStagingGround
} from "./pagePredicates.js";

import { findPagers, findFirstPage, findCurrentPage } from "./lookups.js";

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
export function init() {
	const url = new URL(location);

	const config = PAGE_SPECIFIC_CONFIG
		.find(({predicate}) => predicate(url)) ?? {};

	//attach common config
	config.pagerClassесToAdd ??= ALL_CLASSES_FOR_PAGER;
	Object.assign(config, {
		titleForFirstPage: TITLE_FOR_FIRST_PAGE,
		findPagers,
		findFirstPage,
		findCurrentPage,
	});

	return config;
}
