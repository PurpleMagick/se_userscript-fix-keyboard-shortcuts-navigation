export function findPagers() {
	return document.querySelectorAll(".s-pagination");
}

export function findFirstPage(pager) {
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

export function findCurrentPage(pager) {
	return pager.querySelector(".is-selected");
}
