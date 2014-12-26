# React boilerplate v0.2.0

A minimal set to start develop with React.

## Usage

To start a new project, use:

```
git clone -o upstream https://github.com/enguerran/react-boilerplate.git MyApp
cd MyApp
npm i
```

Run a livereload-enable server with:
```
npm run start
```

See `package.json` for the details of npm scripts.

Run a python server (no livereload but watchify) with:
```
python -m SimpleHTTPServer 8080 & npm run watch
```

_N.B.: remember to kill both processes. Use `jobs` to see running processes and `kill %1` to kill the first process._

Build a minimified version for production with:
```
npm run build
```

## Update

```
cd MyApp
git checkout master
git fetch upstream
git merge upstream/master
npm i
```

## About used packages

- Watchify has got the same flags as Browserify plus `-v` for verbose output.
- Browserify flag `-d` stands for debug and enables source maps that allow you to debug your files separately.
- The Watchify ` -e js/app.js` flag is for source map support on the root file.

## Thanks to
[Running scripts with npm](http://www.jayway.com/2014/03/28/running-scripts-with-npm/)
[Browserify usage](https://github.com/substack/node-browserify#usage)
