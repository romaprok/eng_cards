export default {
  // Maximum line length before wrapping. Set to 100 chars to provide enough space
  // for readability while preventing overly long lines
  printWidth: 100,

  // Number of spaces per indentation level. Using 2 spaces is common in React/JS
  // and provides good readability without taking up too much horizontal space
  tabWidth: 2,

  // Use spaces for indentation instead of tabs. This ensures consistent
  // formatting across different editors and environments
  useTabs: false,

  // Don't use semicolons at the end of statements. This is a modern JS style
  // that relies on ASI (Automatic Semicolon Insertion)
  semi: false,

  // Use single quotes for string literals. This is common in JS and reduces
  // the need to escape quotes in HTML attributes
  singleQuote: true,

  // Only add quotes around object property names when necessary
  // e.g., { 'foo-bar': true } but { foo: true }
  quoteProps: 'as-needed',

  // Use double quotes in JSX. This matches HTML convention and React documentation
  jsxSingleQuote: false,

  // Add trailing commas in arrays and objects where valid in ES5
  // This creates cleaner git diffs when adding new items
  trailingComma: 'es5',

  // Add spaces between brackets in object literals
  // e.g., { foo: bar } instead of {foo: bar}
  bracketSpacing: true,

  // Put closing brackets on the same line as the last element in
  // multiline JSX/HTML elements
  bracketSameLine: false,

  // Omit parentheses around arrow function parameters when possible
  // e.g., x => x instead of (x) => x
  arrowParens: 'avoid',

  // Use Linux-style line endings (LF) instead of Windows-style (CRLF)
  // This ensures consistency across different operating systems
  endOfLine: 'lf',

  // Don't force JSX/HTML attributes onto separate lines
  // This creates more compact and readable JSX
  singleAttributePerLine: false,
}
