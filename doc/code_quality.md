# Code quality
`yarn test` will check your code quality.

## Coding style
Coding style is managed by Prettier and ESLint.
`yarn test:lint` will throw errors if the code doesn't comply with the coding style.

You can fix most coding style errors with `yarn prettify`.

We recommend setting a task in your development environment that runs prettier on your modified files, either by:
- adding an action/task in your IDE that you manually calls
  - JetBrains (external tool):
    - Program: `./node_modules/.bin/prettier`
    - Parameters: `--trailing-comma es5 --single-quote --print-width 120 --write $FilePath$`
    - Working directory: `$ProjectFileDir$`
- adding a file watcher in your IDE
- adding a pre-commit hook

## Type checking
We use Flow to type check our code. You can run Flow with: `yarn test:flow`.

## Tests
We use Jest to test our application. You can run Jest with: `yarn test:unit`.
