# css-selector-generator

A JavaScript utility to generate a unique CSS selector for any element in a DOM tree.

## Installation

  Install with [component](http://component.io):

    $ component install graouts/css-selector-generator

## Usage

```javascript
var generator = require("css-selector-generator");

generator(document.body); // -> "body"
```

## Authors

This project is a fork of [fczbkk/css-selector-generator](https://github.com/fczbkk/css-selector-generator), originally created by [Riki Fridrich](http://fczbkk.com), maintained by [Antoine Quint](https://github.com/graouts/).