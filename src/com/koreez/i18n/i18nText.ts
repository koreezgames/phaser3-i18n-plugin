import i18next from 'i18next';

const text: any = {
  get(): any {
    if (!this.dirty) {
      this._i18nText = i18next.t(this._i18nKey, this._interpolations) || '';
    }
    return this._i18nText;
  },

  set(value: string): void {
    if (value !== this._i18nKey) {
      this._i18nKey = value.toString() || '';
    }
  },
};

const i18nUpdate: () => void = function(): void {
  if (this instanceof Phaser.GameObjects.Text) {
    this.dirty = false;
    this.updateText();
  } else if (
    this instanceof Phaser.GameObjects.BitmapText ||
    this instanceof Phaser.GameObjects.DynamicBitmapText
  ) {
    this.dirty = false;
    /* eslint-disable no-unused-expressions */
    this.text;
    this.dirty = true;
  }
};

const interpolations: any = {
  get(): any {
    return this._interpolations;
  },

  set(value: any): void {
    this._interpolations = value;
    this.i18nUpdate();
  },
};

const setTranslationParamameter: (key: string, value: any) => void = function(
  key: string,
  value: any,
): void {
  if (!this._interpolations) {
    this._interpolations = {};
  }
  this._interpolations[key] = value;
  this.i18nUpdate();
};

const clearTranslationParamameter: (key: string) => void = function(
  key: string,
): void {
  if (key in this._interpolations) {
    delete this._interpolations[key];
  }
  this.i18nUpdate();
};

const commonExtend: (clazz: any, prop: string) => void = function(
  clazz: any,
  prop: string,
): void {
  const creator: any = Phaser.GameObjects.GameObjectCreator;

  Object.defineProperty(clazz.prototype, 'text', text);

  Object.defineProperty(clazz.prototype, 'interpolations', interpolations);

  clazz.prototype['i18nUpdate'] = i18nUpdate;

  clazz.prototype['setTranslationParamameter'] = setTranslationParamameter;

  clazz.prototype['clearTranslationParamameter'] = clearTranslationParamameter;

  const textCreator: string = creator.prototype[prop];
  delete creator.prototype[prop];

  const textFactory: any = creator.prototype[prop];
  delete creator.prototype[prop];

  creator.register(`_${prop}`, textCreator);
  creator.register(`_${prop}`, textFactory);

  // Code taken from Phaser's Group
  creator.register(prop, (config: any) => {
    const _text: Phaser.GameObjects.GameObject = this.scene.make[`_${prop}`](
      config,
    );
    (_text as any).interpolations = config.interpolations;
    return _text;
  });
};

const i18n: any = {
  extendText: () => {
    commonExtend(Phaser.GameObjects.Text, 'text');

    (Phaser.GameObjects.GameObjectFactory as any).register(
      'text',
      (
        _x: any,
        _y: any,
        _text: any,
        _style: any,
        _interpolations: any,
      ): Phaser.GameObjects.GameObject => {
        const aText: Phaser.GameObjects.GameObject = this.scene.add._text(
          _x,
          _y,
          _text,
          _style,
        );
        (aText as any).interpolations = _interpolations;
        return aText;
      },
    );
  },
  extendBitmapText: () => {
    commonExtend(Phaser.GameObjects.BitmapText, 'bitmapText');

    (Phaser.GameObjects.GameObjectFactory as any).register(
      'bitmapText',
      (
        _x: any,
        _y: any,
        _font: any,
        _text: any,
        _size: any,
        _interpolations: any,
      ): Phaser.GameObjects.GameObject => {
        const aText: Phaser.GameObjects.GameObject = this.scene.add._bitmapText(
          _x,
          _y,
          _font,
          _text,
          _size,
        );
        (aText as any).interpolations = _interpolations;
        return aText;
      },
    );
  },
  extendDynamicBitmapText: () => {
    commonExtend(Phaser.GameObjects.DynamicBitmapText, 'dynamicBitmapText');

    (Phaser.GameObjects.GameObjectFactory as any).register(
      'dynamicBitmapText',
      (
        _x: any,
        _y: any,
        _font: any,
        _text: any,
        _size: any,
        _interpolations: any,
      ): Phaser.GameObjects.GameObject => {
        const aText: Phaser.GameObjects.GameObject = this.scene.add._dynamicBitmapText(
          _x,
          _y,
          _font,
          _text,
          _size,
        );
        (aText as any).interpolations = _interpolations;
        return aText;
      },
    );
  },
};

export default i18n;
