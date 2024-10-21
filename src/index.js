import { fixAllPagers, fixAllFirstPages, fixAllLastPages, fixHighlightInDarkmode, reInitiKeybindings } from "./fixes.js";
import { init } from "./config.js";

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
