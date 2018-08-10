# Admin UI

This repo contains UI for Admin Tool to get up-and-running with Angular and ES6, using [Webpack](http://webpack.github.io/) for the build process

As style guide for developing with Angular and ES6 you need to use [Angular 1.x styleguide](https://github.com/toddmotto/angular-styleguide/blob/master/README.md)

## Getting Started
### Dependencies
Tools needed to run this app:
* `node` and `npm`
Once you have these, install the following as globals:
`npm install -g karma karma-cli webpack`

### Installing
* `clone` this repo
* `npm install -g karma karma-cli webpack` install global cli dependencies
* `npm install` to install dependencies

### Running the App
Admin UI uses Webpack to build and launch the development environment. After you have installed all dependencies, you may run the app.

### Build the App

* to build project for development environment, type `npm run build:dev` in the terminal.
* to build project for production environment, type `npm run build:prod` in the terminal.

### Lint the App

To validation ES6 code, type `npm run lint` in the terminal. It should notice that this command is executed automatically on each commit and prevent it in case of fails. 

#### Visual Studio Code integration

Also there is extension ESLint for Visual Studio Code. After installation this extension will scan all opened files and underline issues. 
In order to scan whole solution you need execute from Command Pallete (View => Command Pallete or Ctrl + Shift + P) the following command: tasks eslint (don't dorget erase defaul value '>')
Afterward, all error messages will be displayed in Problems window (to show: View => Problems or Ctrl + Shift + M).

#### Disabling rule for specific lines

If you want disable some rule in code, then use comments /* eslint-disable */ or // eslint-disable-next-line, for example:

/* eslint-disable */
alert('foo');
/* eslint-enable */

// eslint-disable-next-line
alert('foo');

#### Specifying Globals

The no-undef rule will warn on variables that are accessed but not defined within the same file. If you are using global variables inside of a file then it’s worthwhile to define those globals so that ESLint will not warn about their usage. You can define global variables either using comments inside of a file or in the configuration file.
To specify globals using a comment inside of your JavaScript file, use the following format:

/* global var1, var2 */

More details about ESLint: http://eslint.org/docs/user-guide/configuring

### Testing Setup
All tests are written in ES6.
* Karma
* Webpack + Babel
* Jasmine

To run tests, type `npm run test` or `karma start` in the terminal.


