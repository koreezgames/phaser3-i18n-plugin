# Phaser3 i18n Plugin

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS/blob/master/LICENSE)
[![Build Status](https://secure.travis-ci.org/koreezgames/phaser3-i18n-plugin.svg?branch=master)](https://travis-ci.org/koreezgames/phaser3-i18n-plugin)
[![codebeat badge](https://codebeat.co/badges/753f25dc-b8b8-4b55-9559-2bdc00b070e1)](https://codebeat.co/projects/github-com-koreezgames-phaser-i18next-master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/63e0c72189fa97ca55db/test_coverage)](https://codeclimate.com/github/koreezgames/phaser3-i18n-plugin/test_coverage)
[![npm version](https://badge.fury.io/js/%40koreez%2Fphaser3-i18n.svg)](https://badge.fury.io/js/%40koreez%2Fphaser3-i18n)
[![Greenkeeper badge](https://badges.greenkeeper.io/koreezgames/phaser3-i18n-plugin.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Phaser3 i18n is a plugin for Phaser 3 that allows you to have seamless translations in your game. It uses **[i18next](https://github.com/i18next/i18next)** as it's source for translations management, which is widely adopted by the JS community in other projects as well.

Key features:

-   Support for translations namespaces
-   Simple key/value JSON
-   Seamless switching of languages
-   No extra function calls for translating strings, directly build into Phaser's Text object

## Getting Started

### Installation

[![npm](https://img.shields.io/npm/dt/@koreez/phaser3-i18n.svg)](https://www.npmjs.com/package/@koreez/phaser3-i18n)

```shell
$ npm i -g npm
$ npm i --save  @koreez/phaser3-i18n
```

## Usage

### Import the plugin

```javascript
import { I18nPlugin } from "@koreez/phaser3-i18n";
```

### Load the plugin

You need to load the plugin in your game. This is done just like any other plugin in Phaser 3.
So, to load the plugin, include it in plugins config.

```javascript
const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 600,
    plugins: {
        scene: [
            {
                key: "i18nPlugin",
                plugin: I18nPlugin,
                mapping: "i18n"
            }
        ]
    },
    scene: {
        create: create
    }
};
```

### Initialize the plugin

Afther plugin has beeen loaded you need to initialize it.

```javascript
create () {
  this.i18n.initialize(
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
    interpolations: { 0: "value0", 1: "value1" }
};
this.make.dynamicBitmapText(config);
```

## Credits

Big thanks to this great repo:

https://github.com/orange-games/phaser-i18next

## License

[MIT](LICENSE)
