import i18next from 'i18next'

const text = {
  get: function () {
    if (!this.dirty) {
      this._i18nText = i18next.t(this._i18nKey, this._interpolations) || ''
    }
    return this._i18nText
  },

  set: function (value) {
    if (value !== this._i18nKey) {
      this._i18nKey = value.toString() || ''
    }
  },
}

const i18nUpdate = function () {
  if (this instanceof Phaser.GameObjects.Text) {
    this.dirty = false
    this.updateText()
  } else if (
    this instanceof Phaser.GameObjects.BitmapText ||
    this instanceof Phaser.GameObjects.DynamicBitmapText
  ) {
    this.dirty = false
    /* eslint-disable no-unused-expressions */
    this.text
    this.dirty = true
  }
}

const interpolations = {
  get: function () {
    return this._interpolations
  },

  set: function (value) {
    this._interpolations = value
    this.i18nUpdate()
  },
}

const setTranslationParamameter = function (key, value) {
  if (!this._interpolations) {
    this._interpolations = {}
  }
  this._interpolations[key] = value
  this.i18nUpdate()
}

const clearTranslationParamameter = function (key) {
  if (key in this._interpolations) {
    delete this._interpolations[key]
  }
  this.i18nUpdate()
}

const commonExtend = function (clazz, prop) {
  Object.defineProperty(clazz.prototype, 'text', text)

  Object.defineProperty(clazz.prototype, 'interpolations', interpolations)

  clazz.prototype['i18nUpdate'] = i18nUpdate

  clazz.prototype['setTranslationParamameter'] = setTranslationParamameter

  clazz.prototype['clearTranslationParamameter'] = clearTranslationParamameter

  const textCreator = Phaser.GameObjects.GameObjectCreator.prototype[prop]
  delete Phaser.GameObjects.GameObjectCreator.prototype[prop]

  const textFactory = Phaser.GameObjects.GameObjectFactory.prototype[prop]
  delete Phaser.GameObjects.GameObjectFactory.prototype[prop]

  Phaser.GameObjects.GameObjectCreator.register(`_${prop}`, textCreator)
  Phaser.GameObjects.GameObjectFactory.register(`_${prop}`, textFactory)

  // Code taken from Phaser's Group
  Phaser.GameObjects.GameObjectCreator.register(prop, function (config) {
    const text = this.scene.make[`_${prop}`](config)
    text.interpolations = config.interpolations
    return text
  })
}

const i18n = {
  extendText: function () {
    commonExtend(Phaser.GameObjects.Text, 'text')

    Phaser.GameObjects.GameObjectFactory.register('text', function (
      x,
      y,
      text,
      style,
      interpolations,
    ) {
      const aText = this.scene.add._text(x, y, text, style)
      aText.interpolations = interpolations
      return aText
    })
  },
  extendBitmapText: function () {
    commonExtend(Phaser.GameObjects.BitmapText, 'bitmapText')

    Phaser.GameObjects.GameObjectFactory.register('bitmapText', function (
      x,
      y,
      font,
      text,
      size,
      interpolations,
    ) {
      const aText = this.scene.add._bitmapText(x, y, font, text, size)
      aText.interpolations = interpolations
      return aText
    })
  },
  extendDynamicBitmapText: function () {
    commonExtend(Phaser.GameObjects.DynamicBitmapText, 'dynamicBitmapText')

    Phaser.GameObjects.GameObjectFactory.register('dynamicBitmapText', function (
      x,
      y,
      font,
      text,
      size,
      interpolations,
    ) {
      const aText = this.scene.add._dynamicBitmapText(x, y, font, text, size)
      aText.interpolations = interpolations
      return aText
    })
  },
}

export default i18n
