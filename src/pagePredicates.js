/** new answers to old questions tool*/
export const isNATO = url =>
	url.pathname.toLowerCase().contains("/new-answers-old-questions");

export const isProtectedQuestions = url =>
	url.pathname.toLowerCase().contains("/protected-questions");

export const isSuggestedEdit10kTool = url =>
	url.pathname.toLowerCase().startsWith("tools/suggested-edits");

/** questions page, custom filters, tag main page, tag search*/
export const isQuestions = url =>
	url.pathname.toLowerCase().startsWith("/questions");

/** regular search page */
export const isSearch = url =>
	url.pathname.toLowerCase().startsWith("/search");

export const isAllUsers = url =>
	url.pathname.toLowerCase() === "/users"
			|| url.pathname.toLowerCase() === "/users/";

export const isDiscussions = url =>
	url.pathname.toLowerCase().contains("/discussions");

export const isStagingGround = url =>
	url.pathname.toLowerCase().startsWith("/staging-ground");


const userPage = page => url =>
	url.pathname.toLowerCase().startsWith("/users/")
			&& url.searchParams.get("tab")?.toLowerCase() === page;

export const isUserAnswers = userPage("answers");
export const isUserQuestions = userPage("questions");
export const isUserActivity = userPage("activity");

