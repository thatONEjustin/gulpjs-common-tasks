# gulpjs-common-tasks

# Getting Started

#### 1. Install gulp globally:

__If you have previously installed a version of gulp globally, please run `npm rm --global gulp`
to make sure your old version doesn't collide with gulp-cli.__

```sh
$ npm install --global gulp-cli
```

#### 2. Grab the package.json file from the git or below

```sh
{
  "name": "package-json-template",
  "version": "1.0.0",
  "description": "package-description",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "ASNet",
  "license": "ISC",
  "devDependencies": {
    "del": "^2.2.2",
    "gulp": "^3.9.1",
    "gulp-less": "^3.1.0",
    "gulp-minify-css": "^1.2.4",
    "gulp-newer": "^1.2.0",
    "gulp-rename": "^1.2.2",
    "path": "^0.12.7"
  }
}
```

#### 3. install the gulp dependencies 
```sh
$ npm install
```

#### 4. copy over the gulpfile.js from this repository

__https://github.com/thatONEjustin/gulpjs-common-tasks/blob/master/gulpfile.js__

#### 4. run gulp

__Tasks run as follows: gulp.task('default', ['copy-html', 'scripts', 'bootstrap', 'less', 'cssmin', 'watch']);__
__It's important to note that the new WATCH task is an actual stream, if a file has an error it will kill the task but still keep WATCH running__

```sh
M:\path\to\site\> gulp
```

# If you're going from the grunt to gulp build you'll need to do some simple steps:

#### 1. Delete the following directories/files
__http://imgur.com/khOYQdF__

#### 2. Follow the steps above
