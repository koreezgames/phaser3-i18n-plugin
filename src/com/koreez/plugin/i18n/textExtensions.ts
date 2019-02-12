import i18next from "i18next";

const setText: (value: string) => any = function(value: string): any {
    if (value !== this._i18nKey) {
        this._i18nKey = value.toString() || "";
    }
    return this._setText(i18next.t(this._i18nKey, this._interpolations) || "");
};

const interpolations: any = {
    get(): any {
        return this._interpolations;
    },

    set(value: any): void {
        this._interpolations = value;
        this.setText(this._i18nKey);
    }
};

const setTranslationParameter: (key: string, value: any) => void = function(key: string, value: any): void {
    if (!this._interpolations) {
        this._interpolations = {};
    }
    this._interpolations[key] = value;
    this.setText(this._i18nKey);
};

const clearTranslationParameter: (key: string) => void = function(key: string): void {
    if (key in this._interpolations) {
        delete this._interpolations[key];
    }
    this.setText(this._i18nKey);
};

const commonExtend: (clazz: any, prop: string) => void = (clazz: any, prop: string): void => {
    if (clazz.prototype.setText !== setText) {
        clazz.prototype._setText = clazz.prototype.setText;

        clazz.prototype.setText = setText;

        Object.defineProperty(clazz.prototype, "interpolations", interpolations);

        clazz.prototype.setTranslationParameter = setTranslationParameter;

        clazz.prototype.clearTranslationParameter = clearTranslationParameter;
    }

    const creator: any = Phaser.GameObjects.GameObjectCreator;
    if (creator) {
        const textCreator: string = creator.prototype[prop];
        if (textCreator) {
            delete creator.prototype[prop];
            creator.register(`_${prop}`, textCreator);
            creator.register(prop, function(config: any, addToScene: boolean = false): Phaser.GameObjects.GameObject {
                const _text: Phaser.GameObjects.GameObject = this.scene.make[`_${prop}`](config, addToScene);
                (_text as any).interpolations = config.interpolations;
                return _text;
            });
        }
    }

    const factory: any = Phaser.GameObjects.GameObjectFactory;
    if (factory) {
        const textFactory: string = factory.prototype[prop];
        if (textFactory) {
            delete factory.prototype[prop];
            factory.register(`_${prop}`, textFactory);
        }
    }
};

const textExtensions: any = {
    extendText: () => {
        const text: any = Phaser.GameObjects.Text;
        if (text) {
            commonExtend(text, "text");
        }
        const gameObjectFactory: any = Phaser.GameObjects.GameObjectFactory;
        if (!gameObjectFactory) {
            return;
        }
        gameObjectFactory.register("text", function(
            x: any,
            y: any,
            str: any,
            style: any,
            theInterpolations: any
        ): Phaser.GameObjects.GameObject {
            const aText: Phaser.GameObjects.GameObject = this.scene.add._text(x, y, str, style);
            (aText as any).interpolations = theInterpolations;
            return aText;
        });
    },

    extendBitmapText: () => {
        const bitmapText: any = Phaser.GameObjects.BitmapText;
        if (bitmapText) {
            commonExtend(bitmapText, "bitmapText");
        }
        const gameObjectFactory: any = Phaser.GameObjects.GameObjectFactory;
        if (!gameObjectFactory) {
            return;
        }
        gameObjectFactory.register("bitmapText", function(
            x: any,
            y: any,
            font: any,
            str: any,
            size: any,
            theInterpolations: any
        ): Phaser.GameObjects.GameObject {
            const aText: Phaser.GameObjects.GameObject = this.scene.add._bitmapText(x, y, font, str, size);
            (aText as any).interpolations = theInterpolations;
            return aText;
        });
    },

    extendDynamicBitmapText: () => {
        const dynamicBitmapText: any = Phaser.GameObjects.DynamicBitmapText;
        if (dynamicBitmapText) {
            commonExtend(dynamicBitmapText, "dynamicBitmapText");
        }
        const gameObjectFactory: any = Phaser.GameObjects.GameObjectFactory;
        if (!gameObjectFactory) {
            return;
        }
        gameObjectFactory.register("dynamicBitmapText", function(
            x: any,
            y: any,
            font: any,
            str: any,
            size: any,
            theInterpolations: any
        ): Phaser.GameObjects.GameObject {
            const aText: Phaser.GameObjects.GameObject = this.scene.add._dynamicBitmapText(x, y, font, str, size);
            (aText as any).interpolations = theInterpolations;
            return aText;
        });
    }
};

export default textExtensions;
