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
      if (this._i18nKey) {
        this.i18nUpdate();
      }
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

const setTranslationParameter: (key: string, value: any) => void = function(
  key: string,
  value: any,
): void {
  if (!this._interpolations) {
    this._interpolations = {};
  }
  this._interpolations[key] = value;
  this.i18nUpdate();
};

const clearTranslationParameter: (key: string) => void = function(
  key: string,
): void {
  if (key in this._interpolations) {
    delete this._interpolations[key];
  }
  this.i18nUpdate();
};

const commonExtend: (clazz: any, prop: string) => void = (
  clazz: any,
  prop: string,
): void => {
  const creator: any = Phaser.GameObjects.GameObjectCreator;

  Object.defineProperty(clazz.prototype, 'text', text);

  Object.defineProperty(clazz.prototype, 'interpolations', interpolations);

  clazz.prototype['i18nUpdate'] = i18nUpdate;

  clazz.prototype['setTranslationParameter'] = setTranslationParameter;

  clazz.prototype['clearTranslationParameter'] = clearTranslationParameter;

  const textCreator: string = creator.prototype[prop];
  delete creator.prototype[prop];

  const textFactory: any = creator.prototype[prop];
  delete creator.prototype[prop];

  creator.register(`_${prop}`, textCreator);
  creator.register(`_${prop}`, textFactory);

  // Code taken from Phaser's Group
  creator.register(prop, function(config: any): Phaser.GameObjects.GameObject {
    const _text: Phaser.GameObjects.GameObject = this.scene.make[`_${prop}`](
      config,
    );
    (_text as any).interpolations = config.interpolations;
    return _text;
  });
};

const i18nText: any = {
  extendText: () => {
    commonExtend(Phaser.GameObjects.Text, 'text');

    (Phaser.GameObjects.GameObjectFactory as any).register('text', function(
      x: any,
      y: any,
      str: any,
      style: any,
      theInterpolations: any,
    ): Phaser.GameObjects.GameObject {
      const aText: Phaser.GameObjects.GameObject = this.scene.add._text(
        x,
        y,
        str,
        style,
      );
      (aText as any).interpolations = theInterpolations;
      return aText;
    });
  },

  extendBitmapText: () => {
    commonExtend(Phaser.GameObjects.BitmapText, 'bitmapText');

    (Phaser.GameObjects.GameObjectFactory as any).register(
      'bitmapText',
      function(
        x: any,
        y: any,
        font: any,
        str: any,
        size: any,
        theInterpolations: any,
      ): Phaser.GameObjects.GameObject {
        const aText: Phaser.GameObjects.GameObject = this.scene.add._bitmapText(
          x,
          y,
          font,
          str,
          size,
        );
        (aText as any).interpolations = theInterpolations;
        return aText;
      },
    );
  },

  extendDynamicBitmapText: () => {
    commonExtend(Phaser.GameObjects.DynamicBitmapText, 'dynamicBitmapText');

    (Phaser.GameObjects.GameObjectFactory as any).register(
      'dynamicBitmapText',
      function(
        x: any,
        y: any,
        font: any,
        str: any,
        size: any,
        theInterpolations: any,
      ): Phaser.GameObjects.GameObject {
        const aText: Phaser.GameObjects.GameObject = this.scene.add._dynamicBitmapText(
          x,
          y,
          font,
          str,
          size,
        );
        (aText as any).interpolations = theInterpolations;
        return aText;
      },
    );
  },
};

export default i18nText;
