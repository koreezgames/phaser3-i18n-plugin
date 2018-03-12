# Phaser3 i18n Plugin

[![Build Status](https://travis-ci.org/koreezgames/phaser3-i18n-plugin.svg?branch=master)](https://travis-ci.org/koreezgames/phaser3-i18n-plugin) [![David](https://david-dm.org/koreezgames/phaser3-i18n-plugin.svg)]() [![Project status](https://img.shields.io/badge/status-active-brightgreen.svg)](#status)

Phaser3 i18n is a plugin for Phaser 3 that allows you to have seamless translations in your game. It uses **[i18next](https://github.com/i18next/i18next)** as it's source for translations management, which is widely adopted by the JS community in other projects as well.

Key features:

* Support for translations namespaces
* Simple key/value JSON
* Seamless switching of languages
* No extra function calls for translating strings, directly build into Phaser's Text object

## Getting Started

### Installation

#### **_Using script tag:_**

[![](https://data.jsdelivr.com/v1/package/npm/@koreez/phaser3-i18n/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@koreez/phaser3-i18n/dist/phaseri18n.min.js)

```html
<script src="//cdn.jsdelivr.net/npm/@koreez/phaser3-i18n/dist/phaseri18n.min.js"></script>
```

#### **_Using npm:_**

[![npm](https://img.shields.io/npm/dt/@koreez/phaser3-i18n.svg)](https://www.npmjs.com/package/@koreez/phaser3-i18n)

```shell
$ npm i -g npm
$ npm i --save  @koreez/phaser3-i18n
```

## Usage

### Import the plugin

##### **_CommonJS_**

```javascript
var I18nPlugin = require("@koreez/phaser3-i18n");
```

##### **_ES2015_**

```javascript
import I18nPlugin from "@koreez/phaser3-i18n";
```

### Load the plugin

You need to load the plugin in your game. This is done just like any other plugin in Phaser 3.
So, to load the plugin, include it one of the Phaser Scenes _preload_ method.

```javascript
preload () {
  this.load.plugin('I18nPlugin', I18nPlugin)
}
```

### Initialize the plugin

Afther plugin has beeen loaded you need to initialize it.

```javascript
create () {
  this.sys.install('I18nPlugin')
  this.sys.i18n.init(
    {
      fallbackLng: 'en',
      loadPath: 'assets/i18n/{{lng}}/{{ns}}.json',
      debug: false,
    },
    function () {
      console.log('I18nPlugin initialized!')
    },
  )
}
```

The plugin will patch _add.text, add.bitmapText and add.dynamicBitmapText / make.text, make.bitmapText and make.dynamicBitmapText_ methods with additional functionality.

### Create localized texts

```javascript
// x - any
// y - any
// font - bitmap font
// text - should be translation key
// size - font size
// interpolations - interpolation for transleation (for example { 0: "value0", 1: "value1" }), note this is not required parametr
this.add.bitmapText(x, y, font, text, size, interpolations);
```

##### **_or via config_**

```javascript
var config = {
  x: 100,
  y: 100,
  text: "translationKey",
  font: "atari-classic",
  size: 64,
  interpolations: { 0: "value0", 1: "value1" },
};
this.make.dynamicBitmapText(config);
```
