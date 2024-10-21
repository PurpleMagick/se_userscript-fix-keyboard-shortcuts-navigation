## Description

Updates to make the keyboard shorcuts work normally in most places where they should apply. Amend the document by adding needed classes or attributes, since the keyboard shortcuts expect certain structure to exist on the page in order to allow a given shortcut to execute.

This should fix the following things:

 - <kbd>P</kbd> <kbd>L</kbd> - to go to the last page
 - <kbd>P</kbd> <kbd>F</kbd> - to go to the first page
 - <kbd>P</kbd> <kbd>N</kbd> - to go to the next page
 - <kbd>P</kbd> <kbd>P</kbd> - to go to the previous page
 - <kbd>P</kbd> <kbd>U</kbd> - to select the first post (top)
 - <kbd>P</kbd> <kbd>J</kbd> - to select the next post (down)
 - <kbd>P</kbd> <kbd>K</kbd> - to select the previous post (up)

## Known issues
Page /tools/protected-questions:
 - no keyboard selection
 
Page /tools/suggested-edits:
 - no keyboard selection

Page user activity:
 - no keyboard selection
 - navigation shout re-initialise the previos/last
 
Page saves:
 - no keyboard shortcuts at all - the script is not loaded (https://cdn.sstatic.net/Js/keyboard-shortcuts.en.js)

Page https://stackoverflow.com/jobs/companies:
 - only first/last page work
 - no previous/next page
 - no first/next/previous post
